# Steps Component

A built-in component to turn a numbered list into a visual representation of
steps.


## Usage

Wrap a set of markdown h3 headings with the `Steps` component to turn them into
visual steps.

```mdx
import { Steps } from 'nextra/components'

<Steps>
### Step 1

Contents for step 1.

### Step 2

Contents for step 2.
</Steps>
```