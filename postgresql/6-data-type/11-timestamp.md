# Timestamp Data Types

PostgreSQL provides you with two temporal data types for handling timestamp:

- `timestamp`: a timestamp without timezone one.
- `timestamptz`: timestamp with a timezone.

Both `timestamp` and `timestamptz` uses 8 bytes for storing the timestamp values


## `timestamp`

The `timestamp` datatype allows you to store both date and time. However, it does not have any time zone data.

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

## `timestamptz`

The `timestamptz` datatype is the timestamp with the time zone.

PostgreSQL stores the `timestamptz` in UTC value. PostgreSQL does not store any timezone data with the `timestamptz` value.

- When you insert a value into a `timestamptz` column, PostgreSQL converts the `timestamptz` value into a UTC value and stores the UTC value in the table.
- When you query `timestamptz` from the database, PostgreSQL converts the UTC value back to the time value of the timezone set by the database server, the user, or the current database connection.

## Examples

### Create a table with timestamp data

```sql
CREATE TABLE timestamp_demo (
    ts TIMESTAMP, 
    tstz TIMESTAMPTZ
);
```

### Insert data to table

```sql
INSERT INTO timestamp_demo (ts, tstz)
VALUES('2016-06-22 19:10:25-07','2016-06-22 19:10:25-07');
```

### Get the current time zone

```sql
SHOW TIMEZONE;
```

### Change the timezone of the current session

```sql
SET timezone = 'America/Los_Angeles';
```

### Getting the current time

```sql
SELECT NOW();
```

### Get the time of day in the string format

```sql
SELECT TIMEOFDAY();
```

### Convert between timezones

```sql
SELECT timezone('America/New_York','2016-06-01 00:00'::timestamptz);
```

### Add/subtract an interval to a timestamp

```sql
SELECT '2012-02-10 11:00 PM'::timestamp + interval '1 hour';

SELECT '2012-02-10 11:00 PM'::timestamptz - interval '1 hour';
```

### Add intervals

```sql
SELECT '23 hours 20 minutes'::interval + '1 hour'::interval;
```

### Check temporal ranges overlap

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

### Generate time series

```sql
SELECT (dt - interval '1 day')::date As eom
FROM generate_series('2/1/2012', '6/30/2012', interval '1 month') As dt;
```

### Extracting elements of a datetime value

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

### Inputting time in one time zone and output in another

```sql
SELECT '2012-02-28 10:00 PM America/Los_Angeles'::timestamptz;
```

### Display timestamp in a specific timezone

```sql
SELECT '2012-02-28 10:00 PM America/Los_Angeles'::timestamptz AT TIME ZONE 'Europe/Paris';
```
