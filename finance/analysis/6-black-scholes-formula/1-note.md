# The Black Scholes Formula

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

## Call Option

Call options are financial contracts that give the option buyer the right but not the obligation to buy a underlying asset at a specified price within a specific time period.

A call buyer profits when the underlying asset increases in price.

The call option buyer may hold the contract until the expiration date, or they can sell the options contract at any point before the expiration date at the market price of the contract at that time.

The specified price is known as the strike price.

The specified time during which the sale can be made is its expiration or time to maturity.

You pay a fee to purchase a call option, called the premium; this per-share charge is the maximum you can lose on a call option.

If the underlying asset's current market price is above the strike price at expiration, the profit is the difference in prices, minus the premium. This sum is then multiplied by how many shares the option buyer controls.

For example, if Apple is trading at $110 at expiry, the option contract strike price is $100, and the options cost the buyer $2 per share, the profit is $110 - ($100 +$2) = $8. If the buyer bought one options contract, each contract contain 100 shares, their profit equates to $800 ($8 x 100 shares); the profit would be $1,600 if they bought two contracts ($8 x 200).

Now, if at expiration Apple is trading below $100, obviously the buyer won't exercise the option to buy the shares at $100 apiece, and the option expires worthless. The buyer loses $2 per share (or $200, for each contract they bought).

Upon expiration of the option, investor will compare the strike price and market price of the share:
- If strike price < share price &rarr; exercise
- If strike price > share price &rarr; don't exercise, because they buy the share with the price higher than the market price
![](https://optionclue.com/wp-content/uploads/2017/06/Long-Call.jpg)


## The Black Scholes Formula

The Black Scholes formula calculates the value of a call by taking the difference between **the amount you get if you exercise the option** minus **the amount you have to pay if you exercise the option**.

$$
C(S, t) = N(d_1)S - N(d_2)Ke^{-rt}
$$

$$
d_1 = \frac{1} {s\sqrt{t}} [ln(\frac{S}{K}) + (r + \frac{s^2}{2})t]
$$

$$
d_2 = d_1 - s\sqrt{t}
$$

- $d_1$: how much can we expect if the option is exercised
- $d_2$: the amount we pay when exercising the option
- $S$: current stock price
- $K$: option strike price
- $t$: time until option expires
- $r$: risk-freee interest rate
- $s$: sample standard deviation
- $N$: standard normal distribution
- $e$: exponential term 
- $C$: Call premium


## Reference

- [Underlying Asset (Derivatives)](https://www.investopedia.com/terms/u/underlying-asset.asp)
- [What Is a Call Option and How to Use It With Example](https://www.investopedia.com/terms/c/calloption.asp)
- [Black-Scholes Model: What It Is, How It Works, Options Formula](https://www.investopedia.com/terms/b/blackscholes.asp)