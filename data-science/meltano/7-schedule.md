# Schedule

## Add Schedule

```bash
meltano schedule add <pipeline name> --extractor <extractor> --loader <loader> --interval <interval>

# For example:
meltano schedule add gitlab-to-postgres --extractor tap-gitlab --loader target-postgres --interval @daily
```

This will add the new schedule to your `meltano.yml` project file:

```yml
schedules:
  - name: gitlab-to-postgres
    extractor: tap-gitlab
    loader: target-postgres
    transform: skip
    interval: "@daily"
```

The `name` setting in schedules acts as the state_id so that state is preserved across scheduled executions. 


## Verify installed schedule

```bash
meltano schedule list
```

## Setup Orchestrator

### Add orchestrator

Add the Apache Airflow orchestrator for managing the schedule:

```bash
meltano add orchestrator airflow
```

This will add the new plugin to your meltano.yml project file:

```yml
plugins:
  orchestrators:
    - name: airflow
      pip_url: apache-airflow==1.10.14
```

It will also automatically add a meltano run DAG generator to your project’s `orchestrate/dags` directory

### Start the Airflow scheduler

```bash
meltano invoke airflow scheduler

# Add `-D` to run the scheduler in the background:
meltano invoke airflow scheduler -D
```

### Verify that a DAG was created

```bash
meltano invoke airflow webserver

# Add `-D` to run the scheduler in the background:
meltano invoke airflow webserver -D
```

### Create an Admin user called melty for logging in

```bash
meltano invoke airflow users create --username melty \
--firstname melty \
--lastname meltano \
--role Admin \
```

The web interface and DAG overview will be available at http://localhost:8080.