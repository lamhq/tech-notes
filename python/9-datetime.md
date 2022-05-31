# Date time

## Create Date object

```python
import datetime
x = datetime.datetime(2020, 5, 17)
print(x)
```


## Parse Date from string

```python
import datetime
my_date = datetime.datetime.strptime('2019-10-31', '%Y-%m-%d')
print(my_date)
```


## Format Date

```python
x = datetime.datetime(2018, 6, 1, 10, 25, 0)
print(x.strftime("%a, %d %b %Y - %I:%M %p"))
# Fri, 01 Jun 2018 - 10:25 AM
```

[Format code reference.](https://docs.python.org/3/library/datetime.html#strftime-and-strptime-format-codes)


## Getting datetime's attribute
```python
import datetime
import calendar
x = datetime.datetime(2018, 6, 1, 10, 25, 0)
x.year
x.month
x.day
calendar.day_name[x.weekday()]
x.hour
x.minute
x.second
x.microsecond
x.tzinfo
```


## Convert a Date Object into Unix Timestamp and Vice Versa
```python
from datetime import datetime
now = datetime.now()
# convert a date to unix timestamp
timestamp = datetime.timestamp(now)
print("Date and Time :", now)
print("Timestamp:", timestamp)

# create a date from unix timestamp
date2 = datetime.fromtimestamp(timestamp)
print("date from timestamp:", date2)
```


## Time Span operations

```python
from datetime import timedelta

# create a timedelta object
td = timedelta(days=64, seconds=29156, microseconds=10)
print(td)
# 64 days, 8:05:56.000010

# timedelta instance attributes
td.days
td.seconds
td.microseconds
td.total_seconds()
```

Datetime manipulation:

```python
from datetime import datetime, timedelta

# get current time
now = datetime.now()
print ("Today's date: ", str(now))

# add 15 days to current date
future_date_after_15days = now + timedelta(days = 15)
print('Date after 15 days: ', future_date_after_15days)

# subtract 2 weeks from current date
two_weeks_ago = now - timedelta(weeks = 2)
print('Date two weeks ago: ', two_weeks_ago)
print('two_weeks_ago object type: ', type(two_weeks_ago))
```

Find the difference between two dates:

```python
from datetime import datetime

# Create two dates
date1 = datetime(2017, 6, 21, 18, 25, 30)
date2 = datetime(2017, 5, 16, 8, 21, 10)

# Difference between two dates
delta = date2 - date1

print("Difference: ", delta.days)
print('delta object type: ', type(delta))
```

## Timezone

```python
from pytz import timezone
from datetime import datetime

ustz = timezone('US/Eastern')
usdt = ustz.localize(datetime(2011, 11, 2, 7, 27, 0))
print(usdt)

asiatz = timezone("Asia/Bangkok")
asiadt = usdt.astimezone(asiatz)
print(asiadt)
```