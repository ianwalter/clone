import test from 'ava'
import Vue from 'vue'
import Vuex from 'vuex'

import clone from '.'

Vue.use(Vuex)

test('clone can clone an Array', t => {
  const list = [88, 'peach', [null, new Date()]]
  const copy = clone(list)
  t.deepEqual(list, copy)
  const mutated = 'mutated'
  copy.map(i => mutated)
  t.true(list.every(i => i !== mutated))
})

test('clone can clone Vuex store state when proto is false', t => {
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
  t.deepEqual(copy, { message, song: { name } })
  store.commit('song/name', 'Desire')
  t.is(copy.song.name, name)
})

test('clone has Object setter when proto is true', t => {
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
  t.deepEqual([copy.firstName, copy.lastName], ['Ian', 'Walter'])
  copy.fullName = 'Old Gregg'
  t.deepEqual([copy.firstName, copy.lastName], ['Old', 'Gregg'])
})
