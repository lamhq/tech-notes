# Monte Carlo Simulation as a Decision-Making Tool

## Monte Carlo in Corporate Finance Context

Monte Carlo would allow us to forecast:

- Revenues
- Cogs: cost for goods sold
- OPEX: operating expenses
- Company Gross Profit


## Forecasting Stock Prices

$$
\text{Price Today} = \text{Price Yesterday} \times \epsilon^r
$$

- $r$: log return of the share

Explanation:

$$
\epsilon^{ln(x)} = x \rightarrow
\epsilon^r = \epsilon^{ln(\frac{Price Today}{Price Yesterday})}
$$

We can use Brownian motion to model $r$:

$$
r = (\mu -\frac{1}{2}\sigma^2) + \sigma\text{Z}[Rand(0; 1)]
$$

- $\text{Z}[Rand(0; 1)]$: Z of a random number between 0 and 1

The first part, **drift** is the expected daily return of the stock. The second part is the **Random Value**.

If we repeat the calculation 1000 times, we'll be able to simulate the development of tomorrow stock price and assess the likelihood if it will follow a pattern.
