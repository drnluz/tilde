class Template {
  constructor(template) {
    this.template = template
  }

  render({ context, loopVar }) {
    const elem = document.createElement(template.tag)
    template.attributes.forEach(attr => {
      if (attr.name.startsWith('~') || attr.name.startsWith('data-tilde-')) {
        elem[attr.name] = this.resolveAttribute(attr.value)
      }
      else {
        elem[attr.name] = attr.value
      }
    })
  }

  resolveAttribute(expression) {

  }
}

class ForExpression {
  // Expressions in the format <loopVar> in <context>
  constructor(expression) {
    this.expression = expression
    this.items = this.parseLoopContext()
    this.loopVar = this.parseLoopVar()
  }

  parseLoopVar() {
    if (this.expression.includes('in')) {
      return this.expression.split('in')[0].trim()
    }
    else {
      return 'item'
    }
  }

  parseLoopContext() {
    return this.expression.split('in')[1].trim()
  }
}

class ForElement {
  constructor(element, context) {
    this.element = element
    this.context = context
    this.template = TemplateGenerator.generateTemplate(this)
    this.forExpression = new ForExpression(element.attributes['~for'].value)
  }

  render() {
    this.element.hidden = true

    this.forExpression.items.forEach(item => {
      let element = this.template.render({ context: item, loopVar: this.forExpression.loopVar })
      this.element.insertAdjacentHTML('afterend', element)
    })
  }
}

class TildeElement {
  constructor(element) {
    this.element = element
  }

  setupTildeAttributes() {
    const attributes = this.element.attributes
    for (var i = 0; i < attributes.length; i++) {
      let attr = attributes[i]

      if (attr.name.startsWith('~') || attr.name.startsWith('data-tilde-')) {
        this.setupTildeAttribute(attr)
      }
    }
  }

  setupTildeAttribute(attr) {
    const attributeName = attr.name.replace('~', '').replace('data-tilde-', '')

    if (attributeName == 'for') {
      new ForElement(this)
    }
  }
}

export default TildeElement
