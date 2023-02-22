# Extractor

The first  An extractor is a plugin which will be responsible for pulling data out of your data source.

## Find out if an extractor for your data source is supported

```bash
meltano discover extractors
```

## Add extractor

```bash
meltano add extractor <plugin name>
```

```bash
meltano add extractor tap-gitlab
```

This will add the new plugin to your `meltano.yml` project file:

```yml
plugins:
  extractors:
  - name: tap-gitlab
    variant: meltanolabs
    pip_url: git+https://github.com/MeltanoLabs/tap-gitlab.git
```

if you’re using Meltano version >=2.0 you will see a `plugins/extractors/tap-gitlab--meltanolabs.lock` file added to your project. This pins your settings definitions for stability, they **should be checked into your git repository**.

For additional stability you can consider pinning your `pip_url` to:
- a specific release version (e.g. tap-gitlab==1.0.0) or
- commit hash (e.g. `git+https://github.com/MeltanoLabs/tap-gitlab.git@v1.0.0`).


## Verify that the extractor was installed successfully

```bash
meltano invoke <plugin> --help
```


## Find out if a Singer tap for your data source exists

If an extractor is not yet discoverable, you can find out if a Singer tap for your data source already exists by checking out [MeltanoHub for Singer](https://hub.meltano.com/singer/)

If a Singer tap for your data source is available, add it to your project as a custom plugin using: 

```bash
meltano add --custom extractor <tap name>
```

```bash
meltano add --custom extractor tap-covid-19
```

This will add the new plugin to your `meltano.yml` project file:

```yml
plugins:
  extractors:
    - name: tap-covid-19
      namespace: tap_covid_19
      pip_url: tap-covid-19
      executable: tap-covid-19
      capabilities:
        - catalog
        - discover
        - state
      settings:
        - name: api_token
        - name: user_agent
        - name: start_date
```

If a Singer tap for your data source doesn’t exist yet, learn how to build and use your own tap by following the “[Create and Use a Custom Extractor](https://docs.meltano.com/tutorials/custom-extractor)” tutorial.


## Choose How to Replicate Each Entity

If the data source you’ll be pulling data from is a database, such as **PostgreSQL** or **MongoDB**, your extractor will likely require one final setup step: setting a **replication method** for each selected entity (table).

### Replication methods

- `LOG_BASED`: Log-based Incremental Replication. The extractor uses the database’s binary log files to identify what records were inserted, updated, and deleted from the table since the last run (if any), and extracts only these records.
- `INCREMENTAL`: Key-based Incremental Replication. The extractor uses the value of a specific column on the table (the Replication Key, such as an updated_at timestamp or incrementing id integer) to identify what records were inserted or updated (but not deleted) since the last run (if any), and extracts only those records.
- `FULL_TABLE`: Full Table Replication. The extractor extracts all available records in the table on every run.

Find out which replication methods the extractor supports by checking its documentation or the README in its repository.

### Set `replication-method`

Set the desired replication-method metadata for each selected entity:

```bash
meltano config <plugin> set _metadata <entity> replication-method <LOG_BASED|INCREMENTAL|FULL_TABLE>

# For example:
meltano config tap-postgres set _metadata some_entity_id replication-method INCREMENTAL
meltano config tap-postgres set _metadata other_entity replication-method FULL_TABLE

# Set replication-method metadata for all entities
meltano config tap-postgres set _metadata '*' replication-method INCREMENTAL

# Set replication-method metadata for matching entities
meltano config tap-postgres set _metadata '*_full' replication-method FULL_TABLE
```

If you’ve set a table’s `replication-method` to `INCREMENTAL`, also choose a Replication Key by setting the `replication-key` metadata:

```bash
meltano config <plugin> set _metadata <entity> replication-key <column>

# For example:
meltano config tap-postgres set _metadata some_entity_id replication-key updated_at
meltano config tap-postgres set _metadata some_entity_id replication-key id
```


### Verify that the stream metadata for each table was set correctly

Verify that the stream metadata for each table was set correctly in the extractor’s generated catalog file:

```bash
meltano invoke --dump=catalog <plugin>

# For example:
meltano invoke --dump=catalog tap-postgres
```
