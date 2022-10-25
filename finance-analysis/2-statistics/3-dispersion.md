# Measure of Dispersion

## Quantiles

The first quantile, which you may be very familiar with, is the median. This is the center of an ordered distribution. The median splits the distribution into two equal halves.

A quartile is a quarter of the distribution.

The better performing investment funds, would be in the fourth quartile. 

If quartiles split an ordered distribution into **four**, then **quintiles** split it into **five**. Splitting a distribution into **hundredths**, creates **percentiles**

The **interquartile** range is the difference between the lowest value in the second quartile and the highest value in the third quartile.


## Dispersion

Dispersion is the variability around the central tendency and includes:
- the range
- the mean absolute deviation (MAD)
- variance
- standard deviation
- the target downside deviation
- the coefficient of variation


### Range

The range is the difference between the maximum and minimum values in a dataset.

Advantage: easy to calculate

Disadvantage: gives no insight into nature of distribution


### Mean Absolute Deviation

The MAD is the sum of the deviations of each observation from the mean. It ignores negative signs (otherwise it would total 0)

```py
import statistics as stat
data1 = [-20, 23, -14, 5, -14, -4, 17.8]

mean = stat.mean(data1)
mad = sum([abs(x-mean) for x in data]) / len(data1)
```

### Variance

The average of the squared deviations around the mean

```py
import statistics
data = [1, 2, 4, 5]
var = statistics.variance(data)
```


### Standard Deviation

The squared root of the variance

```py
import statistics
data = [1, 2, 4, 5]

var = statistics.variance(data)
print(var)

dev = statistics.stdev(data)
print(dev)

# for population use
# statistics.pvariance and statistics.pstdev
```

### Target Downside Deviation

Measure of dispersions below a specific target

```py
import statistics as stat
data1 = [-20, 23, -14, 5, -14, -4, 17.8]
target = 2

tddev1 = stat.sqrt(sum([(x-target)**2 if x < target else 0 for x in data1]) / len(data1))
```

### Coefficient of Variation

CV is the ratio of the standard deviation to the mean

it is **measuring risk** per unit of return and is very helpful when making comparisons.

Notes:

- if the observations are returns and the mean return is negative, then CV is meaning less
- the CV is helpful for comparison across different datasets