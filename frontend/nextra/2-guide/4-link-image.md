# Next.js Link

All relative Markdown links are automatically converted to Next.js links. This
means that the target page will be prefetched. And when you click on a link, the
page will be loaded on the client-side like a SPA, without making a full page
load.

```md
Click [here](/about) to read more.
```

Will be equivalent to:

```jsx
import Link from 'next/link'

Click <Link href="/about">here</Link> to read more.
```


# Next.js Image

The standard way to use
[Next.js Image](https://nextjs.org/docs/basic-features/image-optimization)
inside MDX is to directly import the component:

```mdx
import Image from 'next/image'

<Image src="/demo.png" alt="Hello" width={500} height={500} />
```


# Static Image

Nextra supports automatically optimizing your static image imports with the
Markdown syntax.

```md filename="index.mdx"
![Hello](/demo.png)
```

With Next.js Image, there will be no layout shift, and a beautiful blurry
placeholder will be shown by default when loading the image.
