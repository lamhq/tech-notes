# Syntax Highlighting

## Inlined Code

Inlined syntax highlighting like `let x = 1{:jsx}` is also supported via the
`{:}` syntax:

```md
Inlined syntax highlighting is also supported `let x = 1{:jsx}` via:
```


## Highlighting Lines

You can highlight specific lines of code by adding a `{}` attribute to the code
block:

````md filename="Markdown"
```js {1,4-5}
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```
````


## Highlighting Substrings

You can highlight specific substrings of code by adding a `//` attribute to the
code block:

````md filename="Markdown"
```js /useState/
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```
````


## Copy Button

By adding a `copy` attribute, a copy button will be added to the code block when
the user hovers over it:

````md filename="Markdown"
```js copy
console.log('hello, world')
```
````


## Line Numbers

You can add line numbers to your code blocks by adding a `showLineNumbers`
attribute:

````md filename="Markdown"
```js showLineNumbers
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```
````


## Filenames and Titles

You can add a filename or a title to your code blocks by adding a `filename`
attribute:

````md filename="Markdown"
```js filename="example.js"
console.log('hello, world')
```
````
