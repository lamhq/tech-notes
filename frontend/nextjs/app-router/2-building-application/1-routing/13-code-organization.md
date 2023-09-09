# Project Organization and File Colocation

## Project organization features

### Private Folders

Private folders can be created by prefixing a folder with an underscore: `_folderName`

They and their subfolders are excluded of routing.

Private folders can be useful for:

- Separating UI logic from routing logic.
- Consistently organizing internal files across a project and the Next.js ecosystem.
- Sorting and grouping files in code editors.
- Avoiding potential naming conflicts with future Next.js file conventions.


### `src` Directory

Next.js supports storing application code (including `app`) inside an optional `src` directory.

This separates application code from project configuration files which mostly live in the root of a project.

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fproject-organization-src-directory.png&w=3840&q=75&dpl=dpl_DMzbjJ6qfcbNz3HGySe9uGAgJ5sK)


### Module Path Aliases

Next.js supports Module Path Aliases which make it easier to read and maintain imports across deeply nested project files.

```jsx filename="app/dashboard/settings/analytics/page.js"
// before
import { Button } from '../../../components/button'

// after
import { Button } from '@/components/button'
```

### Route Groups

Check [here](./5-route-groups.md).

## Project organization strategies

Ways to organize code files and folders in a Next.js project.

### 1. Store project files outside of `app`

This strategy stores all application code in shared folders in the **root of your project** and keeps the `app` directory purely for routing purposes.

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fproject-organization-project-root.png&w=3840&q=75&dpl=dpl_DMzbjJ6qfcbNz3HGySe9uGAgJ5sK)


### 2. Store project files in top-level folders inside of `app`

This strategy stores all application code in shared folders in the **root of the `app` directory**.

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fproject-organization-app-root.png&w=3840&q=75&dpl=dpl_DMzbjJ6qfcbNz3HGySe9uGAgJ5sK)


### 3. Split project files by feature or route (recommended)

This strategy stores globally shared application code in the root `app` directory and **splits** more specific application code into the route segments that use them.

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fproject-organization-app-root-split.png&w=3840&q=75&dpl=dpl_DMzbjJ6qfcbNz3HGySe9uGAgJ5sK)
