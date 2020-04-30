const { test } = require('@ianwalter/bff')
const Vue = require('vue')
const Vuex = require('vuex')
const clone = require('..')

Vue.use(Vuex)

test`an array is cloned ${t => {
  const arr = [{ mutated: false }]
  const copy = clone(arr)
  t.expect(copy).toStrictEqual(arr)
  arr.push('mutated')
  arr[0].mutated = true
  t.expect(copy).toMatchSnapshot()
}}`

test`a map is cloned ${t => {
  const map = new Map()
  map.set('one', { mutated: false })
  const copy = clone(map)
  t.expect(copy).toStrictEqual(map)
  const one = map.get('one')
  one.mutated = true
  map.set('two', 'mutated')
  t.expect(copy).toMatchSnapshot()
}}`

test`a nested array is cloned ${t => {
  const nested = { arr: [{ mutated: false }] }
  const copy = clone(nested)
  t.expect(copy).toStrictEqual(nested)
  nested.arr.push('mutated')
  nested.arr[0].mutated = true
  t.expect(copy).toMatchSnapshot()
}}`

test`Vuex store state prototype properties are not copied ${t => {
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
  t.expect(copy).toMatchSnapshot()
  store.commit('song/name', 'Desire')
  t.expect(copy.song.name).toBe(name)
}}`

test`circular properties are not copied ${t => {
  function Podcast () {
    this.name = 'Beanicles'
    this.circular = this
  }
  const podcast = new Podcast()
  const copy = clone(podcast)
  t.expect(copy).toEqual({ name: podcast.name })
}}`
