# Context and Helpers

## Using page parameters for your API query

```js
// pages/posts/_id.vue
export default {
  async asyncData({ params, $http, error }) {
    const id = params.id

    try {
      // Using the nuxtjs/http module here exposed via context.app
      const post = await $http.$get(`https://api.nuxtjs.dev/posts/${id}`)
      return { post }
    } catch (error) {
      error(error) // Show the nuxt error page with the thrown error
    }
  }
}
```


## Redirecting users & accessing the store

```js
export default {
  middleware({ store, redirect }) {
    // retrieving keys via object destructuring
    const isAuthenticated = store.state.authenticated
    if (!isAuthenticated) {
      return redirect('/login')
    }
  }
}
```


## Connection checker

`$nuxt` is a helper accessible via `this.$nuxt` in Vue components and via `window.$nuxt` otherwise on the client side.

```html
<template>
  <div>
    <div v-if="$nuxt.isOffline">You are offline</div>
    <Nuxt />
  </div>
</template>
```


## Refreshing page data

Refresh the data, provided by `asyncData` or `fetch`.

```html
<template>
  <div>
    <div>{{ content }}</div>
    <button @click="refresh">Refresh</button>
  </div>
</template>

<script>
  export default {
    asyncData() {
      return { content: 'Created at: ' + new Date() }
    },
    methods: {
      refresh() {
        this.$nuxt.refresh()
      }
    }
  }
</script>
```


## Controlling the loading bar

Control Nuxt's loading bar programmatically via `this.$nuxt.$loading`.

```js
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
```


## Determine where your app was rendered

In the example, `renderedOn` will evaluate to `server` when using server-side rendering and a user accesses the page directly. When the user would navigate to the page from another part of the application, e.g. by click on a `<NuxtLink>`, it will evaluate to `client`.

```html
<!-- pages/about.vue -->

<template>
  <h1>I am rendered on the {{ renderedOn }} side</h1>
</template>

<script>
  export default {
    asyncData() {
      return { renderedOn: process.client ? 'client' : 'server' }
    }
  }
</script>
```

