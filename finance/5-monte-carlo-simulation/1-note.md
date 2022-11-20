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


## Derivative Contracts

A derivative is a financial instrument, whose price is derived based on the development of one or more underlying assets: stocks, bonds, interest rates, commodities, exchange rates.

It is a contract involving at least two parties and describing how and when the two parties will exchange payments.

Some derivate contracts are traded in regulated markets while others traded over the count (not regulated). Derivatives traded in regulated markets have a uniform contractual structure and are much simpler to understand.

### Three groups of people dealing with derivatives

- Hedging: people interested in hedging their investments.
- Speculator
- Arbitrageurs: traders interested in finding pricing discrepancies and profiting from these.

### Four main types of financial derivatives

- **Forwards**: two parties agree that one party will sell to the other an underlying asset at a future point of time, price is agreed before hand.
- **Futures**: are highly standardized forward contracts. Transaction goes through the marketplace and the counter parties do not know each other.
- **Swaps**: two parties agree to exchange cash flows based on an underlying asset (interest rate, stock price, bond price, commodity). The most widely used swap contracts are interest rate swaps.
- **Options**: an option contract enable its owner to buy or sell an underlying asset at a given price.
  - Options that involve buying an asset are called call options
  - Options based on the sale of an asset are put options
  - European Options can be exercised only at maturity
  - American Options may be exercised at any time