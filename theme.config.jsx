export default {
  logo: <span>Cheat Sheet</span>,
  project: {
    link: 'https://github.com/lamhq/cheat-sheet'
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Albert\'s Cheat Sheet'
    }
  },
  navigation: {
    prev: true,
    next: true
  },
  // make the edit link in navigation panel to open local file
  docsRepositoryBase: 'vscode://file//Users/admin/Desktop/repos/cheat-sheet/',
  editLink: {
    text: 'Edit in VS Code'
  },
  // collapse the top items
  sidebar: {
    defaultMenuCollapseLevel: 1
  },
  // update the display of Last Update Time
  gitTimestamp: ({ timestamp }) => `Last update: ${timestamp.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}`
}