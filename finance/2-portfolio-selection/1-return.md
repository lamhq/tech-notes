# Calculate Rate of Return of a Financial Asset

# Return of a portfolio

Most investors own several stocks. The set of stocks that an investor owns is called an **investment portfolio**.


## Expected return

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