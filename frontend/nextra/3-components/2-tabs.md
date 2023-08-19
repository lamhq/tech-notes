# Tabs Component

## Usage

### Default

```mdx
import { Tabs, Tab } from 'nextra/components'

<Tabs items={['pnpm', 'npm', 'yarn']}>
  <Tab>**pnpm**: Fast, disk space efficient package manager.</Tab>
  <Tab>**npm** is a package manager for the JavaScript programming language.</Tab>
  <Tab>**Yarn** is a software packaging system.</Tab>
</Tabs>
```

### Default Selected Index

You can use the `defaultIndex` prop to set the default tab index:

```mdx /defaultIndex="1"/
import { Tab, Tabs } from 'nextra/components'

<Tabs items={['pnpm', 'npm', 'yarn']} defaultIndex="1">
  ...
</Tabs>
```