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

test('clone does not have Object setter when proto is false', t => {
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
  const copy = clone(src)
  t.deepEqual([copy.firstName, copy.lastName], ['Ian', 'Walter'])
  copy.fullName = 'Old Gregg'
  t.deepEqual([copy.firstName, copy.lastName], ['Ian', 'Walter'])
  t.deepEqual(src.fullName, 'Ian Walter')
})

test('clone can clone Vuex store state when objectCreate is false', t => {
  const message = 'Hello!'
  const name = 'The Wheel'
  const store = new Vuex.Store({
    state: { message },
    modules: { song: { state: { name } } }
  })
  const copy = clone(store.state)
  t.deepEqual(copy, { message, song: { name } })
})
