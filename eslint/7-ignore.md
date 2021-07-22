# Ignoring Code

## `ignorePatterns`

You can tell ESLint to ignore specific files and directories using `ignorePatterns` in your config files.

`ignorePatterns` patterns follow the same rules as .eslintignore

Patterns defined in `.eslintignore` take precedence over the `ignorePatterns` property of config files.

```json
{
  "ignorePatterns": ["temp.js", "**/vendor/*.js"],
}
```


## The `.eslintignore` File

You can tell ESLint to ignore specific files and directories by creating an `.eslintignore` file in your project's root directory.

```
**/*.js

# Valid
/root/src/*.js

# Invalid
\root\src\*.js
```

- Lines beginning with `#` are treated as comments and do not affect the ignore patterns.
- Paths are relative to the current working directory. This is also true of paths passed in via the `--ignore-pattern` command.
- Lines preceded by `!` are negated patterns that re-include a pattern that was ignored by an earlier pattern.
- Ignore patterns behave according to the `.gitignore` [specification](https://git-scm.com/docs/gitignore#_pattern_format).
- all paths used as patterns for both `.eslintignore` and `--ignore-pattern` must use forward slashes (`/`) as their path separators.

ESLint always follows a couple of implicit ignore rules:

- `node_modules/` is ignored.
- dot-files (except for `.eslintrc.*`), as well as dot-folders and their contents, are ignored.