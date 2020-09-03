const moo = require("moo")

const lexer = moo.compile({
    ws: { match: /[ \t\n]+/, lineBreaks: true },
    lte: "<=",
    lt: "<",
    gte: ">=",
    gt: ">",
    eq: "==",
    neq: "!=",
    lparen: "(",
    rparen: ")",
    comma: ",",
    plus: "+",
    minus: "-",
    multiply: "*",
    divide: "/",
    or: "||",
    and: "&&",
    not: "!",
    true: "true",
    false: "false",
    assign: "=",
    string_literal: {
      match: /"(?:[^\n\\"]|\\["\\ntbfr])*"/,
      value: s => JSON.parse(s)
    },
    number_literal: {
      match: /[0-9]+(?:\.[0-9]+)?/,
      value: s => Number(s)
    },
    identifier: {
      match: /[a-zA-Z_][a-zA-Z_0-9\.]*/
    }
})

module.exports = lexer
