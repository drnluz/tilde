// Generated automatically by nearley, version 2.19.6
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const lexer = require("./lexer")
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "main", "symbols": ["boolean_comparison"], "postprocess": id},
    {"name": "main", "symbols": ["assignment_expression"], "postprocess": id},
    {"name": "assignment_expression", "symbols": ["variable", "_", (lexer.has("assign") ? {type: "assign"} : assign), "_", "boolean_comparison"], "postprocess":  d => ({
          type: "assignment_operation",
          variable: d[0],
          value: d[4]
        })},
    {"name": "boolean_comparison", "symbols": ["or_expression"], "postprocess": id},
    {"name": "boolean_comparison", "symbols": ["comparison_expression"], "postprocess": id},
    {"name": "boolean_comparison$subexpression$1", "symbols": [(lexer.has("eq") ? {type: "eq"} : eq)]},
    {"name": "boolean_comparison$subexpression$1", "symbols": [(lexer.has("neq") ? {type: "neq"} : neq)]},
    {"name": "boolean_comparison", "symbols": ["comparison_expression", "_", "boolean_comparison$subexpression$1", "_", "boolean_comparison"], "postprocess":  d => ({
          type: "equality_operation",
          operator: d[2][0].value,
          left: d[0],
          right: d[4]
        })},
    {"name": "boolean_comparison$subexpression$2", "symbols": [(lexer.has("eq") ? {type: "eq"} : eq)]},
    {"name": "boolean_comparison$subexpression$2", "symbols": [(lexer.has("neq") ? {type: "neq"} : neq)]},
    {"name": "boolean_comparison", "symbols": ["or_expression", "_", "boolean_comparison$subexpression$2", "_", "boolean_comparison"], "postprocess":  d => ({
          type: "equality_operation",
          operator: d[2][0].value,
          left: d[0],
          right: d[4]
        })},
    {"name": "comparison_expression", "symbols": ["additive_expression"], "postprocess": id},
    {"name": "comparison_expression", "symbols": ["additive_expression", "_", "comparison_operator", "_", "comparison_expression"], "postprocess":  d => ({
          type: "comparison_operation",
          operator: d[2].value,
          left: d[0],
          right: d[4]
        })
        },
    {"name": "additive_expression", "symbols": ["multiplicative_expression"], "postprocess": id},
    {"name": "additive_expression", "symbols": ["multiplicative_expression", "_", /[+-]/, "_", "additive_expression"], "postprocess":  d => ({
          type: "arithmetic_operation",
          operator: d[2].value,
          left: d[0],
          right: d[4]
        })},
    {"name": "multiplicative_expression", "symbols": ["unary_expression"], "postprocess": id},
    {"name": "multiplicative_expression", "symbols": ["unary_expression", "_", /[*/%]/, "_", "multiplicative_expression"], "postprocess":  d => ({
          type: "arithmetic_operation",
          operator: d[2].value,
          left: d[0],
          right: d[4]
        })},
    {"name": "or_expression", "symbols": ["and_expression"], "postprocess": id},
    {"name": "or_expression", "symbols": ["and_expression", "_", (lexer.has("or") ? {type: "or"} : or), "_", "and_expression"], "postprocess":  d => ({
          type: "or_operation",
          left: d[0],
          right: d[4]
        })
        },
    {"name": "and_expression", "symbols": ["not_operation"], "postprocess": id},
    {"name": "and_expression", "symbols": ["not_operation", "_", (lexer.has("and") ? {type: "and"} : and), "_", "not_operation"], "postprocess":  d => ({
          type: "and_operation",
          left: d[0],
          right: d[4]
        })
        },
    {"name": "not_operation", "symbols": ["unary_boolean_expression"], "postprocess": id},
    {"name": "not_operation", "symbols": [(lexer.has("not") ? {type: "not"} : not), "_", "unary_boolean_expression"], "postprocess":  d => ({
           type: "not_operation",
           value: d[2]
        })
        },
    {"name": "unary_boolean_expression", "symbols": ["boolean"], "postprocess": id},
    {"name": "unary_boolean_expression", "symbols": [(lexer.has("lparen") ? {type: "lparen"} : lparen), "_", "boolean_comparison", "_", (lexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess": d => d[2]},
    {"name": "unary_expression", "symbols": ["number"], "postprocess": id},
    {"name": "unary_expression", "symbols": ["string"], "postprocess": id},
    {"name": "unary_expression", "symbols": ["variable"], "postprocess": id},
    {"name": "unary_expression", "symbols": [(lexer.has("lparen") ? {type: "lparen"} : lparen), "_", "additive_expression", "_", (lexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess": d => d[2]},
    {"name": "boolean", "symbols": [(lexer.has("true") ? {type: "true"} : true)], "postprocess":  d => ({
          type: "literal",
          value: true
        })
        },
    {"name": "boolean", "symbols": [(lexer.has("false") ? {type: "false"} : false)], "postprocess":  d => ({
           type: "literal",
           value: false
        })
        },
    {"name": "number", "symbols": [(lexer.has("number_literal") ? {type: "number_literal"} : number_literal)], "postprocess":  d => ({
          type: "literal",
          value: d[0].value
        })},
    {"name": "string", "symbols": [(lexer.has("string_literal") ? {type: "string_literal"} : string_literal)], "postprocess":  d => ({
          type: "literal",
          value: d[0].value
        })},
    {"name": "variable", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess":  d => ({
          type: "variable",
          name: d[0].value
        })},
    {"name": "comparison_operator", "symbols": [(lexer.has("lte") ? {type: "lte"} : lte)], "postprocess": id},
    {"name": "comparison_operator", "symbols": [(lexer.has("lt") ? {type: "lt"} : lt)], "postprocess": id},
    {"name": "comparison_operator", "symbols": [(lexer.has("gte") ? {type: "gte"} : gte)], "postprocess": id},
    {"name": "comparison_operator", "symbols": [(lexer.has("gt") ? {type: "gt"} : gt)], "postprocess": id},
    {"name": "comparison_operator", "symbols": [(lexer.has("eq") ? {type: "eq"} : eq)], "postprocess": id},
    {"name": "comparison_operator", "symbols": [(lexer.has("neq") ? {type: "neq"} : neq)], "postprocess": id},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": d => null}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
