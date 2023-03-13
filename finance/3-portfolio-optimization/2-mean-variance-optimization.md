# Mean-variance optimization

## Portfolio constructing process

The process of constructing an overall portfolio is explained in two steps:

- The first step involves selecting the composition of the risky portfolio given the risky assets one has available
- The second step involves deciding how much of one's wealth should be invested in that risky portfolio and how much should be invested in risk-free assets. 


## Chossing the risky portfolio

Regardless of investors' attitudes towards risk, there will be a single optimal risky portfolio best for all investors.

The best risky portfolio will be identical for all investors.


## Capital Allocation Line

The expected return that we would get from combining the risky asset with the risk-free asset:

$$
\begin{align*}
E(r_p) &= w \times E(r_s) + (1 - w) \times r_f \\
  &= r_f + w \times E(r_s - r_f)
\end{align*}
$$

- $E(r_p)$: epxected return of the combined portfolio
- $r_s$: epxected return of the risky portfolio
- $w$: weight of the risky portfolio
- $r_f$: epxected return of the risk-free asset

The portfolio's volatility:

$$
\sigma_p = w\sigma_s
$$


The Capital Allocation Line is a line drawn in the mean variance, in the expected return-volatility space, indicating all the risk and return combinations that can be created using the risky asset and risk-free assets. 

![Capital Allocation Line image](https://cdn.wallstreetmojo.com/wp-content/uploads/2019/07/Capital-Allocation-Line-1.jpg)

The slope of the line delivers a special name called the **Sharpe ratio**. It tells you how much additional reward you get per unit of risk for holding in the risky asset. So it's the return premium that you get for investing in the risky asset per unit of risk. It's also sometimes called the reward to volatility ratio.

Investors need to choose where along this line they want to be depending on their investment goals.

Reference: https://www.wallstreetmojo.com/capital-allocation-line/