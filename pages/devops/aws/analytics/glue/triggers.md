# Triggers

## Overview

In AWS Glue, you can create triggers, which you can use to either manually or automatically start crawlers or ETL jobs.

A trigger fires on demand, based on a schedule, or based on a combination of events.

A trigger can pass parameters to the jobs that it starts. 

Trigger states: `CREATED`, `ACTIVATED`, `DEACTIVATED`.

To temporarily stop a trigger from firing, you can deactivate it.

If you want to crawl multiple data stores, use multiple sources for each crawler instead of running multiple crawlers simultaneously.

## Types

There are three types of triggers:

### Scheduled
A time-based trigger based on cron.

View details of [Cron expressions](https://docs.aws.amazon.com/glue/latest/dg/monitor-data-warehouse-schedule.html#CronExpressions).

### On-demand
A trigger that fires when you activate it.

### Conditional
A trigger that fires when a previous jobs or crawlers satisfy a list of conditions.

- You specify a list of jobs and a list of crawlers to watch.
- You specify a status to watch for (succeeded, failed, timed out)
- The trigger fires if the watched jobs or crawlers end with the specified statuses.

*For example, you could configure a trigger T1 to start job J3 when both job J1 and job J2 successfully complete, and another trigger T2 to start job J4 if either job J1 or job J2 fails.*

Job and crawler completion states (events) that triggers watch for.
- Job completion states: `SUCCEEDED`, `STOPPED`, `FAILED`, `TIMEOUT`
- Crawler completion states: `SUCCEEDED`, `FAILED`, `CANCELLED`