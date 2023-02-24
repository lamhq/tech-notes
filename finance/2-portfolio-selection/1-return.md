# Calculate Rate of Return of a Financial Asset

## Return over a holding periods

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


## Annual return

The geometric mean is useful for measuring performance of an asset over a past sample period, such as annual returns over `t` periods.

$$
(1+r)^t = (1 + r_1) \times ... \times (1 + r_t)
$$

$$
r = \sqrt[n]{(1 + r_1)...(1 + r_t)} - 1
$$

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


## Expected return

Given the distribution of returns, we use the central tendency, or the average, as the measure of the expected return.

If we had a probability distribution of possible outcomes, the expected return is the probability-weighted average of the possible outcomes.

|            | Probability | Return   |
|------------|-------------|----------|
| Excellent  | 0.25        | 0.31     |
| Good       | 0.45        | 0.14     |
| Poor       | 0.25        | -0.0675  |
| Crash      | 0.05        | -0.52    |


$$
E(r) = (0.25 \times 0.31) + (0.45 \times 0.14) + (0.25 \times -0.0675) + (0.05 \times -0.52)
$$


## Annualize returns

$$
\text{annual return} = \text{expected monthly return} \times 12
$$

$$
\text{annual return} = \text{expected daily return} \times 252
$$

*252 is the number of trading days.*

$$
\text{annual return} = \text{expected weekly return} \times 52
$$


# Return of a portfolio

Most investors own several stocks. The set of stocks that an investor owns is called an **investment portfolio**.


## Expected return

Expected return of a portfolio is the weighted average of the expected returns of the individual assets.

| State of the economy | Prob. | Toyota | Pfizer | ½ Toyota + ½ Pfizer |
|---|---|---|---|---|
| Expansion | 0.1 | 6% | 2.5% |  |
| Normal | 0.4 | 7.5 | -0.5 |  |
| Recession | 0.3 | 2.0 | 1 |  |
| Depression | 0.2 | -3 | 13 |  |
| Expected return E(R) |  | 3.6 | 2.95 | 3.275 |


Expected return of individual assets is calculated with the probabilities in each state of the economy. For example, with *Toyota*, it will be:

$$
(0.1 \times 6) + (0.4 \times 7.5) + (0.3 \times 2) + (0.2 \times -3) = 3.6
$$

The expected return of portfolio ½ Toyota + ½ Pfizer is:

$$
(0.5 \times 3.6) + (0.5 \times 2.95) = 3.275
$$