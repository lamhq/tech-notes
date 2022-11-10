# Configuring Watch

Compiler supports configuring how to watch files and directories using compiler flags in TypeScript 3.8+.

The `--watch` implementation of the compiler relies on using `fs.watch` and `fs.watchFile`

`fs.watch` uses file system events, it is OS dependent and the notification is not completely reliable. Also there could be limit on number of watches that can be created. But there is not much CPU cycle involved

`fs.watchFile` uses polling and thus involves CPU cycles. But it is the most reliable mechanism to get the update on the status of file/directory.

## Configuring file watching

```ts
{
  // Some typical compiler options
  "compilerOptions": {
    "target": "es2020",
    "moduleResolution": "node"
    // ...
  },
  // NEW: Options for file/directory watching
  "watchOptions": {
    // Use native file system events for files and directories
    "watchFile": "useFsEvents",
    "watchDirectory": "useFsEvents",

    // Poll files for updates more frequently
    // when they're updated a lot.
    "fallbackPolling": "dynamicPriority",

    // Don't coalesce watch notification
    "synchronousWatchDirectory": true,
    
    // Finally, two additional settings for reducing the amount of possible
    // files to track  work from these directories
    "excludeDirectories": ["**/node_modules", "_build"],
    "excludeFiles": ["build/fileWhichChangesOfent.ts"]
  }
}
```