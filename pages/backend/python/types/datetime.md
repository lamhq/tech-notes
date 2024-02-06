# Date time

## Create Date object

```py
import datetime
x = datetime.datetime(2020, 5, 17)
print(x)
```


## Parse Date from string

```py
import datetime
my_date = datetime.datetime.strptime('2019-10-31', '%Y-%m-%d')
print(my_date)
```


## Format Date

```py
x = datetime.datetime(2018, 6, 1, 10, 25, 0)
print(x.strftime("%Y-%m-%d"))
# 2013-09-08

print(x.strftime("%a, %d %b %Y - %I:%M %p"))
# Fri, 01 Jun 2018 - 10:25 AM
```

- [Python `strftime` cheatsheet](https://strftime.org/)
- [`strftime()` and `strptime()` Format Codes](https://docs.python.org/3/library/datetime.html#strftime-and-strptime-format-codes)


## Datetime's attributes

```py
import datetime

x = datetime.datetime(2018, 6, 1, 10, 25, 0)

x.year
x.month
x.day
x.hour
x.minute
x.second
x.microsecond
x.tzinfo

import calendar
calendar.day_name[x.weekday()]
```


## Unix Timestamp conversion

```py
from datetime import datetime
now = datetime.now()

# convert a date to unix timestamp
timestamp = datetime.timestamp(now)

# create a date from unix timestamp
date2 = datetime.fromtimestamp(timestamp)
```


## Timespan

A timespan is a duration of time that is used to represent the difference between two points in time. 

It is usually represented as a combination of days, hours, minutes, seconds, and fractions of a second.


### Create a timespan

```py
from datetime import timedelta

# create a timedelta object
td = timedelta(days=64, seconds=29156, microseconds=10)
print(td)   # 64 days, 8:05:56.000010

# timedelta instance attributes
td.days
td.seconds
td.microseconds
td.total_seconds()
```

### Datetime manipulation

```py
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

### Find the difference between two dates

```py
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

```py
from pytz import timezone
from datetime import datetime

ustz = timezone('US/Eastern')
usdt = ustz.localize(datetime(2011, 11, 2, 7, 27, 0))
print(usdt)

asiatz = timezone("Asia/Bangkok")
asiadt = usdt.astimezone(asiatz)
print(asiadt)
```