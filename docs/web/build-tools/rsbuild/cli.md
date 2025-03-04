# CLI

## dev

Start a local dev server:
```sh
rsbuild dev -o
```
- `-o`: open the page in browser on startup
- `--port <port>`: specify a port number for Rsbuild Server to listen
- `--env-mode <mode>`: specify the env mode to load the `.env.[mode]` file


## build

Build the outputs for production in the `dist/` directory

```sh
rsbuild build -m production
```
- `-m <mode>`: specify the build mode, can be `development`, `production` or `none`
- `-w`: watch for changes and rebuild
- `--env-mode <mode>`: specify the env mode to load the `.env.[mode]` file


## preview

Preview the production build outputs locally (you need to execute the **build** command beforehand).

```sh
rsbuild preview
```
- `-o`: open the page in browser on startup
- `--port <port>`: specify a port number for Rsbuild Server to listen
