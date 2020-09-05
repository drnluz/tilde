export default {
  generateTemplate(element) {
    return { tag: element.tagName, children: childElements(element), attributes: detectAttributes(element) }
  },

  detectAttributes(element) {
    let attributes = []

    Array.from(element.attributes).forEach((attr) => {
      attributes.push({ name: attr.name, value: attr.value })
    })

    return attributes
  },

  childElements(element) {
    let children = []

    Array.from(element.children).forEach((child) => {
      children.push(generateTemplate(child))
    })

    return children
  }
}
