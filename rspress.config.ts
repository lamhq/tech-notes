import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: 'docs',
  title: "Albert's Cheat sheet",
  icon: '/logo.svg',
  logo: '/logo.svg',
  themeConfig: {
    lastUpdated: true,
    enableScrollToTop: true,
  },
});