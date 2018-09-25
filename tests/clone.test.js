const clone = require('../')

test('clones an Array', () => {
  const list = [88, 'peach', [null, new Date()]]
  const copy = clone(list)
  expect(list).toEqual(copy)
  const mutated = 'mutated'
  copy.map(i => mutated)
  expect(list.every(i => i !== mutated)).toBe(true)
})

test('clone does not have Object setter when objectCreate is false', () => {
  const store = { write: 0 }
  const person = {
    set name (_) {
      store.write++
    }
  }
  person.name = 'Old Gregg'
  const newPerson = clone(person, { objectCreate: false })
  expect(newPerson.name).toBe(person.name)
  newPerson.name = 'Barry Badrinath'
  expect(store.write).toBe(1)
})
