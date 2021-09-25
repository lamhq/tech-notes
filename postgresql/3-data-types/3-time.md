# Temporals

## PostgreSQL temporal types

In addition to the usual dates and times types, PostgreSQL supports time zones, enabling the automatic handling of daylight saving time (DST) conversions by region.

### `date`

- Stores the month, day, and year
- no time zone awareness and 
- no concept of hours, minutes, or seconds.


### `time` (time without time zone)

- stores hours, minutes, and seconds with 
- no awareness of time zone or calendar dates


### `timestamp` (timestamp without time zone)

- Stores both calendar dates and time (hours, minutes, seconds)
- does not care about the time zone.


### `timestamptz` (timestamp with time zone)

- A time zone−aware date and time data type
- Internally stored in Coordinated Universal Time (UTC)
- display defaults to the time zone of the server, the service config, the database, the user, or the session


### `timetz` (time with time zone)

- It is time zone−aware but does not store the date
- It always assumes DST of the current date and time.


### `interval`

- A duration of time in hours, days, months, minutes, and others.
- It comes in handy for datetime arithmetic


### `tsrange`

- Allows you to define opened and closed ranges of `timestamp` with no timezone.
- Example: `'[2012-01-01 14:00, 2012-01-01 15:00)'::tsrange`


### `tstzrange`

- Allows you to define opened and closed ranges of `timestamp` with timezone.


### `daterange`

- Allows you to define opened and closed ranges of dates.


## Time Zones

PostgreSQL doesn’t store the time zone, but uses it only to convert the datetime to UTC before storage. 

**Inputting time in one time zone and output in another:**

```sql
SELECT '2012-02-28 10:00 PM America/Los_Angeles'::timestamptz;
```

**Display timestamp in a specific timezone:**

```sql
SELECT '2012-02-28 10:00 PM America/Los_Angeles'::timestamptz AT TIME ZONE 'Europe/Paris';
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
