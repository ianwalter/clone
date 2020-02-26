import merge from '@ianwalter/merge'

export default function clone (src) {
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
    return src.map(clone)
  }

  // ES6 Maps
  if (src instanceof Map) {
    return new Map(Array.from(src.entries()).map(([k, v]) => [k, clone(v)]))
  }

  // ES6 Sets
  if (src instanceof Set) {
    return new Set(Array.from(src.values()).map(clone))
  }

  // Object
  if (src instanceof Object) {
    return merge({}, src)
  }

  // ???
  return src
}
