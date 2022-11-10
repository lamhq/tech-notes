# Setup TypeScript with React

## React + TypeScript Starter Kits

- [Next.js](https://nextjs.org/docs/basic-features/typescript): `npx create-next-app -e with-typescript` will create in your current folder
- [Create React App](https://facebook.github.io/create-react-app/docs/adding-typescript): `npx create-react-app name-of-app --template typescript` will create in new folder


## Import React

```ts
import * as React from "react";
import * as ReactDOM from "react-dom";
```

If you set `--allowSyntheticDefaultImports` (or add `"allowSyntheticDefaultImports": true`) in your `tsconfig.json` you can use more familiar imports:

```ts
import React from "react";
import ReactDOM from "react-dom";
```
