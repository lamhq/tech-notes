# Get started

This guide will help you create a software documentation website.

## Start as New Project

### Install

```shell
pnpm add next react react-dom nextra nextra-theme-docs
```

Add the following scripts in `package.json`:

```json
"scripts": {
  "dev": "next",
  "build": "next build",
  "start": "next start"
},
```

### Add Next.js Config

`next.config.js`:
```tsx
const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx'
})
 
module.exports = withNextra()
 
// If you have other Next.js configurations, you can pass them as the parameter:
// module.exports = withNextra({ /* other next.js config */ })
```

### Create Docs Theme Config

`theme.config.jsx`:

```js
export default {
  logo: <span>My Nextra Documentation</span>,
  project: {
    link: 'https://github.com/shuding/nextra'
  }
  // ...
}
```


Now, you can create your first MDX page as `pages/index.mdx`:

```md
# Welcome to Nextra
 
Hello, world!
```