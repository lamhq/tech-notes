# Calculating and Comparing Rates of Return

## Calculating a Security's Rate of Return

To compare different investments, we need to calculate a percentage rate of return of each investment.

Investments with different holding periods (timeframe) shouldn't be compared.

### Simple rate of return

Preferable when you have to deal with multiple assets over the same timeframe.

$$
\text{simple rate of return} = \frac{\text{ending price} - \text{beginning price}}{\text{beginning price}}
$$


### Logarithmic rate of return

Preferable when you make calculations about a single asset over time.

$$
\text{logarithmic rate of return} = \log{\frac{\text{ending price}}{\text{beginning price}}}
$$

Logarithmic returns are commonly used in finance and investment analysis for a number of reasons:

1. Additivity: Logarithmic returns have the useful property of being additive, which means that the total return for a multi-period investment can be calculated simply by summing the individual period returns. This property is particularly useful when analyzing the returns of a portfolio with many different investments over different time periods.
1. Symmetry: Logarithmic returns are symmetric, meaning that a positive return of a certain magnitude is equivalent in magnitude to a negative return of the same magnitude. This symmetry is important for many applications, such as risk analysis and the calculation of expected returns.
1. Normality: Logarithmic returns are often more normally distributed than simple returns. This can be useful when using statistical models that assume normality, such as the Capital Asset Pricing Model (CAPM) and the Black-Scholes option pricing model.
1. Interpretability: Logarithmic returns are expressed in percentage terms, which makes them more easily interpretable than simple returns, which are expressed as absolute differences in prices or values.

Overall, the use of logarithmic returns is a well-established convention in financial analysis, and their many useful properties make them a preferred choice for many financial professionals.


### Annual (yearly) Returns

$$
\text{annual return} = [(\text{daily return} + 1)^{365}]*100
$$


## Calculating the Rate of Return of a Portfolio of Securities

Most investors own several stocks. The set of stocks that an investor owns is called an **investment portfolio**.

Every investor tries to select and add stocks that will optimize the overall rate of return of his portfolio.

The historical rate of return of a portfolio is the total of rate of return for a security * weight in portfolio.
