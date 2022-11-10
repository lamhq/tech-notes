# Get stared

## Installation

```sh
yarn create nuxt-app <project-name>
cd <project-name>
yarn dev
```

## Routing

Nuxt.js automatically generates the `vue-router` configuration for you, based on your provided Vue files inside the `pages` directory.

To navigate between pages of your app, you should use the `NuxtLink` component.

**pages/index.vue**:

```vue
<template>
  <NuxtLink to="/">Home page</NuxtLink>
</template>
```


## Default Layout

You can define a default layout by adding a `default.vue` file inside the `layouts` directory. The only thing you need to include in the layout is the `<Nuxt />` component which renders the page component.

**layouts/default.vue**:

```vue
<template>
  <Nuxt />
</template>
```


## Custom Layout

To use the layout `blog` in a page:

**pages/posts.vue**:

```vue
<template>
  <!-- Your template -->
</template>
<script>
  export default {
    layout: 'blog'
    // page component definitions
  }
</script>
```


## Error Page

The error page is a page component which is always displayed when an error occurs. Although this file is placed in the `layouts` folder, it should be treated as a page. You should not include the `<Nuxt/>`  component inside its template

**layouts/error.vue**:

```vue
<template>
  <div>
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error' // you can set a custom layout for the error page
  }
</script>
```