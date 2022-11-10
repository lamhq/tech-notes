# Interval Data Type

The interval data type allows you to store and manipulate a period of time in years, months, days, hours, minutes, seconds.

The following  examples show some interval values:

```
interval '2 months ago';
interval '3 hours 20 minutes';
```

```sql
SELECT
	now(),
	now() - INTERVAL '1 year 3 hours 20 minutes' 
    AS "3 hours 20 minutes ago of last year";
```

## PostgreSQL interval input format

```
quantity unit [quantity unit...] [direction]
```

- `quantity` is a number, sign `+` or `-` is also accepted
- `unit` can be any of millennium, century, decade, year, month, week, day, hour, minute, second, millisecond, microsecond, or abbreviation (y, m, d, etc.,) or plural forms (months, days, etc.).
- `direction` can be `ago` or empty string `''`

```sql
INTERVAL '1 year 2 months 3 days';
INTERVAL '2 weeks ago';
```

## PostgreSQL interval output format

The output style of interval values is set by using the `SET intervalstyle` command

```sql
SET intervalstyle = 'sql_standard';
SELECT
	INTERVAL '6 years 5 months 4 days 3 hours 2 minutes 1 second';


SET intervalstyle = 'postgres';
SELECT
	INTERVAL '6 years 5 months 4 days 3 hours 2 minutes 1 second';


SET intervalstyle = 'postgres_verbose';
SELECT
	INTERVAL '6 years 5 months 4 days 3 hours 2 minutes 1 second';


SET intervalstyle = 'iso_8601';
SELECT
	INTERVAL '6 years 5 months 4 days 3 hours 2 minutes 1 second';
```

## Interval operators

```sql
SELECT
INTERVAL '2h 50m' + INTERVAL '10m'; -- 03:00:00

SELECT
INTERVAL '2h 50m' - INTERVAL '50m'; -- 02:00:00

SELECT
600 * INTERVAL '1 minute'; -- 10:00:00
```

## Usecases

### Converting PostgreSQL interval to string

```sql
SELECT TO_CHAR(
  INTERVAL '17h 20m 05s',
  'HH24:MI:SS'
);
```

### Extracting data from a PostgreSQL interval

```sql
SELECT EXTRACT (MINUTE FROM INTERVAL '5 hours 21 minutes');
```

### Adjusting interval values

PostgreSQL provides two functions `justifydays` and `justifyhours` that allows you to adjust the **interval of 30-day as one month** and **the interval of 24-hour as one day**:

```sql
SELECT
  justify_days(INTERVAL '30 days'),
  justify_hours(INTERVAL '24 hours');
```
