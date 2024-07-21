# Configuring ESLint

## Overview

There are two primary ways to configure ESLint:
1. **Configuration Comments** - use JavaScript comments to embed configuration information directly into a file.
2. **Configuration Files** -  use a JavaScript file to specify configuration information for an entire directory and all of its subdirectories. 

Here are some of the options that you can configure in ESLint:
- **Files** and **Ignores** - which files should be applied to and which not
- **Rules** - which rules are enabled and at what error level.
- **Plugins** - which third-party plugins define additional **rules**, **environments**, **configs**, etc. for ESLint to use.
- **Globals** - the additional global variables your script accesses during execution.
- Use **Predefined Configurations** or **Shareable Configuration Package**
- Indicates the **ECMAScript version** of the code being linted, also JavaScript mode: `module`, `commonjs`, `script`.
- Enable **JSX**.
