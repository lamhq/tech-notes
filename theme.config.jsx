export default {
  logo: <span>Cheat Sheet</span>,
  project: {
    link: 'https://github.com/lamhq/cheat-sheet'
  },
  docsRepositoryBase: 'vscode://file//Users/admin/Desktop/repos/cheat-sheet/',
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Albert\'s Cheat Sheet'
    }
  },
  navigation: {
    prev: true,
    next: true
  },
  editLink: {
    text: 'Edit in VS Code'
  },
  sidebar: {
    defaultMenuCollapseLevel: 1
  },
  gitTimestamp: ({ timestamp }) => `Last update: ${timestamp.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}`
}