const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
  defaultShowCopyCode: true
})

module.exports = {
  ...withNextra(),
  // export static html assets instead of a nodejs app
  output: 'export',
  // disable Image Optimization API dut to not compatible with export
  images: { unoptimized: true }
}