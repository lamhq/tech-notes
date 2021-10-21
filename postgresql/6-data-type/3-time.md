# Date/Time Types

## Date/Time Types

```
date
time [ (p) ] [ without time zone ]
time [ (p) ] with time zone
timestamp [ (p) ] [ without time zone ]	
timestamp [ (p) ] with time zone
interval [ fields ] [ (p) ]
```

`time`, `timestamp`, and `interval` accept an optional precision value `p` which specifies the number of fractional digits retained in the seconds field. The allowed range of `p` is from 0 to 6.

## Date/Time Input

### Dates

Possible inputs for the `date` type:

```
1999-01-08
January 8, 1999
```

### Times

```
04:05:06.789
04:05:06
04:05
04:05 AM
04:05 PM
04:05:06.789-8
04:05:06-08:00
```

### Time Zone

```
-8:00:00
-8:00
PST
America/New_York	
```

### Time Stamps

For timestamp with time zone, the internally stored value is always in UTC

To ensure that a literal is treated as timestamp with time zone, give it the correct explicit type:

```
TIMESTAMP '2004-10-19 10:23:54'
TIMESTAMP WITH TIME ZONE '2004-10-19 10:23:54+02'
```

An input value that has an explicit time zone specified is converted to UTC using the appropriate offset for that time zone. If no time zone is stated in the input string, then it is assumed to be in the time zone indicated by the system's TimeZone parameter, and is converted to UTC using the offset for the `timezone` zone.

### Special Values

```
epoch (1970-01-01 00:00:00+00, Unix system time zero)
infinity	
-infinity
now
today
tomorrow
yesterday
```

## Time Zones

PostgreSQL doesn’t store the time zone, but uses it only to convert the datetime to UTC before storage. 

we recommend using date/time types that contain both date and time when using time zones. We do not recommend using the type `time with time zone`

PostgreSQL allows you to specify time zones in three different forms:

- A full time zone name `America/New_York`
- A time zone abbreviation `PST`
- POSIX-style time zone specifications

The TimeZone configuration parameter can be set in the file `postgresql.conf`. There are also some special ways to set it:

- The SQL command `SET TIME ZONE` sets the time zone for the session.
- The `PGTZ` environment variable is used by libpq clients to send a `SET TIME ZONE` command to the server upon connection.

**Inputting time in one time zone and output in another:**

```sql
SELECT '2012-02-28 10:00 PM America/Los_Angeles'::timestamptz;
```

**Display timestamp in a specific timezone:**

```sql
SELECT '2012-02-28 10:00 PM America/Los_Angeles'::timestamptz AT TIME ZONE 'Europe/Paris';
```


## Interval Input

```
1-2   # 1 year 2 months
3 4:05:06   # 3 days 4 hours 5 minutes 6 seconds
1 year 2 months 3 days 4 hours 5 minutes 6 seconds
```

```sql
SELECT EXTRACT(hours from '80 minutes'::interval);
```


## Datetime Operators and Functions

**Add/subtract an interval to a timestamp:**

```sql
SELECT '2012-02-10 11:00 PM'::timestamp + interval '1 hour';

SELECT '2012-02-10 11:00 PM'::timestamptz - interval '1 hour';
```

**Add intervals:**

```sql
SELECT '23 hours 20 minutes'::interval + '1 hour'::interval;
```

**Check temporal ranges overlap:**

```sql
SELECT
  ('2012-10-25 10:00 AM'::timestamp, 
  '2012-10-25 2:00PM'::timestamp)
    OVERLAPS
  ('2012-10-25 11:00 AM'::timestamp,
  '2012-10-26 2:00PM'::timestamp) AS x,

  ('2012-10-25'::date,'2012-10-26'::date)
    OVERLAPS
  ('2012-10-26'::date,'2012-10-27'::date) As y;
```

**Generate time series:**

```sql
SELECT (dt - interval '1 day')::date As eom
FROM generate_series('2/1/2012', '6/30/2012', interval '1 month') As dt;
```

**Extracting elements of a datetime value:**

```sql
SELECT 
  dt, 
  date_part('hour',dt) As hr, 
  to_char(dt,'HH12:MI AM') As mn
FROM generate_series(
  '2012-03-11 12:30 AM',
  '2012-03-11 3:00 AM',
  interval '15 minutes'
) As dt;
```