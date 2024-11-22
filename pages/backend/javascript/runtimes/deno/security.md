# Security

You must explicitly allow your code to access potentially sensitive APIs (like file system, network connectivity, environment variables).


## Permissions list

Check the [official documentation](https://docs.deno.com/runtime/manual/basics/permissions#permissions-list) for avalable permissions.


## Configurable permissions

Some permissions allow you to grant access to a specific list of entities (files, servers, etc) rather than to everything.


### Subprocess

Deno can start other programs (or shell commands) using `Deno.run` (with `--allow-run` permission granted).

Those processes can access all system resources (regardless of the permissions you granted to the Deno process that spawns them).

You can reduce the risk by limiting which programs a Deno process can start:

```ts filename="run.js"
// run.js
const proc = Deno.run({ cmd: ["whoami"] });
```

### Other permissions

Check [the official doc](https://docs.deno.com/runtime/manual/basics/permissions#file-system-access) for:
- File system access
- Network access
- Environment variables