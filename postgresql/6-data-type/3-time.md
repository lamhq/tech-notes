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

we recommend using date/time types that contain both date and time when using time zones. We do not recommend using the type `time with time zone`


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
