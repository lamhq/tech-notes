# Portfolio risk and return

## Measuring Expected return

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


## Measuring Risk

To calculate portfolio risk, first we find the returns in each state of economy.

Then we can find the variance of that return around the portfolio's expected return by computing the probability weighted average of the square deviations from the mean.

For example, the portfolio's weighted average return in Expansion state is:

$$
(6\% \times 0.5) + (2.5\% \times 0.5) = 4.25\%
$$

| State of the economy | Prob. | Toyota | Pfizer | ½ Toyota + ½ Pfizer |
|---|---|---|---|---|
| Expansion | 0.1 | 6% | 2.5% | 4.25% |
| Normal | 0.4 | 7.5 | -0.5 | 3.5 |
| Recession | 0.3 | 2.0 | 1 | 1.5 |
| Depression | 0.2 | -3 | 13 | 5.0 |
| Expected return E(R) |  | 3.6 | 2.95 | 3.275% |
| Standard deviation |  |  |  | 1.29% |

The portfolio's variance is:

$$
\begin{align*}
\sigma^2 &= 
0.1 \times (4.25 - 3.275)^2 \\
& + 0.4 \times (3.5 - 3.275)^2 + \\
& + 0.4 \times (1.5 - 3.275)^2 + \\
& + 0.2 \times (5.0 - 3.275)^2 \\
& = 1.66
\end{align*}
$$

$$
\sigma = 1.29\%
$$

Other method for calculating portfolio's risk:

$$
\begin{align*}
\sigma_{p}^2 &= 
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

## Co-movement between securities

The variance of a portfolio's return is affected by how the securities "co-move".

### Covariance

Covariance and correlation measures allow us to evaluate how securities move or do not move together. 

Covariance is a measure of the pairwise co-movement between two securities. It is calculated by taking a probability-weighted average of the product of the deviations from the mean of each security. 

$$
cov(x, y) = \sigma_{xy} = \displaystyle\sum P(r_x-E(r_x))(r_y-E(r_y))
$$

For example, the covariance between **Toyota** and **Pfizer** is:

$$
\begin{align*}
cov(r_T, r_P) &= \sigma_{T,P} = 0.1(6-3.6)(2.5-2.95) \\
  &+ 0.4(7.5-3.6)(-0.5-2.95) \\
  &+ 0.3(2-3.6)(1-2.95) \\
  &+ 0.2(-3-3.6)(13-2.95) \\
  &= -17.820
\end{align*}
$$

The covariance is negative, which tells us the stocks of Toyota and Pfizer move in opposite directions.

One drawback of the covariance measure is that its magnitude does not tell us much about the strength of the co-movement.

### Correlation

Correlation is a standardized measure of co-movement

It is defined as the covariance between two assets scaled by the product of the standard deviations of each asset.

$$
\rho_{xy} = \frac{\sigma_{xy}}{\sigma_x\sigma_y}
$$

Correlation coefficient can only take values between `-1` to `+1`. 

| Correlation coefficient | Effect of diversification on risk |
|---|---|
| +1.0 | No risk reduction is possible |
| + 0.5 | Moderate risk reduction is possible |
| 0 | Considerable risk reduction is possible |
| - 0.5 | Most risk can be eliminated |
| - 1.0 | All risk can be eliminated |
