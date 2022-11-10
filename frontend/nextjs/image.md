# Image Component and Image Optimization

## Image Component

```js
import Image from 'next/image'

function Home() {
  return (
    <>
      <h1>My Homepage</h1>
      <Image
        src="/me.png"
        alt="Picture of the author"
        width={500}
        height={500}
      />
      <p>Welcome to my homepage!</p>
    </>
  )
}

export default Home
```

## Configuration

### Domain

To enable Image Optimization for images hosted on an external website, use an absolute url for the Image `src` and specify which `domains` are allowed to be optimized.

```js
// next.config.js
module.exports = {
  images: {
    domains: ['example.com'],
  },
}
```


## Caching

Images are optimized dynamically upon request and stored in the `<distDir>/cache/images` directory. The optimized image file will be served for subsequent requests until the expiration is reached.