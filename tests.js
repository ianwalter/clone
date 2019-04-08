const Vue = require('vue')
const Vuex = require('vuex')
const clone = require('.')

Vue.use(Vuex)

exports['cloning an Array'] = ({ expect }) => {
  const list = [88, 'peach', [null, new Date()]]
  const copy = clone(list)
  expect(list).toEqual(copy)
  const mutated = 'mutated'
  copy.map(() => mutated)
  expect(list.every(i => i !== mutated)).toBe(true)
}

exports['cloning Vuex store state when proto is false'] = ({ expect }) => {
  const message = 'Hello!'
  const name = 'The Wheel'
  const store = new Vuex.Store({
    state: { message },
    modules: {
      song: {
        namespaced: true,
        state: { name },
        mutations: {
          name: (state, name) => (state.name = name)
        }
      }
    }
  })
  const copy = clone(store.state)
  expect(copy).toEqual({ message, song: { name } })
  store.commit('song/name', 'Desire')
  expect(copy.song.name).toBe(name)
}

exports['clone has Object setter when proto is true'] = ({ expect }) => {
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
  const copy = clone(src, { proto: true })
  expect([copy.firstName, copy.lastName]).toEqual(['Ian', 'Walter'])
  copy.fullName = 'Old Gregg'
  expect([copy.firstName, copy.lastName]).toEqual(['Old', 'Gregg'])
}
