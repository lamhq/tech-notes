# Range Types

Range data types represent data with a beginning and an end. 

Range types replace the need to use two separate fields to represent ranges.

- The range `(-2,2]` includes four integers: -1, 0, 1, 2.
- The range `(-2,2)` includes three integers: -1, 0, 1.
- The range `[-2,2]` includes five integers: -2, -1, 0, 1, 2.

A range of integers or dates is discrete because you can enumerate each value within the range.

A range of numerics or timestamps is continuous, because an infinite number of values lies between the end points.


## Built-in Range Types

- `int4range, int8range`: A discrete range of integers.
- `numrange`: A continuous range of decimals
- `daterange`: A discrete date range of calendar dates without time zone awareness
- `tsrange, tstzrange`: A continuous date and time (timestamp) range allowing for fractional
seconds
