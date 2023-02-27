# Run Data Pipeline

```bash
meltano run <extractor> <loader>

# For example:
meltano run tap-gitlab target-postgres
```

If everything was configured correctly, you should now see your data flow from your source into your destination!

## State tracking

If you run `meltano run` at another time, it will automatically pick up where the previous run left off, assuming the extractor supports incremental replication and you have an active environment. 

Behind the scenes Meltano is tracking state using a State ID that’s auto-generated based on the extractor name, loader name, and active environment name.

To override the state and extract all data from the beginning again you can use the `--full-refresh` argument.

## Using existing state file

If you've used this Singer tap before without Meltano, you may already have a state file.

If you'd like Meltano to use it instead of looking up state based on the State ID, you can either use [`meltano state`](https://docs.meltano.com/reference/command-line-interface#state) to view and edit the state directly or set the [state extractor extra](https://docs.meltano.com/concepts/plugins#state-extra).


## View the state

```bash
meltano state get dev:tap-gitlab-to-target-postgres
```