# Internationalization

## Setup

```sh
yarn add nuxt-i18n
```


```js
// nuxt.config.j
{
  modules: [
    'nuxt-i18n',
    { /* module options */ }
  ],
  // Or with global options
  i18n: {
    locales: ['en', 'fr', 'es'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          welcome: 'Welcome'
        },
        fr: {
          welcome: 'Bienvenue'
        },
        es: {
          welcome: 'Bienvenido'
        }
      }
    }
  }
}
```


## Routing

`nuxt-i18n` overrides Nuxt default routes to add locale prefixes to every URL. There are four supported strategies for generating the app's routes:

- **no_prefix**: This implies that you have to rely on browser & cookie detection, and implement locale switches by calling the i18n API.
- **prefix_except_default**: all of your routes will have a locale prefix added except for the default language.
- **prefix**: all routes will have a locale prefix.
- **prefix_and_default**: you will get URLs with prefixes for every language, but URLs for the default language will also have a non-prefixed version.

**nuxt.config.js**:

```js
['nuxt-i18n', {
  strategy: 'prefix_except_default',
  defaultLocale: 'en'
}]
```

## Configure i18n support for different pages

Override global settings to allow some languages only for a page:

```js
// pages/about.vue
export default {
  nuxtI18n: {
    locales: ['fr', 'es']
  }
}
```

Completely disable i18n on a given page:

```js
// pages/about.vue
export default {
  nuxtI18n: false
}
```

By module's configuration:

```js
// nuxt.config.js
['nuxt-i18n', {
  parsePages: false,
  pages: {
    about: {
      en: false,
    }
  }
}]
```


## Browser language detection

By default, `nuxt-i18n` attempts to redirect users to their preferred language by detecting their browser's language. This is controlled by the detectBrowserLanguage option:

```js
// nuxt.config.js
['nuxt-i18n', {
  // ...
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    // onlyOnRoot: true,
  }
}]
```

To completely disable the browser's language detection feature, set `detectBrowserLanguage` to `false`.


## Create URL (localized)

`localePath` – Returns the localized URL for a given page.

The first parameter can be either the path or name of the route or an object for more complex routes.

A locale code can be passed as the second parameter to generate a link for a specific language

```html
<nuxt-link :to="localePath('index', 'en')">Homepage in English</nuxt-link>

<nuxt-link :to="localePath('/app/profile')">Route by path to: {{ $t('Profile') }}</nuxt-link>

<nuxt-link :to="localePath('app-profile')">Route by name to: {{ $t('Profile') }}</nuxt-link>

<nuxt-link
  :to="localePath({ name: 'category-slug', params: { slug: category.slug } })">
  {{ category.title }}
</nuxt-link>

<!-- It's also allowed to omit 'name' and 'path'. -->
<nuxt-link :to="localePath({ params: { slug: 'ball' } })">{{ category.title }}</nuxt-link>
```


## Lang Switcher

`switchLocalePath` – Returns a link to the current page in another language

```js
// nuxt.config.js
['nuxt-i18n', {
  locales: [
    {
      code: 'en',
      name: 'English'
    },
    {
      code: 'es',
      name: 'Español'
    },
    {
      code: 'fr',
      name: 'Français'
    }
  ]
}]
```

```js
// component
computed: {
  availableLocales () {
    return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
  }
}
```

```html
<nuxt-link
  v-for="locale in availableLocales"
  :key="locale.code"
  :to="switchLocalePath(locale.code)">
  {{ locale.name }}
</nuxt-link>
```

When using `detectBrowserLanguage` and wanting to persist locale on a route change, you must call one of the functions that update the stored locale cookie. Otherwise, locale might switch back to the saved one during navigation:

```html
<a
  href="#"
  v-for="locale in availableLocales"
  :key="locale.code"
  @click.prevent.stop="setLocale(locale.code)">
  {{ locale.name }}
</a>
```


## Lazy-load translations

To enable translations lazy-loading:

- Set `lazy` option to true
- Set `langDir` option to the directory that contains your translation files (this can NOT be empty)
- Configure `locales` option as an array of object, where each object has a `file` key which value is the translation file corresponding to the locale
- Optionally, remove all messages that you might have passed to vue-i18n via `vueI18n` option
- Each `file` can return either an `Object` or a `function` (supports `Promises`)

```js
// nuxt.config.js
['nuxt-i18n', {
  locales: [
    {
      code: 'en',
      file: 'en-US.js'
    },
    {
      code: 'es',
      file: 'es-ES.js'
    },
    {
      code: 'fr',
      file: 'fr-FR.js'
    }
  ],
  lazy: true,
  langDir: 'lang/'
}]
```

```js
// lang/en-US.js
export default async (context, locale) => {
  await resolve({
    welcome: 'Welcome'
  })
}

// or

export default {
  welcome: 'Welcome'
}
```

```
nuxt-project/
├── lang/
│   ├── en-US.js
│   ├── es-ES.js
│   ├── fr-FR.js
├── nuxt.config.js
```