@{%
const lexer = require("./lexer")
%}

@lexer lexer

main -> _ boolean_comparison _ {% d => d[1] %}
      | _ assignment_expression _ {% d => d[1] %}

assignment_expression -> variable _ %assign _ boolean_comparison
                       {% d => ({
                         type: "assignment_operation",
                         variable: d[0],
                         value: d[4]
                       })%}

boolean_comparison -> or_expression {% id %}
                    | comparison_expression {% id %}
                    | comparison_expression _ (%eq|%neq) _ boolean_comparison
                    {% d => ({
                      type: "equality_operation",
                      operator: d[2][0].value,
                      left: d[0],
                      right: d[4]
                    })%}
                    | or_expression _ (%eq|%neq) _ boolean_comparison
                    {% d => ({
                      type: "equality_operation",
                      operator: d[2][0].value,
                      left: d[0],
                      right: d[4]
                    })%}

comparison_expression -> additive_expression {% id %}
                       | additive_expression _ comparison_operator _ comparison_expression
                         {% d => ({
                           type: "comparison_operation",
                           operator: d[2].value,
                           left: d[0],
                           right: d[4]
                         })
                         %}

additive_expression -> multiplicative_expression {% id %}
                     | multiplicative_expression _ [+-] _ additive_expression
                     {% d => ({
                      type: "arithmetic_operation",
                      operator: d[2].value,
                      left: d[0],
                      right: d[4]
                    })%}

multiplicative_expression -> unary_expression {% id %}
                           | unary_expression _ [*/%] _ multiplicative_expression
                           {% d => ({
                              type: "arithmetic_operation",
                              operator: d[2].value,
                              left: d[0],
                              right: d[4]
                            })%}

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

not_operation -> unary_boolean_expression {% id %}
               | %not _ unary_boolean_expression
                 {% d => ({
                    type: "not_operation",
                    value: d[2]
                 })
                 %}

unary_boolean_expression -> boolean {% id %}
                          | %lparen _ boolean_comparison _ %rparen {% d => d[2] %}

unary_expression -> number {% id %}
                  | string {% id %}
                  | variable {% id %}
                  | function_call {% id %}
                  | object {% id %}
                  | %lparen _ additive_expression _ %rparen {% d => d[2] %}

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

number -> %number_literal
         {% d => ({
           type: "literal",
           value: d[0].value
         })%}

string -> %string_literal
         {% d => ({
           type: "literal",
           value: d[0].value
         })%}

variable -> %identifier
          {% d => ({
            type: "variable",
            name: d[0].value
          })%}

function_call -> %identifier _ %lparen _ arguments _ %rparen
               {% d => ({
                 type: "function_call",
                 name: d[0],
                 args: d[4]
               })%}

arguments -> null
           | _ boolean_comparison _
           {% d => [d[1]] %}
           | _ boolean_comparison _ %comma arguments
           {% d => [d[1], ...d[4]] %}

object -> %opencurly object_members %closecurly
        {% d => ({
          type: "object",
          members: d[1]
        })%}

object_members -> null
                | _ object_member _
                {% d => [d[1]] %}
                | _ object_member %comma _ object_members _
                {% d => [d[1], ...d[4]] %}

object_member -> string _ %colon _ boolean_comparison
               {% d => ({
                 type: "object_member",
                 key: d[0],
                 value: d[4]
               })%}

comparison_operator -> %lte {% id %}
                     | %lt {% id %}
                     | %gte {% id %}
                     | %gt {% id %}
                     | %eq {% id %}
                     | %neq {% id %}

_ -> %ws:* {% d => null %}
