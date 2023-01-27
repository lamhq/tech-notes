# Getting started

## Create a Vite Project

```bash
yarn create vite --template react-ts
```


## Command Line Interface

```json
{
  "scripts": {
    "dev": "vite", // start dev server, aliases: `vite dev`, `vite serve`
    "build": "vite build", // build for production
    "preview": "vite preview" // locally preview production build
  }
}
```

### Start dev server

```bash
vite [root] --host [host] --port <port> --mode <mode> --base <path>
```

### Preview production build

```bash
vite preview [root] --host [host] --port <port> --https --base <path> --mode <mode>
```
