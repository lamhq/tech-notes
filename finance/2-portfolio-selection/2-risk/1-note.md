# Measuring Investment Risk

## Calculating a Security's Risk

Risk is the chance of losing money. Variability is the best measure of risk.

Most people prefer to have a good idea about the rate of return they can expect (from a security or a portfolio of securities) and are doing their best to reduce the risk they are exposed to.

Statistical measures to quantify risk are: variance, **standard deviation**


## Portfolio Diversification (relationship)

You should by stocks from companies operate in different industries (so they are independent).

To measure the relationship between two stocks (variables) we use **correlation coefficient**.

$$
\rho_{xy} = \frac{(x - \overline{x})*(y - \overline{y})}{\sigma_x\sigma_y}
$$

Correlation between prices and correlation between returns may show different values:

- The correlation between the prices focuses on stock price levels.
- The correlation between the rate of returns reflects the dependence between prices at different times and focuses on the returns of your portfolio. As an investor, returns is what you care about.


## Portfolio Risk

If a portfolio contain multiple stocks, its risk will be a function of the **variances** of the stocks, and of the **correlation** (and Covariance) between them.

$$
\begin{align*}
\text{Portfolio Variance} &=  \text{Un-diversifiable risk} + \text{Diversifiable risk} \\

\sigma_{p_{1..n}}^2 &= 
  (w_1^2\sigma_1^2 + w_2^2\sigma_2^2 + ... + w_n^2\sigma_n^2 ) + \\
  & \qquad (2w_1\sigma_1w_2\sigma_2\rho_{12} + 2w_1\sigma_1w_3\sigma_3\rho_{13} + ...) \\
  
  &=\sum_{i=1}^n\sum_{j=1}^nw_iw_j\sigma_{ij} \\
  
  &= \begin{bmatrix} w_1 & w_2 & ... & w_n \end{bmatrix}
  \begin{bmatrix}
    \sigma_1^2 & \sigma_{12} & ... & \sigma_{1n} \\
    \sigma_{21} & \sigma_2^2 & ... & \sigma_{2n} \\
    ... \\
    \sigma_{n1} & \sigma_n^2 & ... & \sigma_n^2
  \end{bmatrix}
  \begin{bmatrix} w_1 \\ w_2 \\ ... \\ w_n \end{bmatrix}
\end{align*}
$$

Covariance Matrix:
$$
\Sigma = \begin{bmatrix}
  \sigma_1^2 & \sigma_{12} & ... & \sigma_{1n} \\
  \sigma_{21} & \sigma_2^2 & ... & \sigma_{2n} \\
  ... \\
  \sigma_{n1} & \sigma_n^2 & ... & \sigma_n^2
\end{bmatrix}
$$

There are two types of investment risk:

![](https://cdn.corporatefinanceinstitute.com/assets/Screen-Shot-2018-09-26-at-10.09.31-AM.png)

$$
$$

### Un-diversifiable (Systematic) risk

- Depends on the variance of each individual security.
- Cannot be eliminated. Is characteristic of the entier market.
- Example: recession of the economy, low consumer spending, wars, forces of nature.

### Diversifiable (unsystematic) risk

- Idiosyncratic (company specific) risk.
- Driven by company-specific events.
- Can be eliminated if we invest in non-correlated assets.

Academic research has show if we build a portfolio containing at least 25-30 not correlated stocks, unsystematic will almost disappear. Some institutional investors go even further and build portfolio of securiites from different countries.