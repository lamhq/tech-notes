# Measures of Central Tendency

## Mean

The arithmetic mean is the sum of values of the observations divided by the number of observations.

It is denoted by $\mu$ for a population and $\overline{x}$ for a sample

Properties:

- There is only one mean
- May not be one of the observed values
- Highly influenced by outliers

Formular:

$$
\mu = \frac{\displaystyle\sum_{i=1}^Nx_i}{N}
$$

```py
import numpy as np
data = [1, 2, 4, 5]
x = np.mean(data)
print(x)
```


## Median

The median is the value of the middle item of a set of ordered data.

Formula:

- Odd numbered sample size: the $\frac{n+1}{2}$ item
- Even numbered sample size: the mean of the $\frac{n}{2}$ item and the $\frac{n+2}{2}$ item

Properties:

- There is only one median
- May not be one of the observed values
- Not influenced by outliers

```py
import numpy as np
data = [1, 2, 4, 5]
x = np.median(data)
print(x)
```


## Mode

The most frequently occurring value

Properties:

- there may be more than one mode or no mode
- It can be used with nominal data (eg. it could indicate which investment style is most popular)
- Not influenced by outliers

```py
import statistics as stat
data = [1, 2, 4, 5]
x = stat.mode(data)
print(x)
```


## Weighted mean

The weighted (weighted average) mean applies approriate weights to each of the observation.

Formula:

$$
\overline{X}_w = \displaystyle\sum_{i=1}^nw_iX_i
$$

Python:

```py
from numpy import average
distribution = (1.2,6.7,3.4)
weight = (0.25,0.45,0.3)
weighted_avg_m3 = round(
  average(distribution, weights=weight),
  2
)
print(weighted_avg_m3)
```

## Geometric Mean

The geometric mean is most frequently used to average rates of change over time or the growth rate of a variable. 

*Ex. compound growth rates.*

Formula:

$$
\overline{X}_G = \sqrt[n]{X_1X_2X_3...X_n} \qquad X_i \ge 0
$$

For negative return:
$$
1 + R_G = \sqrt[T]{(1 + R_1)(1 + R_2)...(1 + R_T)}
$$

Python:

```py
import statistics
data=[22.29,15.54,9.38,15.12,10.72,14.57,7.2,7.97,10.34,8.35]
x=statistics.geometric_mean(data)
print(x-1)
```

## Harmonic Mean

The hamornic mean, similar to the weighted mean, is most frequently used to calculate the average cost of, for example, stock based on the same investment amount.

The harmonic mean is appropriate for determining the average price per unit.

Formula:

$$
\overline{X}_H = \frac{n}{\displaystyle\sum_{i=1}^n(1/X_i)} \qquad X_i \ge 0
$$

Python:

```py
import statistics
data=[22.29,15.54,9.38,15.12,10.72,14.57,7.2,7.97,10.34,8.35]
x=statistics.harmonic_mean(data)
print(x-1)
```

Reference:

- https://vietnambiz.vn/so-binh-quan-dieu-hoa-harmonic-mean-la-gi-dac-diem-20200411120834635.htm
- https://tintuctuyensinh.vn/harmonic-mean-la-gi-xem-xong-5-phut-hieu-luon/


## In finance

When calculating a **mean return over multiple periods**, a more approriate measure of average return is the **geometric mean**, which take into account the compounding nature of returns.

The appropriate calculation for **average price paid over a period of time** would be the **harmonic mean**. Taking a simple average of prices does not take into account the number of shares purchased each year as the price changed but the investment amount stayed constant. 
