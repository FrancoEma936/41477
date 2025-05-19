const antlr4 = require('antlr4');
const fs = require('fs');

// Importa los archivos generados por ANTLR
const CSubsetLexer = require('./CSubsetLexer').CSubsetLexer;
const CSubsetParser = require('./CSubsetParser').CSubsetParser;

// Cargar archivo de entrada
const input = fs.readFileSync('input.txt', 'utf8');

// Crear stream de entrada
const chars = new antlr4.InputStream(input);

// Crear lexer y token stream
const lexer = new CSubsetLexer(chars);
const tokens = new antlr4.CommonTokenStream(lexer);

// Mostrar tabla de tokens
console.log('\n Tabla de Tokens:');
console.log('--------------------');
tokens.fill();
tokens.getTokens().forEach(token => {
    const text = token.text.replace(/\r?\n|\r/g, "\\n");
    console.log(`Token: ${text} | Tipo: ${CSubsetLexer.symbolicNames[token.type]} | Línea: ${token.line}`);
});

// Crear parser
const parser = new CSubsetParser(tokens);
parser.buildParseTrees = true;

// Manejo de errores personalizado
parser.removeErrorListeners();
parser.addErrorListener({
    syntaxError: function (recognizer, offendingSymbol, line, column, msg, err) {
        console.error(`\n Error de sintaxis en línea ${line}, columna ${column}: ${msg}`);
    }
});

// Ejecutar análisis sintáctico
console.log('\n Árbol Sintáctico:');
const tree = parser.programa();
console.log(tree.toStringTree(parser.ruleNames));
