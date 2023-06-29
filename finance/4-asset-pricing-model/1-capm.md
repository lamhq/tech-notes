# Capital Asset Pricing Model (CAPM)

## Overview

The Capital Asset Pricing Model (CAPM) is an economic model that seeks to explain the relationship between risk and expected return in financial markets.

It predicts the main expected return and risk relationship by measuring an asset's systematic risk.

The main assumption of the CAPM is that investors are rational and systematic in their investment decision-making process. This means that investors seek to maximize their returns while minimizing their risk.


## Efficient Frontier (recall)

Suppose there are many individual risky assets with different means and volatility. Investors will diversify their portfolio to reduce unsystematic risk. They will prefer efficient portfolios that lie on the upper part of the main variance efficient frontier.

![Image: Efficient Frontier](https://investinganswers.com/images/_640x428_crop_center-center_none/120634/Efficient-frontier-new(2).webp)

Investors who wish to maximize their mean variance utility will choose to hold a combination of the risk-free asset and the best possible risky portfolio along the frontier, which maximizes the Sharpe Ratio. 


## The Market portfolio

Market portfolio is the portfolio that:
- consists of all the world’s tradable and non-tradable assets, including stocks, bonds, commodities, real estate and all other risky assets.
- a combination of all the possible investments in the world (bonds & stocks)
- optimal in terms of risk (diversified portfolio). only face systematic risk. 
- its expected return coincides with market's expected return
- lies on the efficient frontier (the most efficient)

![Image: Efficient Frontier and Market Portfolio](https://i.pinimg.com/originals/5f/9e/49/5f9e49954ac41dc7e11bf26d4043b0a2.jpg)

In an equilibrium when all investors have the same expectations, the tangency portfolio that delivers the highest Sharpe Ratio must be the entire market portfolio of risky assets. Thus, all investors will hold the market portfolio in different proportions, which will turn out to be the entire market portfolio of risky assets.


## Capital Market Line

Capital Market Line is the line that connects the risk-free rate and is tangent to the Efficient Frontier.

The point where the Capital Market Line intersects the Efficient Frontier is the **market portfolio**.

It provides the portfolio combinations with the maximum Sharpe ratio.


## Passive Investing is Efficient

Holding an index fund that replicates the market portfolio is efficient, and thus passive investing is efficient.

Overall, this insight helps us understand how investors allocate their portfolios in the CAPM world.


## What determines the market risk premium?

What should be the risk compensation that investors will require to expose themselves to the risk of their market portfolio?

$$
r_m - r_f = \bar{\gamma} \times \sigma_m^2
$$

- $r_m - r_f$: market risk premium (the difference between the expected return of the market portfolio and the risk-free rate)
- $\bar{\gamma}$: the average risk aversion coefficient in the economy
- $\sigma_m^2$: variance of the market portfolio

The market risk premium is determined by the average risk aversion and the variance of the market portfolio (the amount of market risk that can not be diversified away).


## Systematic Risk vs Non-systematic Risk

### Systematic Risk

Systematic (market) Risk is the proportion of the risk of the security that is related to moves of the market portfolio. 

We cannot eliminate the systematic risk of an asset. Therefore,  investors need to be rewarded for undiversifiable risks. 

### Non-systematic Risk

Non-systematic (idiosyncratic) risk is the proportion of the risk of the security that is unrelated to moves of the market portfolio.

It is the risk that disappear when that security is held in the market portfolio.

Non-systematic risk can be diversified away.


## Beta $\beta$

Beta is the numerical description of systematic risk.

It is a measure of how an asset co-moves with the market portfolio. Beta helps us quantify the relationship between a security and the overall market portfolio.

It measures the market risk that cannot be avoided through diversification.

Beta is typically measured with data from the past five years.

$$
\beta = \frac{Cov(r_x, r_m)}{\sigma_m^2}
$$

Beta is calculated by the **covariance between the stock and the market** devided by the **variance of the market**.

- $\beta = 0$: the stock has no relationship regarding the market.
- $\beta < 1$: is called **defensive**, the stock lose less when the market does poorly.
- $\beta = 1$: perform the same way as the market does.
- $\beta > 1$: aggressive, riskier than the market, do better than the market when the economy flourishes


## CAPM formula

$$
r_i = r_f + \beta_{im}(r_m - r_f)
$$

- $r_i$: expected return of the securities $i$
- $r_f$: return of the risk free asset
- $r_m$: return of the market
- $r_m - r_f$: market risk premium (the difference between the expected return of the market portfolio and the risk-free rate)
- $\beta_{im}$: covariance between the stock and the market (the measure of how closely the asset's price movements match that of the overall market)
- $\beta_{im}(r_m - r_f)$: compensation for risk of the investment

The CAPM formula states that the expected return on an asset equals the risk-free rate plus a risk premium. The risk premium is the excess return that the market portfolio provides beyond the risk-free rate. This extra return depends on the asset's beta, which measures the systematic risk it adds to the investor's portfolio.

When all investors in a market become mean variance optimizers and hold efficient portfolios, CAPM predicts what the prices or expected returns have to look like so that the market clears, supply equals demand, and nobody wants to do anything differently, resulting in **equilibrium**.


## Security Market Line (SML)

The SML is a graph that depicts the CAPM relationship between the expected return and the beta.

The risk-free asset has a beta of 0, while the market portfolio has a beta of 1.

All assets should lie on the equilibrium market line in equilibrium.

![Image: Security Market Line](https://cdn.wallstreetmojo.com/wp-content/uploads/2021/06/SML-Graph-Done.jpg)

If an asset has a higher expected return than the one suggested by the SML, that means that the asset's price is too low (underpriced - bị định giá thấp).

This means that everybody would want to buy the asset, so the price will rise. As the price of the asset goes up, the expected return goes down, until we reach an equilibrium.

So initially the asset would be plotted above the SML, but as equilibrium is reached the asset should be plotted on the SML.

## High Beta and Low Beta Assets

### High Beta Assets

Investors find high beta assets unattractive because these assets move strongly with the rest of the market and offer little diversification benefits. 

They require higher expected returns to compensate for doing poorly in bad times, where the market portfolio return is low.

### Low Beta Assets

In contrast, low beta assets offer great diversification benefits, especially during bad times when investors need it most. They are attractive to investors and do not require high expected returns.


## Exercises

### Question 1

Your investment portfolio consists of $150,000 invested in only one stock – Pocemon. Suppose the risk free rate is 3%. The Pocemon stock has an expected return of 12%, and a volatility of 40%, and the market portfolio has an expected return of 10% and volatility of 18%. Under the CAPM assumptions, what is the volatility of a better alternative portfolio that has the same expected return as Pocemon?

*Answer:*

Recall that under CAPM assumptions, the Capital Market line is the efficient frontier – that is the combinations of the market portfolio and the risk-free asset that maximize the Sharpe ratio.

Instead of holding Pocemon stock, investor can construct a better alternative portfolio of a mix of risk-free asset and the market portfolio on the efficient frontier that has the same expected return, but lower volatility.

The Capital Market Line is given by the following expression:

$$
r_p = r_f + \frac{r_m - r_f}{\sigma_m} \times \sigma_p
$$

An efficient portfolio with the same expected return ($r_p = 12\%$) as Pocemon (but with lower volatility) will have the following volatility:

$$
12\% = 3\% + \frac{7}{18} \times \sigma_p \\
\Rightarrow \sigma = 23.14\%
$$


### Question 2

Suppose you have invested $30,000 in the following four stocks

| Security | Amount | Beta |
|----------|--------|------|
| A        | 5000   | 0.75 |
| B        | 10000  | 1.1  |
| C        | 8000   | 1.36 |
| D        | 7000   | 1.88 |

Based on the CAPM, what is the beta of the portfolio?

*Answer:*

The beta of the portfolio is simply the weighted average of the individual betas of the securities in the portfolio.

$$
\beta_p = \sum_{i=1}^N w_i\cdot \beta_i = 1.29
$$
