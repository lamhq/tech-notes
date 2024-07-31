# CLI

## Deno run command

```shell
deno run --allow-net net_client.ts
```

Options:
- `--allow-net`: give your code network access to start an HTTP server
- `-A`: Grant all permissions


### Hot Module Replacement

```shell
deno run --unstable-hmr main.ts
```

When a hot module replacement is triggered, the runtime will dispatch a `CustomEvent` of type `hmr` that will include `path` property in its `detail` object.You can listen for this event and perform any additional logic that you need to do when a module is updated (eg. notify a browser over a WebSocket connection).

```ts
addEventListener("hmr", (e) => {
  console.log("HMR triggered", e.detail.path);
});
```


## Specifying script source

Deno can grab the scripts from: local file, url, stdin.

```shell
deno run main.ts
deno run https://mydomain.com/main.ts
cat main.ts | deno run -
```


## Passing arguments to script

You can pass user-space arguments to the script you are running by specifying them **after** the script name:

```shell
deno run main.ts a b -c --quiet
```

```ts filename="main.ts"
// main.ts
console.log(Deno.args); // [ "a", "b", "-c", "--quiet" ]
```


## Watch mode

To enable the built-in file watcher, you can supply the `--watch` flag to:
- deno run
- deno test
- deno compile
- deno fmt

```shell
deno run --watch main.ts
deno test --watch
deno fmt --watch
```

Exclude files:
```shell
deno run --watch --watch-exclude=file1.ts,file2.ts main.ts
```


## Type checking

You can type-check your code (without executing it):
```shell
deno check main.ts
```

Type-check your code before execution:
```shell
deno run --check main.ts
```


## Autocomplete

Enable command autocompletion for bash, zsh, fish:

```shell
brew install fig
```


## Viewing help

```shell
deno -h
```

For `run` command:
```shell
deno run -h
```


## References

- [Command Line Interface](https://docs.deno.com/runtime/manual/getting_started/command_line_interface)