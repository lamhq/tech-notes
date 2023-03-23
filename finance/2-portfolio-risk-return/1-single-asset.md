# Risk & Return of an Asset

## Measuring Returns

### Return over a holding period

The return on an asset is calculated by accounting for **all cash flows over the holding period**, such as the ending value and any dividends received, **divided by the beginning value**. 

$$
r = \frac{\text{ending value} + \text{cashflows}}{\text{begin value}} - 1
$$

Example:

- Suppose you invest in a stock index fund. The fund currently sells for $100 per share.
- Suppose your investment horizon is one year.
- If the price per share at year’s end $110 and the cash dividends over the year are $5, what is your holding period return?

$$
r = \frac{110 + 5}{100} - 1 = 0.15
$$


### Average return over periods

The **geometric mean** is useful for measuring performance of an asset over a past sample period, such as annual returns over `t` periods.

$$
(1+r)^t = (1 + r_1) \times ... \times (1 + r_t)
$$

$$
r = \sqrt[n]{(1 + r_1)...(1 + r_t)} - 1
$$

Example:

What was your average annual return over the five-year periods? 

|        | Return (r) | Gross Return (1+r)  |
|--------|------------|---------------------|
| Year 1 | -11.89%    | 0.8811              |
| Year 2 | -22.10%    | 0.7790              |
| Year 3 | 28.69%     | 1.2869              |
| Year 4 | 10.88%     | 1.1088              |
| Year 5 | 4.91%      | 1.0491              |

Annual return over this five-year period:

$$
r = \sqrt[5]{0.8811 \times 0.7790 \times 1.2869 \times 1.1088 \times 1.0491} - 1 = 0.005438504
$$


### Expected return

If we had a probability distribution of possible outcomes, the expected return is the probability-weighted average of the possible outcomes.

| State of the Economy | Probability | Return  |
|----------------------|-------------|---------|
| Excellent            | 0.25        | 0.31    |
| Good                 | 0.45        | 0.14    |
| Poor                 | 0.25        | -0.0675 |
| Crash                | 0.05        | -0.52   |

$$
\begin{align*}
E(r) &= (0.25 \times 0.31) \\
 & + (0.45 \times 0.14) \\
 & + (0.25 \times -0.0675) \\
 & + (0.05 \times -0.52) \\
 &= 9.76\%
\end{align*}
$$

If we had a time series of return, you can compute the average return using arithmetic mean:

Suppose you have five years of past returns, you can compute the expected return for the next year using the arithmetic mean

|        | Return (r) |
|--------|------------|
| Year 1 | -11.89%    |
| Year 2 | -22.10%    |
| Year 3 | 28.69%     |
| Year 4 | 10.88%     |
| Year 5 | 4.91%      |

$$
\begin{align*}
E(r) &= \frac{1}{5} \times (-11.89 - 22.10 + 28.69 + 10.88 + 4.91) \\
 &= ???
\end{align*}
$$

### Annualize returns

*Arithmetic mean:*

$$
\text{annual return} = \text{monthly return} \times 12
$$

$$
\text{annual return} = \text{daily return} \times 252
$$

*252 is the number of trading days.*

$$
\text{annual return} = \text{weekly return} \times 52
$$

*Geometric mean:*

$$
\text{annual return} = (1+\text{monthly return})^{12} - 1
$$

## Measuring Risk

### Dispersion of returns (volatility)

We measure the dispersion by using the standard deviation of the distribution of returns.

The variance is the expected value of the squared deviation from the mean (the probability weighted average of squared deviations).

$$
\begin{align*}
var(r) &= E(r - E(r))^2 \\
  &= \displaystyle\sum_{j=1}^mP_j(r_j-E(r))^2
\end{align*}
$$

Standard deviation is the square root of variance.

$$
\sigma = \sqrt{var(r)}
$$

**Example**:

| Probability | Return |
|-------------|--------|
| 25%         | 40%    |
| 50          | 10     |
| 25          | -20    |

$$
E(r) = 0.25 \times 40 + 0.5 \times 10 + 0.25 \times -20 = 10\%
$$

$$
\begin{align*}
var(r) &= 0.25 \times (0.4-0.1)^2 \\
  & + 0.5 \times (0.1-0.1)^2 \\
  & + 0.25 \times (-0.2-0.1)^2 \\
  &= 0.045 = \sigma^2
\end{align*}
$$

$$
\sigma = 0.21%
$$


### Annualize volatility (risk)

$$
\text{annual volatility} = \text{monthly volatility} \times \sqrt{12}
$$

$$
\text{annual volatility} = \text{weekly volatility} \times \sqrt{52}
$$

### Skewness

Skewness is a measure of asymmetry.
- Normal distribution has a skewness measure of zero.
- When a distribution is skewed to the left, the extreme negative values dominate and the measure is negative.
- When a distribution is skewed to the right, the extreme positive values dominate and the measure is positive.
- When the distribution is skewed to the left, the standard deviation will underestimate risk.


### Kurtosis

Kurtosis measure the degree of fat tails.

- Normal distribution has a kurtosis of 3.
- Fat tails implies there is greater probability mass in extreme events in
the tails.
- Standard deviation will underestimate the likelihood of extreme events.


### Value at risk

Value at Risk (VaR) is used as a risk measure when volatility (standard deviation) is not an appropriate measure, particularly for investment strategies with an extreme crash risk.

VaR attempts to capture tail risk, which is the risk of an investment experiencing losses outside the range of normal expectations. 

It measures the **maximum loss** that can be incurred with a certain confidence level, such as a 95% or 99% confidence.

*For example, a 95% confidence level means that you are 95% confident that the actual loss will not exceed the VaR.*

You can estimate the VaR by sorting past returns and then finding the return that has 5% worse days, and 95% better days


### Expected shortfall

The VaR doesn’t really tell us how much you lose if you do lose.

Expected shortfall is another risk measure that captures the magnitude of extreme tail losses if the loss exceeds the VaR. 

Expected shortfall is the expected loss given that you are losing more than the VaR.
