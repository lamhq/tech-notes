# Measure of Variability

## Variance

Variance measures the dispersion of a set of data points around their mean value.

The lower the variance, the closer the observations (data points) to the mean.

Population formula:

$$
\sigma^2 = \frac{\displaystyle\sum_{i=1}^N(x_i-\mu)^2}{N}
$$

Sample formula:

$$
S^2 = \frac{\displaystyle\sum_{i=1}^n(x_i-\overline{x})^2}{n - 1}
$$

Python:

```py
import statistics
data = [1, 2, 4, 5]
var = statistics.variance(data)

# for population use
statistics.pvariance(data)
```

## Standard Deviation

The squared root of the variance.

Standard deviation is much more meaningful than variance (as the unit of measurement is squared).

There's also population and sample standard deviation.

Population formula:

$$
\sigma = \sqrt{\sigma^2} \\
$$

Sample formula:

$$
S = \sqrt{S^2}
$$

```py
import statistics
data = [1, 2, 4, 5]

stddev = statistics.stdev(data)
print(dev)

# for population use
stddev = statistics.pstdev(data)
```

## Coefficient of Variation (CV)

Also know as relative standard deviation.

CV is the ratio of the standard deviation to the mean.

It is used for comparing variability of two or more datasets.

Population formula:

$$
C_v = \frac{\sigma}{\mu}
$$

Sample formula:

$$
\widehat{C}_v = \frac{S}{\overline{x}}
$$

In finance, it is **measuring risk** per unit of return and is very helpful when making comparisons.


## Range

The range is the difference between the maximum and minimum values in a dataset.

Advantage: easy to calculate

Disadvantage: gives no insight into nature of distribution


## Mean Absolute Deviation

The MAD is the sum of the deviations of each observation from the mean. It ignores negative signs (otherwise it would total 0)

```py
import statistics as stat
data = [-20, 23, -14, 5, -14, -4, 17.8]

mean = stat.mean(data1)
mad = sum([abs(x-mean) for x in data]) / len(data1)
```

## Target Downside Deviation

Measure of dispersions below a specific target

```py
import statistics as stat
data1 = [-20, 23, -14, 5, -14, -4, 17.8]
target = 2

tddev1 = stat.sqrt(sum([(x-target)**2 if x < target else 0 for x in data1]) / len(data1))
```

## Quantiles

The first quantile, which you may be very familiar with, is the median. This is the center of an ordered distribution. The median splits the distribution into two equal halves.

A quartile is a quarter of the distribution.

The better performing investment funds, would be in the fourth quartile. 

If quartiles split an ordered distribution into **four**, then **quintiles** split it into **five**. Splitting a distribution into **hundredths**, creates **percentiles**

The **interquartile** range is the difference between the lowest value in the second quartile and the highest value in the third quartile.
