export default {
  logo: <span>Tech Notes</span>,
  project: {
    link: 'https://github.com/lamhq/tech-notes'
  },
  docsRepositoryBase: `vscode://file//Users/admin/Desktop/repos/tech-notes/`,
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Tech Notes'
    }
  },
  navigation: {
    prev: true,
    next: true
  },
  editLink: {
    text: 'Edit in VS Code'
  }
  // ...
}