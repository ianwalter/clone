const { test } = require('@ianwalter/bff')
const Vue = require('vue')
const Vuex = require('vuex')
const clone = require('.')

Vue.use(Vuex)

test('an array is cloned', ({ expect }) => {
  const list = [{ mutated: false }]
  const copy = clone(list)
  expect(copy).toStrictEqual(list)
  list.push('mutated')
  list[0].mutated = true
  expect(copy).toMatchSnapshot()
})

test('a map is cloned', ({ expect }) => {
  const map = new Map()
  map.set('one', { mutated: false })
  const copy = clone(map)
  expect(copy).toStrictEqual(map)
  const one = map.get('one')
  one.mutated = true
  map.set('two', 'mutated')
  expect(copy).toMatchSnapshot()
})

test('Vuex store state prototype properties are not copied', ({ expect }) => {
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
  expect(copy).toMatchSnapshot()
  store.commit('song/name', 'Desire')
  expect(copy.song.name).toBe(name)
})

test('circular properties are not copied', ({ expect }) => {
  function Podcast () {
    this.name = 'Beanicles'
    this.circular = this
  }
  const podcast = new Podcast()
  const copy = clone(podcast)
  expect(copy).toEqual({ name: podcast.name })
})
