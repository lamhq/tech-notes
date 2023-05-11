# Parse

```js
// From current date and time
var now = moment();

// From string
// see string format here: https://momentjs.com/docs/#year-month-and-day-tokens
var day = moment("1995-12-25");
moment("12-25-1995", "MM-DD-YYYY");

// From javascript Date object
var day = new Date(2011, 9, 16);
var dayWrapper = moment(day);
```

# Get + Set

```js
// set/get miliseconds. 0 to 999
moment().millisecond(Number);
moment().millisecond();

// seconds. 0 to 59
moment().second(Number);
moment().second();

// minutes. 0 to 59
moment().minute(Number);
moment().minute();

// hours. 0 to 23
moment().hour(Number);
moment().hour();

// date of month. 1 to 31
moment().date(Number);
moment().date();

// day of week. Sunday as 0 and Saturday as 6
moment().day(Number|String);
moment().day();

// Day of Year. 1 to 366
moment().dayOfYear(Number);
moment().dayOfYear();

// Month. 1 to 366
moment().month(Number|String);
moment().month();

// Year
moment().year(Number);
moment().year();
```

# Manipulate

```js
moment().add(7, 'days');
moment().subtract(7, 'days');
// years	  y
// quarters	Q
// months	  M
// weeks	  w
// days	    d
// hours	  h
// minutes	m
// seconds	s
// milliseconds	ms

moment().startOf('year');    // set to January 1st, 12:00 am this year
moment().startOf('month');   // set to the first of this month, 12:00 am
moment().startOf('quarter');  // set to the beginning of the current quarter, 1st day of months, 12:00 am
moment().startOf('week');    // set to the first day of this week, 12:00 am
moment().startOf('isoWeek'); // set to the first day of this week according to ISO 8601, 12:00 am
moment().startOf('day');     // set to 12:00 am today
moment().startOf('date');     // set to 12:00 am today
moment().startOf('hour');    // set to now, but with 0 mins, 0 secs, and 0 ms
moment().startOf('minute');  // set to now, but with 0 seconds and 0 milliseconds
moment().startOf('second');  // same as moment().milliseconds(0);
moment().endOf("year");      // set the moment to 12-31 23:59:59.999 this year
```

# Format

```js
// see: https://momentjs.com/docs/#/displaying/
moment().format();                                // "2014-09-08T08:02:17-05:00" (ISO 8601, no fractional seconds)
moment().format("dddd, MMMM Do YYYY, h:mm:ss a"); // Sunday, February 14th 2010, 3:25:50 pm
moment().format("ddd, D/M/YYYY h:mm:ss a");       // Wed, 11/12/2019 7:06:24 am

// difference
var a = moment([2007, 0, 29]);
var b = moment([2007, 0, 28]);
a.diff(b, 'days') // 1

// as Javascript Date
moment().toDate();
```