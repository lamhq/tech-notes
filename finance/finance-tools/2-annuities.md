# Annuities

An annuity is a series of equal fixed payments for a specified number of periods.

Example of annuities: mortgage payment, car loan payments, bonds payments

## Finding future value of Annuities

Annuity Compound Factor, $ACF(r, n)$, sum up the compounding factors for $n$ payments at a constant interest rate $r$.

$$
ACF(r, n) = \frac{1 - (1 + r)^{-n}}{r}
$$

$$
FV_{Ordinary Annuity} = C \times ACF(r, n)
$$

- $FV$: future value of annuity
- $C$: cash flow per period
- $r$: interest rate
- $n$: number of payments

**Example**: Retirement problem

Suppose you want to have $1 million when you retire in 35 years. What annual payment would you have to make to get to your goal if you can earn 6% per year?

$$
\begin{align*}

FV_{35} &= 1,000,000 \\
r &= 6\% \\
C &= \frac{FV_{35}}{ACF(0.06, 35)} = \frac{1,000,000 \times 0.06}{(1 + 0.06)^{35}-1} = 8,973.86

\end{align*}
$$


## Finding present value of Annuities

$$
ADF(r, n) = \frac{1}{(1+r)^n}
$$

$$
V_{0} = C \times ADF(r, n)
$$

**Example**: Loan problem

Suppose you borrow $\$37,150$ with a maturity of 60 months. The interest rate is $4\%$ per year, compounded monthly. What are the monthly payments?

$$
\begin{align*}

V_{0} &= 37,150 \\
r &= 4\% / 12 \\
n &= 60 \\
C &= \frac{V_0}{ADF(0.04 / 12, 60)} = \frac{37150}{54.2990689} = 684

\end{align*}
$$