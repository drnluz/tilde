@{%
const lexer = require("./lexer")
%}

@lexer lexer

main -> expression {% id %}

expression -> or_expression {% id %}

or_expression -> and_expression {% id %}
               | and_expression _ %or _ and_expression
                 {% d => ({
                   type: "or_operation",
                   left: d[0],
                   right: d[4]
                 })
                 %}

and_expression -> not_operation {% id %}
                | not_operation _ %and _ not_operation
                  {% d => ({
                    type: "and_operation",
                    left: d[0],
                    right: d[4]
                  })
                  %}

not_operation -> unary_expression {% id %}
               | %not _ unary_expression
                 {% d => ({
                    type: "not_operation",
                    value: d[2]
                 })
                 %}

unary_expression -> boolean {% id %}
                  | %lparen _ expression _ %rparen {% d => d[2] %}

boolean -> %true
          {% d => ({
            type: "literal",
            value: true
          })
          %}
         | %false
         {% d => ({
            type: "literal",
            value: false
         })
         %}

_ -> %ws:* {% d => null %}
