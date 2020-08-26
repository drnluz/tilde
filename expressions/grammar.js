// Generated automatically by nearley, version 2.19.6
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const lexer = require("./lexer")
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "main", "symbols": ["expression"], "postprocess": id},
    {"name": "expression", "symbols": ["or_expression"], "postprocess": id},
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
    {"name": "not_operation", "symbols": ["unary_expression"], "postprocess": id},
    {"name": "not_operation", "symbols": [(lexer.has("not") ? {type: "not"} : not), "_", "unary_expression"], "postprocess":  d => ({
           type: "not_operation",
           value: d[2]
        })
        },
    {"name": "unary_expression", "symbols": ["boolean"], "postprocess": id},
    {"name": "unary_expression", "symbols": [(lexer.has("lparen") ? {type: "lparen"} : lparen), "_", "expression", "_", (lexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess": d => d[2]},
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
