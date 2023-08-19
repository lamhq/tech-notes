# Cards Component

## Usage

```mdx filename="Markdown"
import { Cards, Card } from 'nextra/components'
import { CardsIcon, OneIcon, WarningIcon } from '../../icons'

<Cards>
  <Card icon={<WarningIcon />} title="Callout" href="/docs/guide/built-ins/callout" />
  <Card icon={<CardsIcon />} title="Tabs" href="/docs/guide/built-ins/tabs" />
  <Card icon={<OneIcon />} title="Steps" href="/docs/guide/built-ins/steps" />
</Cards>
```