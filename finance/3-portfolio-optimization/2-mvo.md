# Mean-variance optimization

## Portfolio constructing process

The process of constructing an overall portfolio is explained in two steps:

- The first step involves selecting the composition of the risky portfolio given the risky assets one has available
- The second step involves deciding how much of one's wealth should be invested in that risky portfolio and how much should be invested in risk-free assets. 


## Chossing the risky portfolio

Regardless of investors' attitudes towards risk, there will be a single *optimal risky portfolio* best for all investors.

The best risky portfolio will be identical for all investors.

### Two risky assets case

Let's suppose that we have two risky assets and the risk-free asset.

To determine the best combination of two risky assets and a risk-free asset, we look at several capital location lines to determine the highest Sharpe ratio or the steepest capital allocation line.

This tangency portfolio is called the **mean-variance efficient portfolio**.

![Image of mean-variance efficient portfolio](https://quantpedia.com/app/uploads/2021/04/obr1-intro.png)

Steps to find the **mean-variance efficient portfolio**:

1. Given the two assets with:
    - $E_1$, $E_2$: Expected Return of the two risky assets
    - $\sigma_1$, $\sigma_2$: standard deviation (volatility)
    - $w_1$, $w_2$: weights of each asset in the portfolio
    - $\sigma_{12}$: correlation between two assets
    - $E(r_f)$: return of risk-free asset
1. Construct the formula to calculate **sharpe ratio** from $w_1$, $w_2$
    $$
    S = \frac{E(r_s) - E(r_f)}{\sigma_s}
    $$
    
    with:
    
    $$
    E(r_s) = w_1E_1 + w_2E_2
    $$
    
    $$
    \sigma_s = \sqrt{w_1^2\sigma_1^2 + w_2^2\sigma_2^2 + 2w_1w_2\sigma_1\sigma_2\sigma_{12} }
    $$
1. Use Excel Solver to find the **weight** that have highest **sharpe ratio**


### Multiple risky assets case

The minimum variance frontier is the locus of all portfolios that give minimum risk for a given level of return.
 
To find that frontier, we only need to know the composition of two portfolios: **mean-variance efficient portfolio** and **global minimum variance portfolio**, and trace out their combination.

Given the following inputs:

- $n$: number of risky assets
- $R$: matrix of returns, size $(n, 1)$
- $\sigma$: matrix of standard deviations, size $(n, 1)$
- $\rho$: correlation matrix of risky assets, size $(n, n)$
- $w$: matrix of assets's weights, size $(1, n)$
- $R_f$: return of the risk-free asset

Steps to find the **mean-variance efficient portfolio**:

1. Construct the formula to calculate Expected Return of the result portfolio from weights:
    $$
    R_p = w \times R
    $$
1. Find the covariance matrix
    $$
    cov = \rho \cdot (R \times R^T)
    $$
    - $\cdot$ is scalar multiplication between two matrices
    - $\times$ is matrix multiplication operator
    - $R^T$: transpose matrix of matrix $R$
1. Construct the formula to calculate Standard Deviation of the result portfolio from weights:
    $$
    \sigma_p = \sqrt{w \times cov \times w^T}
    $$
1. Construct the formula to calculate Sharpe Ratio:
    $$
    S = \frac{R_p-R_f}{\sigma_p}
    $$
1. Use Excel solver to find the weight matrix that has highest Sharpe Ratio.

Steps to find the **global minimum variance portfolio**:

1. Repeat step 1 to 3 of finding mean-variance efficient portfolio.
1. Use Excel solver to find the weight matrix that has smallest Standard Deviation.


## Capital Allocation Line

The Capital Allocation Line is a line drawn in the mean variance, in the expected return-volatility space, indicating all the risk and return of portfolios that can be created by combining the risky portfolio and risk-free assets. 

![Capital Allocation Line image](https://cdn.wallstreetmojo.com/wp-content/uploads/2019/07/Capital-Allocation-Line-1.jpg)

The expected return that we would get from combining the risky portfolio with the risk-free asset:

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

The portfolio's variance:

$$
\begin{align*}
\sigma_p^2 &= w^2\sigma_s^2 + (1-w)\sigma_f^2 +2w(1-w_1)\sigma_{fs} \\
  &= w^2\sigma_s^2
\end{align*}
$$

Then we have:

$$
w = \frac{\sigma_p}{\sigma_s}
$$

Replace $w$ in expected return formula, we have the expression of **Capital Allocation Line**:

$$
\begin{align*}
E(r_p) &= r_f + \frac{\sigma_p}{\sigma_s} \times E(r_s - r_f) \\
  &= r_f + \frac{E(r_s) - E(r_f)}{\sigma_s}\sigma_p
\end{align*}
$$

The slope of the line delivers a special name called the **Sharpe ratio**. It tells you how much additional reward you get per unit of risk for holding in the risky portfolio. So it's the return premium that you get for investing in the risky portfolio per unit of risk. It's also sometimes called the reward to volatility ratio.

**Investors need to choose where along this line they want to be depending on their investment goals**.

Reference: https://www.wallstreetmojo.com/capital-allocation-line/


## Optimal capital allocation

Where you would choose to be on capital allocation line is depend in your attitude toward risk.

Risk preferences can be portrayed using indifference curves.

The optimal assets allocation maximizes utility by getting on the highest indifference curve at the tangency point with the capital allocation line (where the highest indifference curve touches the capital allocation line).

![](https://analystprep.com/cfa-level-1-exam/wp-content/uploads/2019/09/Optimal-Portfolio-Given-Different-Utility-Functions.png)

See more [here](https://analystprep.com/cfa-level-1-exam/portfolio-management/optimal-portfolios/).

The problem we're solving is trying to maximize expected utility by choosing the weight of the risky portfolio. The utility function is given by:

$$
U = E(r_p) - \frac{1}{2}A\sigma_p^2
$$

Replace $E(r)$ and $\sigma$ from Capital Allocation Line formula, we have:

$$
U = r_f + w \times E(r_{mve} - r_f) - \frac{1}{2}Aw^2\sigma_{mve}^2
$$

The optimal capital allocation for an investor with a risk aversion coefficient of $A$ is given by:

$$
w = \frac{E(r_{mve}) - r_f}{A\sigma_{mve}^2}
$$

Where:

- $w$: weight of the optimal risky portfolio that maximizes the Sharpe ratio. In this case, that is the MVE portfolio.


## Investment decision process

The investment decision process can be viewed as a top-down process. It involves three steps: capital allocation, asset allocation, and security selection.

The **capital allocation decision** is the most important as it determines the amount of risk exposure an investor would like to have based on their risk aversion and expectations about the risk-return trade-off of the risky portfolio. 

The **asset allocation decision and security selection** can be combined as finding the combinations of risky securities that have the minimum risk for a given level of return and identifying the one risky portfolio that maximizes the Sharpe ratio. 

Investors may also have additional constraints, such as restrictions on short positions, minimum dividend yield requirements, or socially responsible investing considerations. However, more constraints can result in an inferior solution with a lower Sharpe ratio.


## Limitations

Limitations of the mean-variance investing framework:

The first limitation is that it only takes into account the first two modes, mean and variance, when it comes to return distributions, while investors typically care about downside risk and other movements of risks.

The second limitation is that mean-variance utility does not distinguish between gains and losses, even though investors often exhibit loss aversion

Thirdly, mean-variance utility assumes constant risk aversion, but our attitudes toward risk may change depending on external factors.

Fourthly, it assumes that investors have short horizons and only live one period, which has implications for long-run investment decisions.

Finally, the results obtained from mean-variance analysis are extremely sensitive to the inputs used, such as expected returns and variances, and historical data may not be indicative of the future.

Despite these limitations, mean-variance investing is still the most common way to choose portfolios, and the main takeaway from portfolio choice problem is to select the most diversified portfolio to reduce risk and increase return.