# Storybook

## Version

This document is for version `v8.4` (2024).


## Overview

Storybook is a tool for for developing UI components in isolation.

It provides a structured environment to build, test, and document components independently from your main application.

It helps you develop and share hard-to-reach states and edge cases without needing to run your whole app.

Use cases:
- Develop and test UI components in isolation,  ensuring they work correctly in different states and scenarios
- Generates dynamic, interactive documentation for components
- Enhances collaboration between developers and designers through interactive docs and state simulation


## Install Storybook

You can install Storybook into an existing project or create a new one from scratch.

```shell
npx storybook@latest init
```

The command above will run the Setup Wizard that:
- 📦 Install the required dependencies.
- 🛠 Setup the necessary scripts to run and build Storybook.
- 🛠 Add the default Storybook configuration.
- 📝 Add some boilerplate stories to get you started.
- 📡 Set up telemetry to help us improve Storybook.


## Start storybook

```sh
npm run storybook
```
