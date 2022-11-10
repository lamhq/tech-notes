# Vue I18n

## Formatting

### Named formatting

```js
const messages = {
  en: {
    message: {
      hello: '{msg} world'
    }
  }
}
```

Template:

```html
<p>{{ $t('message.hello', { msg: 'hello' }) }}</p>
```

Output:

```html
<p>hello world</p>
```

### List formatting

```js
const messages = {
  en: {
    message: {
      hello: '{0} world'
    }
  }
}
```

```html
<p>{{ $t('message.hello', ['hello']) }}</p>
```


### HTML formatting

We recommended using the component interpolation feature.

```js
const messages = {
  en: {
    message: {
      hello: 'hello <br> world'
    }
  }
}
```

```html
<p v-html="$t('message.hello')"></p>
```


## Locale messages syntax

```js
{
  "en": {  // 'en' Locale
    "key1": "this is message1", // basic
    "nested": { // nested
      "message1": "this is nested message1"
    },
    "errors": [ // array
      "this is 0 error code message",
      {  // object in array
        "internal1": "this is internal 1 error message"
      },
      [  // array in array
        "this is nested array error 1"
      ]
    ]
  },
  "ja": { // 'ja' Locale
    // ...
  }
}
```

```html
<div id="app">
  <!-- basic -->
  <p>{{ $t('key1') }}</p>
  <!-- nested -->
  <p>{{ $t('nested.message1') }}</p>
  <!-- array -->
  <p>{{ $t('errors[0]') }}</p>
  <!-- object in array -->
  <p>{{ $t('errors[1].internal1') }}</p>
  <!-- array in array -->
  <p>{{ $t('errors[2][0]') }}</p>
</div>
```

### String syntax

```js
new Vue({
  i18n: new VueI18n({
    locale: 'en',
    messages: {
      en: { hello: 'hi there!' },
      ja: { hello: 'こんにちは！' }
    }
  }),
  data: { path: 'hello' }
}).$mount('#string-syntax')
```

```html
<div id="string-syntax">
  <!-- string literal -->
  <p v-t="'hello'"></p>
  <!-- keypath binding via data -->
  <p v-t="path"></p>
</div>
```

Outputs:

```html
<div id="string-syntax">
  <p>hi there!</p>
  <p>hi there!</p>
</div>
```

### `$t` vs `v-t`

`$t` is an extended Vue instance method. It use mustache syntax `{{}}` in templates and also computed props and methods. `$t` is executed every time when re-render occurs, so it does have translation costs.

`v-t` is a custom directive. It has better performance than the `$t` method. The translated content with `v-t` is inserted into the textContent of the element. when you use server-side rendering, you need to set the [custom directive](https://github.com/kazupon/vue-i18n-extensions#directive-v-t-custom-directive-for-server-side) to `directives` option of the `createRenderer` function.

## Component based localization

In general, locale info is set as constructor option of `VueI18n` instance and it sets `i18n` option as root Vue instance. You can also manage locale info for each component separately, if the component doesn't have the locale message, it falls back to globally defined localization info.

```js
// setup locale info for root Vue instance
const i18n = new VueI18n({
  locale: 'ja',
  messages: {
    en: {
      message: {
        hello: 'hello world',
        greeting: 'good morning'
      }
    },
    ja: {
      message: {
        hello: 'こんにちは、世界',
        greeting: 'おはようございます'
      }
    }
  }
})

// Define component
const Component1 = {
  template: `
    <div class="container">
     <p>Component1 locale messages: {{ $t("message.hello") }}</p>
     <p>Fallback global locale messages: {{ $t("message.greeting") }}</p>
   </div>`,
  i18n: { // `i18n` option, setup locale info for component
    messages: {
      en: { message: { hello: 'hello component1' } },
      ja: { message: { hello: 'こんにちは、component1' } }
    }
  }
}

new Vue({
  i18n,
  components: {
    Component1
  }
}).$mount('#app')
```

```html
<!-- template -->
<div id="app">
  <p>{{ $t("message.hello") }}</p>
  <component1></component1>
</div>
```

Output:

```html
<div id="app">
  <p>こんにちは、世界</p>
  <div class="container">
    <p>Component1 locale messages: こんにちは、component1</p>
    <p>Fallback global locale messages: おはようございます</p>
  </div>
</div>
```

### Shared locale messages for components

Sometimes you may want to import shared locale messages for certain components, not fallback from global locale messages. You can use `sharedMessages` options of `i18n`

```js
// component code
import commonMessage from './locales/common' // import common locale messages

export default {
  name: 'ServiceModal',
  template: `
    <div class="modal">
      <div class="body">
        <p>This is good service</p>
      </div>
      <div class="footer">
        <button type="button">{{ $t('buttons.save') }}</button>
      </div>
    </div>
  `,
  i18n: {
    messages: { ... },
    sharedMessages: commonMessages
  }
}
```

```js
// locales/common
export default {
  en: {
    buttons: {
      save: "Save",
      // ...
    }
  },
  ja: {
    buttons: {
      save: "保存",
      // ...
    }
  }
}
```


## Component interpolation

### Basic Usage

```js
const messages = {
  en: {
    term: 'I accept xxx {0}.'
    tos: 'Term of Service',
  },
  ja: {
    term: '私は xxx の{0}に同意します。'
    tos: '利用規約',
  }
}

const i18n = new VueI18n({
  locale: 'en',
  messages
})
new Vue({
  i18n,
  data: {
    url: '/term'
  }
}).$mount('#app')
```

```html
<div id="app">
  <i18n path="term" tag="label" for="tos">
    <a :href="url" target="_blank">{{ $t('tos') }}</a>
  </i18n>
</div>
```

Output:

```html
<div id="app">
  <label for="tos">
    I accept xxx <a href="/term" target="_blank">Term of Service</a>.
  </label>
</div>
```


### Slots syntax usage

```js
const messages = {
  en: {
    info: 'You can {action} until {limit} minutes from departure.',
    change: 'change your flight',
    refund: 'refund the ticket'
  }
}

const i18n = new VueI18n({
  locale: 'en',
  messages
})

new Vue({
  i18n,
  data: {
    changeUrl: '/change',
    refundUrl: '/refund',
    changeLimit: 15,
    refundLimit: 30
  }
}).$mount('#app')
```

```html
<div id="app">
  <i18n path="info" tag="p">
    <template #action>
      <a :href="changeUrl">{{ $t('change') }}</a>
    </template>
    <template #limit>
      <span>{{ changeLimit }}</span>
    </template>
  </i18n>
</div>
```

Output:

```html
<div id="app">
  <p>
    You can <a href="/change">change your flight</a> until <span>15</span> minutes from departure.
  </p>
</div>
```


## Locale changing

Sometimes you might want to dynamically change the locale. In that case you can change the value of the `locale` property of the `VueI18n` instance.

```js
const i18n = new VueI18n({
  locale: 'ja', // set locale
  ...
})

// create root Vue instance
new Vue({
  i18n,
  ...
}).$mount('#app')

// change other locale
i18n.locale = 'en'
```

```html
<template>
  <div class="locale-changer">
    <select v-model="$i18n.locale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'locale-changer',
  data () {
    return { langs: ['ja', 'en'] }
  }
}
</script>
```
