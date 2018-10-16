const clone = require('../')

test('clone can clone an Array', () => {
  const list = [88, 'peach', [null, new Date()]]
  const copy = clone(list)
  expect(list).toEqual(copy)
  const mutated = 'mutated'
  copy.map(i => mutated)
  expect(list.every(i => i !== mutated)).toBe(true)
})

test('clone does not have Object setter when objectCreate is false', () => {
  const src = {
    firstName: 'Ian',
    lastName: 'Walter',
    get fullName () {
      return this.firstName + ' ' + this.lastName
    },
    set fullName (name) {
      const [firstName, lastName] = name.split(' ')
      this.firstName = firstName
      this.lastName = lastName
    }
  }
  const copy = clone(src, { objectCreate: false })
  expect([copy.firstName, copy.lastName]).toEqual(['Ian', 'Walter'])
  copy.fullName = 'Old Gregg'
  expect([copy.firstName, copy.lastName]).toEqual(['Ian', 'Walter'])
  expect(src.fullName).toBe('Ian Walter')
})
