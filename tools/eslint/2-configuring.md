# Configuring ESLint

There are two primary ways to configure ESLint:

1. **Configuration Comments** - use JavaScript comments to embed configuration information directly into a file.
2. **Configuration Files** -  use a JavaScript, JSON, or YAML file to specify configuration information for an entire directory and all of its subdirectories.

Here are some of the options that you can configure in ESLint:

- **Environments** - which environments your script is designed to run in. Each environment brings with it a certain set of predefined **global variables**.
- **Globals** - the additional global variables your script accesses during execution.
- **Rules** - which rules are enabled and at what error level.
- **Plugins** - which third-party plugins define additional **rules**, **environments**, **configs**, etc. for ESLint to use.
