const clone = require('../')

test('clone does not add setters when objectCreate is false', () => {
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
