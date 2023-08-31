# Static Assets

Next.js can serve static files, like images, under a folder called `public` in the root directory. Files inside `public` can then be referenced by your code starting from the base URL (`/`).

For example, if you add `me.png` inside `public`, the following code will access the image:

```jsx filename="Avatar.js"
import Image from 'next/image'

export function Avatar() {
  return <Image src="/me.png" alt="me" width="64" height="64" />
}
```