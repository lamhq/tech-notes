# Environments

As part of creating your Meltano project, we automatically added your first environments called `dev`, `staging` and `prod`.

This allows you to define configurations specific to the environment in which you’re running your project.

There’s also a `default_environment` setting in the `meltano.yml` that get automatically set to `dev`.

## List your available environments

```bash
meltano environment list
```

## Activate your environment for your shell session

```bash
export MELTANO_ENVIRONMENT=dev
```

## Add a new environment

```bash
meltano environment add <environment name>
```
