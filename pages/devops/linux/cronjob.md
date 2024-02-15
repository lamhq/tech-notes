# Cron job

## Generate cron expression

Use [crontab guru](https://crontab.guru/).


## Set cron job schedule (macOs)

```sh
crontab -e
```

Enter command to run:

```
0 9 * * * /path/to/executable
```

## View available cron jobs

```sh
crontab -l
```