# Getting started

## Version

This document is for Meltano version `2.15.3`

## What is Meltano?

Meltano is an open-source data integration platform that helps businesses and organizations manage their data pipelines. It is designed to simplify the process of extracting data from various sources, transforming it into the desired format, and loading it into a data warehouse or other destination.

Meltano provides a suite of tools for building, running, and managing data pipelines, including:

- A command-line interface (CLI) for managing projects and pipelines
- A user interface for designing and monitoring pipelines
- A library of pre-built connectors for popular data sources like PostgreSQL, MySQL, and Salesforce
- A data modeling and transformation layer based on SQL and Python
- Integration with popular data warehousing solutions like Snowflake, BigQuery, and Redshift

Meltano is built using open-source technologies, including Singer for **data extraction**, dbt for **data transformation**, and Airflow for **pipeline orchestration**. It is designed to be flexible and extensible, allowing users to customize and extend the platform to meet their specific needs.

Meltano was created by the company GitLab, but it is now a standalone project with a growing community of contributors and users. It is licensed under the Apache 2.0 license, which allows anyone to use, modify, and distribute the software freely.

(source: ChatGPT)


## Core Workflow

The core workflow depends on your data stack, but it will usually involve:

1. **Extracting data** from data sources & loading them into targets.
1. **Transforming data** inside a database.
1. **Orchestrating** the extract/load/transform process.
1. Adding **additional steps** to the process like testing the data inside transformations with dbt tests, using Great Expectations, running analyses inside Jupyter notebooks, visualizing data with Superset etc.


## Installation

```bash
pip install "meltano"
```

Installs dependencies of your project based on the `meltano.yml` file:

```bash
meltano install
```

Verify installation:

```bash
meltano --version
```
