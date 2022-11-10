# Basic

## Installation

```sh
yarn add i18next
```


## Init

```js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const translation = {
  // languages
  en: {
    common: {
      'runtime-error': 'Something went wrong',
      'server-error': 'Server error',
    },
    app: {
      'email-not-exist': "There's no user associated with this email.",
      'email-not-available': 'This email is not available.',
    },
  },
  vi: {
    common: {
      'runtime-error': 'Có lỗi bí ẩn xảy ra.',
      'server-error': 'Lỗi khi giao tiếp với máy chủ.',
    },
    app: {
      'email-not-exist': 'Email này không tồn tại.',
      'email-not-available': 'Email này đã được đăng ký.',
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: translation,
    defaultNS: 'common',
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    saveMissing: true,
    missingKeyHandler: (lng, ns, key) => {
      console.warn(`Missing translation: ${ns}:${key} (${lng})`);
    },
  }).then(function(t) {
    // initialized and ready to go!
    document.getElementById('output').innerHTML = i18next.t('key');
  });
```


## Example

- [i18next-gitbook repo](https://github.com/i18next/i18next-gitbook/tree/master/locales)