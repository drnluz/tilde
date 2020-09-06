import nearley from 'nearley'
import Interpreter from './expressions/interpreter'
import grammar from './expressions/parser/grammar'

class Expression {
  constructor(expression) {
    this.expression = expression
    this.ast = {}
    this.variables = []

    this.parseExpression()
  }

  parseExpression() {
    const compiledGrammar = nearley.Grammar.fromCompiled(grammar)
    const parser = new nearley.Parser(compiledGrammar)
    parser.feed(this.expression)

    this.ast = parser.results[0]
    this.variables = new Interpreter().findVariables(this.ast)
  }

  evaluate(context) {
    return new Interpreter(context).evaluate(this.ast)
  }
}

export default Expression
