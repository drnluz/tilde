import GenericComponent from './generic-component'

class ComponentBuilder {
  static build(htmlElement) {
    // switch(htmlElement.tagName) {
    //   case 'INPUT':
    //     return new InputComponent(htmlElement)
    //   default:
    //     return new GenericComponent(htmlElement)
    // }
    return new GenericComponent(htmlElement)
  }
}

export default ComponentBuilder
