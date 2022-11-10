# TIME Data Type

## TIME data type

`TIME` data type allows you to store the time of day values.

A time value may have a precision up to 6 digits. The precision specifies the number of fractional digits placed in the second field.

The `TIME` data type requires 8 bytes and its allowed range is from `00:00:00` to `24:00:00`

Common formats of the `TIME` values:

```
HH:MI   
HH:MI:SS
HHMISS
MI:SS.pppppp    
HH:MI:SS.pppppp
HHMISS.pppppp
```

For example:

```
01:02
01:02:03
010203
04:59.999999
04:05:06.777777
040506.777777
```

### Declare a column with the `TIME` data type:

```sql
column_name TIME(precision);
```

### Declare a column with the `TIME` data type:

```sql
CREATE TABLE shifts (
    id serial PRIMARY KEY,
    shift_name VARCHAR NOT NULL,
    start_at TIME NOT NULL,
    end_at TIME NOT NULL
);  
```

### Insert time data into the table:

```sql
INSERT INTO shifts(shift_name, start_at, end_at)
VALUES('Morning', '08:00:00', '12:00:00'),
      ('Afternoon', '13:00:00', '17:00:00'),
      ('Night', '18:00:00', '22:00:00');
```

## TIME with time zone type

### Declare a column whose data type is TIME with time zone

```sql
column TIME with time zone
```

Example of `TIME with time zone` values:

```sql
04:05:06 PST    
04:05:06.789-8   
```

## Handling TIME values

### Getting the current time

```sql
SELECT CURRENT_TIME;
SELECT CURRENT_TIME(5);
```

### Get the local time

```sql
SELECT LOCALTIME;
SELECT LOCALTIME(0);
```

### Converting time to a different time zone

```sql
SELECT LOCALTIME AT TIME ZONE 'UTC-7';
```

### Extracting hours, minutes, seconds from a time value

```sql
SELECT
    LOCALTIME,
    EXTRACT (HOUR FROM LOCALTIME) as hour,
    EXTRACT (MINUTE FROM LOCALTIME) as minute, 
    EXTRACT (SECOND FROM LOCALTIME) as second,
    EXTRACT (milliseconds FROM LOCALTIME) as milliseconds; 
```

### Get an interval between two time values

```sql
SELECT time '10:00' - time '02:00' AS result;
```

### Add interval to time

```sql
SELECT LOCALTIME + interval '2 hours' AS result;
```
