const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
  defaultShowCopyCode: true
})

module.exports = {
  ...withNextra(),
  // export static html assets instead of a nodejs app
  output: 'export',
  images: { unoptimized: true }
}