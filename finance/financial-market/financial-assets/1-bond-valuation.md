# Basics of bond valuation

## Basic principles of valuing financial assets

To value an asset, two ingredients are needed: the expected cash flows and a risk-adjusted discount rate. 

The steps to find the value of any financial asset are as follows:

- Identify the cash flows (promised or expected).
- Determine the appropriate risk-adjusted discount rate.
- Discount the cash flows at the risk-adjusted discount rate.
- The present value of the cash flows represents the value of the financial asset.

## Bonds

The two main cash flows associated with bonds are:

- Coupon Payments: These are periodic payments made by the issuer of the bond to the bondholder as a return on their investment. The coupon payment is usually a fixed amount and is a percentage of the face value of the bond.
- Return of Principal: the face value paid at maturity, the issuer is required to repay the face value of the bond to the bondholder. This is known as the return of principal or repayment of the bond's face value.

**Example:**

A bond with the face value is 1,000, a coupon rate of 5%. The bond will make 1,000 x 5% = $50 periodically, annually.

Typically, the coupon payments will be made semiannually, so that each coupon will in fact be, $25.

Notice that the coupon rate is not the rate of the return on the bond, or the interest rate of the bond. It's just the way to tell us what these cash flows are.

## Zero-coupon bonds

Zero-coupon bonds have only single cash flow which is equal to the face value at maturity.

The value of a zero-coupon is simply the discounted value of the single cash flow at maturity at time T.

**Formula:**

$$
PV = FV / (1 + r)^t
$$

Where:

- $PV$ is the present value
- $FV$ is the face value or par value of the bond
- $r$ is the discount rate or the yield to maturity
- $t$ is the time until maturity (in years)

**Example:**

One-year zero-coupon bond with a face value of $10,000 is sold in a market where the one-year discount rate is 5.35%. What is the market value of the bond?

$$
PV = 10000 / (1+0.0535)^1
$$


## Coupon bonds

Bonds often make periodic payments – coupon payments. For example, U.S. bonds typically make semiannual bonds.

The coupon rate is expressed as a percentage of the face value (remember this is just a way of telling us what the periodic cash flows are).

**Example:**

A 2-year bond with a face value of $1,000, a coupon rate of 12% and semi-annual coupon payments is sold in a market where the 12-month discount rate is 5.35%, compounded semiannually. What is the market value of the bond?

The coupon rate of 12%, semi-annual payments. So it will make $1000 \times \frac{12\%}{2} = 60\$$ every 6 months for 2 years.

So 4 coupon payments and the face values, are the two cash flows of this bond.

$$
PV = 60 \times ADF(r=\frac{5.35\%}{2}, n=4) 
  + \frac{1000}{(1 + \frac{5.35\%}{2})^4} \\
  = 1124.56
$$


## Internal rate of return

The internal rate of return (IRR) or Yield to maturity (YTM) of a bond is the discount rate that makes the present value, of all the bond's future cash flows (coupon payments and face value), equal to its current price.

It represents the expected return of an investment in a bond if the investor holds the bond until maturity.

The IRR can be used to compare the return of different bonds with different coupon rates, maturities, and risk levels. It is also a useful tool for determining the optimal price to pay for a bond to achieve a target return.

**Example:**

Suppose a 20-year zero-coupon bond with a face value of $1,000,000 is selling for $455,500. What is the yield to maturity on this bond? (assumes that we use annual compounding)

$$
455,500 = 1,000,000 / (1+r)^{20} \\
r = 0.0401
$$