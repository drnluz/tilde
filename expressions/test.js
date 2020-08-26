// nearleyc grammar.ne -o grammar.js && node test.js

const nearley = require("nearley")
const grammar = require("./grammar.js")
const util = require('util')

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar))

function puts(obj) {
  console.log(util.inspect(obj, { showHidden: false, depth: null }))
}

operations = {
  and_operation(node) {
    return evaluateNode(node.left) && evaluateNode(node.right)
  },
  or_operation(node) {
    return evaluateNode(node.left) || evaluateNode(node.right)
  },
  not_operation(node) {
    return !evaluateNode(node.value)
  },
  literal(node) {
    return node.value
  }
}

function evaluateNode(node) {
  operation = operations[node.type]
  return operation(node)
}

parser.feed("(true || true) && ( !true || false)")
ast = parser.results[0]
puts(ast)
puts(evaluateNode(ast))
