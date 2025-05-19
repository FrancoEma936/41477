grammar CSubset;

// Reglas sintácticas (parser rules)

instrucciones
    : instruccion
    | instrucciones instruccion
    ;

instruccion
    : decision
    | sentencia
    ;

decision
    : 'if' '(' condicion ')' '{' sentencia '}' ( 'else' '{' sentencia '}' )?
    ;

sentencia
    : salida
    | terminar
    ;

salida
    : 'print' '(' cadena ')' ';'
    ;

terminar
    : 'return' ';'
    ;

condicion
    : '0'
    | '1'
    ;

cadena
    : '"' caracteres '"'
    ;

caracteres
    : caracter
    | caracteres caracter
    ;

caracter
    : letra
    | digito
    | simbolo
    ;

letra
    : 'a'-'z'
    |'A'-'Z'
    ;

digito
    : '0'-'9'
    ;

simbolo
    : ',' | '.' | ';' | '!' | '?' | ':' | '"' | ' '
    ;

// Reglas léxicas (lexer rules)
IF       : 'if';
ELSE     : 'else';
PRINT    : 'print';
RETURN   : 'return';

LPAREN   : '(';
RPAREN   : ')';
LBRACE   : '{';
RBRACE   : '}';
SEMI     : ';';
QUOTE    : '"';

ZERO     : '0';
ONE      : '1';

WS       : [ \t\r\n]+ -> skip;