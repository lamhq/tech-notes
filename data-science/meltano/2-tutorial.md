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

View Extractor's config

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
