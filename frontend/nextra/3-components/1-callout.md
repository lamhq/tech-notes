# Callout Component

A built-in component to show important information to the reader.

## Usage

### Default

```mdx
import { Callout } from 'nextra/components'

<Callout emoji="👾">
  **Space Invaders** is a 1978 shoot 'em up arcade game developed by Tomohiro
  Nishikado.
</Callout>
```

### Info

```mdx
import { Callout } from 'nextra/components'

<Callout type="info" emoji="ℹ️">
  Today is Friday.
</Callout>
```

### Warning

```mdx
import { Callout } from 'nextra/components'

<Callout type="warning" emoji="⚠️">
  This API will be deprecated soon.
</Callout>
```

### Error

```mdx
import { Callout } from 'nextra/components'

<Callout type="error" emoji="️🚫">
  This is a dangerous feature that can cause everything to explode.
</Callout>
```