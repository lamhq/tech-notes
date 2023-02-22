# Tutorial

Throughout this tutorial, we’ll walk you through the creation of a end-to-end modern ELT stack

Reference: https://docs.meltano.com/getting-started/part1


## Extract Data

We’re going to take data from a “source”, namely GitHub, and extract a list of commits to one repository.

Then, we will dump the data into JSON files to test.

### Create Your Meltano Project

```bash
meltano init my-meltano-project
cd my-meltano-project
```
 
### Add an Extractor to Pull Data from a Source

An extractor is responsible for pulling data out of any data source.

```bash
meltano add extractor tap-github --variant=meltanolabs
```

### Test the extractor

```bash
meltano invoke tap-github --help
```

### Configure the Extractor

```bash
meltano config tap-github set --interactive
```

View Extractor's config:

```bash
meltano config tap-github
```

### Select Entities and Attributes to Extract

List available entities & attributes:

```bash
meltano select tap-github --list --all
```

Select the entities and attributes for extraction:

```bash
meltano select tap-github commits url
meltano select tap-github commits sha
meltano select tap-github commits commit_timestamp
meltano select tap-github commits "*"
```

### Add a dummy loader to dump the data into JSON

```bash
meltano add loader target-jsonl
```

### Run the extraction process

```bash
meltano run tap-github target-jsonl
```

You can verify that it worked by looking inside the newly created file called `output/commits.jsonl`.


## Loading Data

### Add the postgres loader

```bash
meltano add loader target-postgres --variant=meltanolabs
```

### Test the loader

```bash
meltano invoke target-postgres --help
```

### Configure the loader

```bash
meltano config target-postgres list

meltano config target-postgres set user grvadmin
meltano config target-postgres set password 123
meltano config target-postgres set database meldemo
meltano config target-postgres set host localhost
meltano config target-postgres set add_metadata_columns True
```

### Check loader's configuration

```bash
meltano config target-postgres
```

### Run your data integration (EL) pipeline

The EL pipeline run will add data into the schema `tap_github` as table `commits`

```bash
meltano run tap-github target-postgres
```


## Transformations, ELT

### Install dbt transformer

```bash
meltano add transformer dbt-postgres
```

### Configure dbt

```bash
meltano config dbt-postgres set host localhost
meltano config dbt-postgres set port 5432
meltano config dbt-postgres set user grvadmin
meltano config dbt-postgres set password 123
meltano config dbt-postgres set dbname meldemo
meltano config dbt-postgres set schema public
```

### Add our source data to dbt

The transformer will transform the source data in the configured database in config

```bash
mkdir transform/models/tap_github
```

Add a file called `source.yml` into this directory with the following content:

```yml
config-version: 2
version: 2
sources:
  - name: tap_github     # the name we want to reference this source by
    schema: tap_github   # the schema the raw data was loaded into
    tables:
      - name: commits
```

### Add a transformed model

Refer to this [guide](https://docs.meltano.com/getting-started/part3#add-a-transformed-model).

### Run the transformation process

```bash
meltano invoke dbt-postgres:run
```

### Run the complete pipeline

```bash
meltano run --full-refresh tap-github target-postgres dbt-postgres:run
```