export default class {
  constructor(context) {
    this.context = context
  }

  assignment_operation(node) {
    this.context.setVariable(node.variable.name, this.evaluate(node.value))
  }

  and_operation(node) {
    return this.evaluate(node.left) && this.evaluate(node.right)
  }

  or_operation(node) {
    return this.evaluate(node.left) || this.evaluate(node.right)
  }

  not_operation(node) {
    return !this.evaluate(node.value)
  }

  literal(node) {
    return node.value
  }

  equality_operation(node) {
    if (node.operator == "!=") {
      return this.evaluate(node.left) != this.evaluate(node.right)
    }
    else {
      return this.evaluate(node.left) == this.evaluate(node.right)
    }
  }

  comparison_operation(node) {
    switch(node.operator) {
      case '==':
        return this.evaluate(node.left) == this.evaluate(node.right)
      case '!=':
        return this.evaluate(node.left) != this.evaluate(node.right)
      case '<':
        return this.evaluate(node.left) < this.evaluate(node.right)
      case '<=':
        return this.evaluate(node.left) <= this.evaluate(node.right)
      case '>':
        return this.evaluate(node.left) > this.evaluate(node.right)
      case '>=':
        return this.evaluate(node.left) >= this.evaluate(node.right)
    }
  }

  arithmetic_operation(node) {
    switch(node.operator) {
      case '+':
        return this.evaluate(node.left) + this.evaluate(node.right)
      case '-':
        return this.evaluate(node.left) - this.evaluate(node.right)
      case '*':
        return this.evaluate(node.left) * this.evaluate(node.right)
      case '/':
        return this.evaluate(node.left) / this.evaluate(node.right)
      case '%':
        return this.evaluate(node.left) % this.evaluate(node.right)
    }
  }

  variable(node) {
    return this.context.resolveVariable(node.name)
  }

  function_call(node) {
    const resolvedArgs = node.args.map((arg) => this.evaluate(arg))
    return this.context.callFunction(this.evaluate(node.name), resolvedArgs)
  }

  identifier(node) {
    return node.value
  }

  object(node) {
    const obj = {}
    node.members.forEach(member => {
      let { key, value } = this.evaluate(member)
      obj[key] = value
    })
    return obj
  }

  object_member(node) {
    return { key: this.evaluate(node.key), value: this.evaluate(node.value) }
  }

  evaluate(node) {
    return this[node.type].call(this, node)
  }

  // TODO: Maybe I can get that from nearley parser
  findVariables(node) {
    if (node.type == 'variable') {
      return [node.name]
    }
    else {
      let vars = []

      if (node.left) {
        vars.push(this.findVariables(node.left))
      }

      if (node.right) {
        vars.push(this.findVariables(node.right))
      }

      if (node.value) {
        vars.push(this.findVariables(node.value))
      }

      return vars.flat()
    }
  }
}

