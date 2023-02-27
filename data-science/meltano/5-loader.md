# Loader

## Find loader

```bash
meltano discover loaders
```

## Find Singer

If a loader is not yet discoverable, find out if a Singer target for your data source already exists [here](https://www.singer.io/#targets)


## Add loader to your project

```bash
meltano add loader <plugin name>

# For this example, we'll use the default variant:
meltano add loader target-postgres

# Or if you just want to use a non-default variant you can use this,
# selected using `--variant`:
meltano add loader target-postgres --variant=datamill-co
```

This will add the new plugin to your `meltano.yml` project file:

```yml
plugins:
loaders:
  - name: target-postgres
    variant: transferwise
    pip_url: pipelinewise-target-postgres
```

## Add Singer

```bash
meltano add --custom loader <target name>

# For example:
meltano add --custom loader target-bigquery
```

This will add the new plugin to your `meltano.yml` project file:

```yml
plugins:
  loaders:
    - name: target-bigquery
      namespace: target_bigquery
      pip_url: target-bigquery
      executable: target-bigquery
      settings:
        - name: project_id
        - name: dataset_id
        - name: table_id
```

## Verify Loader

verify that the loader was installed successfully:

```bash
meltano invoke <plugin> --help

# For example:
meltano invoke target-postgres --help
```


## List Loader's supported settings

```bash
meltano config <plugin> list

# For example:
meltano config target-postgres list
```


## Configure Loader

```bash
meltano config <plugin> set <setting> <value>

# For example:
meltano config target-postgres set user meltano
meltano config target-postgres set password meltano
meltano config target-postgres set dbname warehouse
meltano config target-postgres set default_target_schema public
```

This will add the non-sensitive configuration to your `meltano.yml` project file:

```yml
plugins:
  loaders:
    - name: target-postgres
      variant: transferwise
      pip_url: pipelinewise-target-postgres
      config:
        user: meltano
        dbname: warehouse
        default_target_schema: public
```

## View Loader's configuration

```bash
meltano config <plugin>

# For example:
meltano config target-postgres
```