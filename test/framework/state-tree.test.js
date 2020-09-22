import StateTree from '../../src/framework/state-tree.js'

describe('initialize', () => {
  const state = new StateTree({ a: 'a', b: { c: 'c' } })

  test('wraps value object in a StateTree', () => {
    expect(state.a).toBeInstanceOf(StateTree)
    expect(state.b).toBeInstanceOf(StateTree)
    expect(state.b.c).toBeInstanceOf(StateTree)
  })

  test('sets value getters', () => {
    expect(state.a._value).toBe('a')
    expect(state.b.c._value).toBe('c')
  })

  test('sets value setters', () => {
    state.a = 'another value'
    expect(state.a).toBeInstanceOf(StateTree)
    expect(state.a._value).toBe('another value')
  })

  test('emit change event', (done) => {
    function callback(event, newState) {
      try {
        expect(event).toBe('change')
        expect(newState.a._value).toBe('another value')
        done()
      }
      catch (error) {
        done(error)
      }
    }

    state.on('change', callback)
    state.a = 'another value'
  })
})

describe('change existing keys', () => {
  const state = new StateTree({ a: 'a', b: { c: 'c' } })

  test('sets primitive value', () => {
    state.a = 'another value'
    expect(state.a).toBeInstanceOf(StateTree)
    expect(state.a._value).toBe('another value')
  })

  test('sets object value', () => {
    state.a = { d: 'd' }
    expect(state.a).toBeInstanceOf(StateTree)
    expect(state.a.d._value).toBe('d')
  })

  test('emit change event', (done) => {
    function callback(event, newState) {
      try {
        expect(event).toBe('change')
        expect(newState.a._value).toBe('new value')
        done()
      }
      catch (error) {
        done(error)
      }
    }

    state.on('change', callback)
    state.setKey('a', 'new value')
  })
})

describe('add new keys', () => {
  const state = new StateTree({})

  test('primitive value', () => {
    state.setKey('a', 'value')
    expect(state.a).toBeInstanceOf(StateTree)
    expect(state.a._value).toBe('value')
  })

  test('object value', () => {
    state.setKey('a', { d: 'd' })
    expect(state.a).toBeInstanceOf(StateTree)
    expect(state.a.d._value).toBe('d')
  })

  test('emit change event', (done) => {
    function callback(event, newState) {
      try {
        expect(event).toBe('change')
        expect(newState.a._value).toBe('new value')
        done()
      }
      catch (error) {
        done(error)
      }
    }

    state.on('change', callback)
    state.setKey('a', 'new value')
  })
})

describe('replace state value', () => {
  const state = new StateTree({ a: 'a' })

  test('object value', () => {
    state.set({ b: 'b' })

    expect(state.b).toBeInstanceOf(StateTree)
    expect(state.b._value).toBe('b')

    expect(state.a).toBeUndefined()
  })

  test('primitive value', () => {
    state.set('value')

    expect(state._value).toBe('value')
    expect(state.a).toBeUndefined()
  })

  test('emit change event', (done) => {
    function callback(event, value) {
      try {
        expect(event).toBe('change')
        expect(value).toBe('new value')
        done()
      }
      catch (error) {
        done(error)
      }
    }

    state.on('change', callback)
    state.set('new value')
  })
})
