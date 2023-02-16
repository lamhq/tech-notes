# Time Value of Money

The time value of money means that a sum of money is worth more now than the same sum of money in the future (due to its earnings potential in the interim).

## Opportunity Cost

Opportunity cost is key to the concept of the time value of money. Money can grow only if it is invested over time and earns a positive return. Money that is not invested loses value over time. 


## Finding the future value of a cash flow (FV)

$$
FV = PV \times (1 + r)^{T}
$$

- $FV$: Future value of money (the amount you get after `n` compounding periods)
- $PV$: Present value of money
- $r$: Interest rate per period
- $T$: Number of compounding periods

**Excel formula**:

```
FV(rate, nper, pmt, [pv], [type])
```

- `rate` is the fixed interest rate per period.
- `nper` is the total number of payment periods.
- `pmt` is the payment made each period. This can be a positive or negative value, depending on whether you are making payments or receiving payments.
- `pv` (optional) is the present value, or the amount of money you are investing. If this value is not provided, it is assumed to be 0.
- `type` (optional) is a number that represents the due date of the first payment. If this value is 0 or is not provided, payments are due at the end of each period. If this value is 1, payments are due at the beginning of each period.


**Examples**: 

Let's assume a sum of $10,000 is invested for one year at 10% interest compounded annually. The future value of that money after 2 year is:

$$
FV = 10,000 \times (1 + 0.1)^{2}
 = 12,100
$$

In excel:

```
= FV(0.1, 2, 0, -10000)
```

## Finding the present value of a cash flow (PV)

$$
PV = \frac{FV}{(1 + r)^{T}}
$$

In excel:

```
PV(rate, nper, 0, fv) = PV(r, T, 0, FV)
```