# Calculate Rate of Return of a financial asset

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

The geometric mean is useful for measuring performance over a past sample period, such as annual returns over `t` periods.

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

Expected return are the probability weighted average of the possible outcomes.

|            | Probability | Return   |
|------------|-------------|----------|
| Excellent  | 0.25        | 0.31     |
| Good       | 0.45        | 0.14     |
| Poor       | 0.25        | -0.0675  |
| Crash      | 0.05        | -0.52    |


$$
E(r) = (0.25 \times 0.31) + (0.45 \times 0.14) + (0.25 \times -0.0675) + (0.05 \times -0.52)
$$
