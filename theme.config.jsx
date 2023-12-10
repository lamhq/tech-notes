export default {
  logo: <span>Tech Notes</span>,
  project: {
    link: 'https://github.com/lamhq/tech-notes'
  },
  docsRepositoryBase: 'https://github.com/lamhq/tech-notes/tree/master',
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Tech Notes'
    }
  },
  navigation: {
    prev: true,
    next: true
  }
  // ...
}