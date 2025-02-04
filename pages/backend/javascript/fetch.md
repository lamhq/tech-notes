# Working with HTTP

## Fetch API

The Fetch API is a modern JavaScript interface for making HTTP requests and handling responses.

The Fetch API is supported at:
- Modern web browsers
- Node.js environment


## Get JSON from a URL

```js
fetch('https://api.github.com/orgs/nodejs')
  .then(response => response.json())
  .then(data => {
    console.log(data) // Prints result from `response.json()` in getRequest
  })
  .catch(error => console.error(error))
```

## Custom headers

```js
fetch('https://api.github.com/orgs/nodejs', {
  headers: new Headers({
    'User-agent': 'Mozilla/4.0 Custom User Agent'
  })
})
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
  .catch(error => console.error(error))
```

## Check request success

```js
fetch('https://api.github.com/orgs/nodejs')
  .then(response => 
    // whether the response was successful (status in the range 200-299) or not
    response.ok ? 
      response.json() : 
      Promise.reject(new Error('Request failed'))
  )
  .then(data => {
    console.log(data) // Prints result from `response.json()`
  })
  .catch(error => console.error(error))
```

## Request body

```js
fetch(url, {
  credentials: 'same-origin', // 'include', default: 'omit'
  method: 'POST',             // 'GET', 'PUT', 'DELETE', etc.
  body: JSON.stringify(data), // Use correct payload (matching 'Content-Type')
  headers: { 'Content-Type': 'application/json' },
})
  .then(response => response.json())
  .catch(error => console.error(error))
```
