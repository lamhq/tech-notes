# React

## Create new project

To create a React TypeScript project in the current directory:
```sh
npx create-rsbuild -d . -t react-ts --tools biome
```


## Integrate with existing project

To use Rsbuild in an existing React project, follow this [guide](https://rsbuild.dev/guide/framework/react#use-react-in-an-existing-project).


## React Fast Refresh

Rsbuild uses Fast Refresh capability to perform HMR.

Your components need to be written according to Fast Refresh standards. You can use [eslint-plugin-react-refresh](https://github.com/ArnaudBarre/eslint-plugin-react-refresh) for validation.


## Router

[TanStack Router](https://tanstack.com/router/):
- type-safe React router
- built-in data fetching, stale-while revalidate caching and first-class search-param APIs
- provide Rsbuild plugin [`@tanstack/router-plugin`](https://github.com/TanStack/router/tree/main/examples/react/quickstart-rspack-file-based) that support [file-based routing](https://tanstack.com/router/latest/docs/framework/react/guide/file-based-routing).
