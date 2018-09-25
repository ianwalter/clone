const defaultOptions = { objectCreate: true }

// ES6 Map
let map
try {
  map = Map
} catch (_) { }

// ES6 Set
let set
try {
  set = Set
} catch (_) { }

function baseClone (src, circulars, clones, options) {
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
    return src.map(i => clone(i, options))
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
    let keys = Object.keys(src)
    let obj = {}
    if (options.objectCreate) {
      obj = Object.create(src)
    } else {
      keys.forEach(function (key) {
        obj[key] = baseClone(src[key], circulars, clones, options)
      })
    }
    clones.push(obj)
    keys.forEach(function (key) {
      const idx = circulars.findIndex(function (i) {
        return i === src[key]
      })
      obj[key] = idx > -1
        ? clones[idx]
        : baseClone(src[key], circulars, clones, options)
    })
    return obj
  }

  // ???
  return src
}

module.exports = function clone (src, options = defaultOptions) {
  return baseClone(src, [], [], options)
}
