import nearley from 'nearley'
import Interpreter from './expressions/interpreter'
import grammar from './expressions/parser/grammar'

class Expression {
  constructor(expression, variableResolver, variableSetter) {
    this.expression = expression
    this.ast = {}
    this.variables = []
    this.interpreter = new Interpreter(variableResolver, variableSetter)

    this.parseExpression()
  }

  parseExpression() {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar))
    parser.feed(this.expression)
    this.ast = parser.results[0]
    this.variables = this.interpreter.findVariables(this.ast)
  }

  evaluate() {
    return this.interpreter.evaluate(this.ast)
  }
}

export default Expression
