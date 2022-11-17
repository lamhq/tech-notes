# The Capital Asset Pricing Model

## Concepts

In CAPM setting, a higher rate of return means more risk (and conversely)

In CAPM setting, investors:

- Are risk-averse, rational, willing to buy the optimal portfolio
- Will choose between the risk-free asset and the market portfolio
- Make their decisions based on their risk appetite

The market portfolio:
- comprises all securities in the market
- a combination of all the possible investments in the world (bonds & stocks)
- optimal in terms of risk (diversified portfolio). only face systematic risk. 
- its expected return coincides with market's expected return
- lies on the efficient frontier (the most efficient)

The risk-free asset:
- an investment with zero risk
- provide a low level of expected return

The Capital Market Line:
- is the line that connects the risk-free rate and is tangent to the Efficient Frontier
- the point where the Capital Market Line intersects the Efficient Frontier is the **market portfolio**

![](https://i.pinimg.com/originals/5f/9e/49/5f9e49954ac41dc7e11bf26d4043b0a2.jpg)

Safer stocks: stocks that earn less than the market portfolio when the economy grows

Riskier stocks: stocks that earn more than the market portfolio when the economy grows.


## Beta $\beta$

Beta helps us quantify the relationship between a security and the overall market portfolio. It measures the market risk that cannot be avoided through diversification.

Beta is typically measured with data from the past five years.

$$
\beta = \frac{Cov(r_x, r_m)}{\sigma_m^2}
$$

Beta is calculated by the **covariance between the stock and the market** devided by the **variance of the market**.

- $\beta = 0$: the stock has no relationship regarding the market.
- $\beta < 1$: is called **defensive**, the stock lose less when the market does poorly.
- $\beta = 1$: perform the same way as the market does.
- $\beta > 1$: aggressive, riskier than the market, do better than the market when the economy flourishes


## The CAPM formula

$$
r_i = r_f + \beta_{im} \times (r_m - r_f)
$$

- $r_i$: expected return of the securities $i$
- $r_f$: return of the risk free asset
- $r_m$: return of the market
- $\beta_{im}$: covariance between the stock and the market
- $r_m - r_f$: Equity Risk Premium

### Risk-free asset

There's no risk-free asset in the real world. The closest asset we choose is 10-years US goverment bond, whose expected return is approximately 2.5%

### Beta

The best proxy for the market portfolio is a wide index traded in the country of the security. Example: S&P500

### Equity Risk Premium

Academic research has proven the market risk premium for equities in the US has been between 4.5% and 5.5%


## Sharpe ratio

Investors want to be able to compare stocks in terms of risk-return performance. They wiil be interested in investing in the ones that will provide the highest return for a given amount of risk.

$$
\text{Sharpe Ratio} = \frac{r_i-r_f}{\sigma_i}
$$

- $r_f$: risk free rate
- $r_i$: rate of return of the stock $i$
- $\sigma_i$: standard deviation of the stock $i$