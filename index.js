import findIndex from '@babel/runtime-corejs3/core-js-stable/instance/find-index'

// ES6 Map
let map
try { map = Map } catch (_) { /* Handling the error is unnecessary. */ }

// ES6 Set
let set
try { set = Set } catch (_) { /* Handling the error is unnecessary. */ }

function baseClone (src, circulars, clones, opts) {
  // Null/undefined/functions/etc
  if (!src || typeof src !== 'object' || typeof src === 'function') {
    return src
  }

  // DOM Node
  if (src.nodeType && 'cloneNode' in src) {
    return src.cloneNode(true)
  }

  // Date
  if (src instanceof Date) {
    return new Date(src.getTime())
  }

  // RegExp
  if (src instanceof RegExp) {
    return new RegExp(src)
  }

  // Arrays
  if (Array.isArray(src)) {
    return src.map(i => clone(i, opts))
  }

  // ES6 Maps
  if (map && src instanceof map) {
    return new Map(Array.from(src.entries()))
  }

  // ES6 Sets
  if (set && src instanceof set) {
    return new Set(Array.from(src.values()))
  }

  // Object
  if (src instanceof Object) {
    circulars.push(src)
    let obj = {}
    if (opts.proto) {
      obj = Object.create(src)
    }
    clones.push(obj)
    Object.keys(src).forEach(k => {
      const i = findIndex(circulars).call(circulars, i => i === src[k])
      obj[k] = i > -1 ? clones[i] : baseClone(src[k], circulars, clones, opts)
    })
    return obj
  }

  // ???
  return src
}

export default function clone (src, opts = { proto: false }) {
  return baseClone(src, [], [], opts)
}
