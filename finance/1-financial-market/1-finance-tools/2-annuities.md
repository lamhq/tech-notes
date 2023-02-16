# Annuities

An annuity is a series of equal fixed payments for a specified number of periods.

Example of annuities: mortgage payment, car loan payments, bonds payments

## Finding future value of Annuities (FV)

Annuity Compound Factor, $ACF(r, n)$, sum up the compounding factors for $n$ payments at a constant interest rate $r$.

$$
ACF(r, n) = \frac{(1 + r)^n - 1}{r}
$$

$$
FV_{n} = C \times ACF(r, n)
$$

- $FV$: future value of annuity
- $C$: cash flow per period
- $r$: interest rate
- $n$: number of periods

Excel formula:

```
= FV(rate, nper, pmt) = FV(r, n, C)
```

**Example**: Retirement problem

Suppose you want to have $1 million when you retire in 35 years. What annual payment would you have to make to get to your goal if you can earn 6% per year?

$$
\begin{align*}

FV_{35} &= 1,000,000 \\
r &= 6\% \\
C &= \frac{FV_{35}}{ACF(0.06, 35)} = \frac{1,000,000 \times 0.06}{(1 + 0.06)^{35}-1} = 8,973.86

\end{align*}
$$

Excel formula:

```
C = PMT(rate, nper, pv) = PMT(r, n, FV)
```

## Finding present value of Annuities

Suppose you will get a fixed payment $C$ every year for $n$ years. The opportunity cost of funds is $r$%. How much would you be willing to pay to receive this cash flows? (what is the present value?)

To do that, we need to discount each cash flow back to time zero and then add them.

$$
\begin{align*}
PV &= \frac{C}{1+r} + \frac{C}{(1+r)^2} + .. + \frac{C}{(1+r)^n} \\
  &= C \times ADF(r, n)
\end{align*}
$$

### Formula

$$
ADF(r, n) = \frac{1 - (1+r)^{-n}}{r}
$$

$$
PV = C \times ADF(r, n)
$$

- $PV$: present value
- $C$: the cash flow you receive each period
- $r$: interest rate
- $n$: number of periods

### Example: Loan problem

Suppose you borrow $\$37,150$ with a maturity of 60 months. The interest rate is $4\%$ per year, compounded monthly. What are the monthly payments? (what is the equivalent cashflow you have to pay?)

$$
\begin{align*}

PV &= 37,150 \\
r &= 4\% / 12 \\
n &= 60 \\
C &= \frac{V_0}{ADF(0.04 / 12, 60)} = \frac{37150}{54.2990689} = 684

\end{align*}
$$

## Examples

### Example 1

Which one would you prefer?

1. Receive $10,000 now
2. Receive $1,000 every year for 13 years (the last payment occurs at the end of 13 years), if the annual interest rate is 4%

**Answer:**

You want to compare the present value of $1,000 yearly for 13 years with $10,000 now.

So you need to calculate the present value of an annuity.

$$
\begin{align*}
PV &= C \times ADF(r, n) \\
  &= 1000 \times \frac{1 - (1+0.04)^{-13}}{0.04} \\
  &= 9985.65
\end{align*}
$$

Hence you prefer to have $10000 now.


### Example 2

How much would you have saved in twenty years if you save $5000 every year and can guarantee earning 6% per year?

**Answer:**

We need to compute the future value of an annuity.

$$
\begin{align*}
FV_{n} &= C \times ACF(r, n) \\
  &= 5000 \times \frac{(1 + 0.06)^{20} - 1}{20} \\
  &= 183,927.956
\end{align*}
$$

### Example 3

You are buying a new car. The car dealer gives you three financing options. If your objective is to minimize the present value of your car payments and your opportunity cost of capital is 0.5% per month, which one would you choose?

1. $500 per month for 36 months
2. $600 per month for 24 months
3. $350 per month for 48 months

**Answer:**

We need to compare the present value of each of these payment plans using the present value of an annuity.

$$
PV = C \times ADF(r, n)
$$

- The present value for option 1 is 16,435.51
- The present value for option 2 is 13,537.720
- The present value for option 3 is 14,903.111

You should choose option 2, the lowest.

### Example 4

You are buying a new house for $450,000. Reviewing different financing options, you have determined that you would like to minimize your monthly payment. Which financing option would you choose? Assume monthly payments over the life of the mortgage.

1. 30-year mortgage with annual interest rate of 3.5 percent
2. 20-year mortgage with an annual interest rate of 3 percen
3. 15-year mortgage with an annual interest rate of 2.8 percent

**Answer:**

We need to solve for the fixed monthly mortgage payments using the present value formula of annuities.

$$
C = \frac{PV}{ADF(r, n)}
$$

- Option 1, C = 2020.70
- Option 2, C = 2495.69
- Option 3, C = 3064.515

You should choose option 1, the lowest.


# Growing Annuities

An annuity is a series of payments increasing at a constant growth rate for a specified number of periods.

## Formula

$$
ADF(r, n, g) = \frac{1 - \frac{(1+g)^n}{(1+r)^n}}{r - g}
$$

$$
ACF(r, n, g) = \frac{(1+r)^n-(1+g)^n}{r - g}
$$

## Example

Suppose you estimated your salary will start at $90K and will grow at 5% per year for the next five years. What is the present value of your future salary if the interest rate is 8% per year?

$$
V_0 = 90000 \times ADF(r=8\%, n=5\%, g=5\%)
$$