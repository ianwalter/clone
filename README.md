# @ianwalter/clone
> A configurable utility to clone JavaScript data (Objects, Arrays, etc)

## About

I created clone because I wanted to use the terrific
[nanoclone](https://github.com/Kelin2025/nanoclone) utility but also be able to
configure how it clones Objects. With the `objectCreate` option, you can decide
whether Objects will be cloned using `Object.create` (the default, `true`) or by
iterating over the Object's keys (`false`).

The difference, for my purposes, is to be able to clone an Object without
cloning it's getters and setters. The state management library
[Vuex](https://vuex.vuejs.org) uses Object getters and setters for it's
"reactive" functionality and there are times when you might want to extract and
mutate data from the store without those mutations affecting the original data
in the store.

## Installation

```console
npm install @ianwalter/clone --save
```

## Usage

```js
import clone from '@ianwalter/clone'

const clonedBook = clone(book, { objectCreate: false })
```

## License

Apache 2.0 with Commons Clause - See [LICENSE](https://github.com/ianwalter/clone/blob/master/LICENSE)

&nbsp;

Created by [Ian Walter](https://iankwalter.com)

