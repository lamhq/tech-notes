# Review of Elementary Finance Tools

## 1

Bob and Jane Loveboat are saving to buy a boat at the end of 5 years. If the boat costs $25,000, and they can earn 8 percent a year on their savings, how much do they need to put aside at the end of every year 1 through 5? Round off your final answer to three digits after the decimal point. State your answer as 'x.xxx'

*Answer:*

You need to find the amount they need to set aside every year such that the annual savings, invested at 8 percent a year, accumulate to $25,000. That is, you have an annuity of $C with the future value at t =5 equal to $25,000. Recall that the formula for the future value of an annuity is given by:

$$
V_T = C \times ACF(r, n)
$$

$$
25,000 = C \times ACF(0.08, 5)
C = 4,261.411
$$


## 2

You made your fortune in the dot-com boom (and got out in time!) As part of your legacy, you would like to endow an annual scholarship at your alma mater. You want it to be memorable, so you would like the scholarship to be $20,000 per year. If the university earns 8% on its investments, and if the first scholarship is to be given out in one year’s time, how much will you need to donate to create the scholarship fund? Round your final answer to the nearest dollar.

*Answer:*

You need to find the present value of an investment that generates $20,000 per year forever. This is the present value of a perpetuity:

$$
V_0 = C / r
$$

$$
V_0 = 20,000 / 0.08 = 250,000
$$


## 3

Assuming that the annual interest rate is 7%, how much would you pay to receive $100 every year, growing at 5%, annually, forever? Round off your final answer to the nearest dollar.

*Answer:*

This is the present value of a growing perpetuity. Recall,

$$
V_0 = C/(r−g)
$$

$$
V_0 = 100 / (0.07 - 0.05) = 5,000
$$


## 4

What is the future value three years from now of $1000 invested in an account with a stated annual interest rate of 8%, if compounded semi-annually? Round off your final answer to three digits after the decimal. State your answer as 'x.xxx'

*Answer:*

$$
V_T = 1000 × (1 + 0.08/2)6 = 1,265.319
$$


## 5

What is the future value three years from now of $1000 invested in an account with a stated annual interest rate of 8%, if compounded monthly? Round off your final answer to three digits after the decimal point. State your answer as 'x.xxx'

*Answer:*

$$
V_T = 1000 × (1 + 0.08/12)36 = 1,270.237
$$


## 6

You want to lease a set of golf clubs from Holes, Ltd. The lease contract is in the form of 24 equal monthly payments at a 12 percent, compounded monthly. Since the clubs cost $4,000 retail, Holes wants the present value of the lease payments to equal $4,000. Suppose you first payment is due immediately. What will your monthly lease payment be? Round off your final answer to one digit after the decimal point. State your answer as 'x.x'

*Answer:*

Recall, that the present value of an annuity gives us the present value of a stream of equal payments, with the first one at the end of the period. In this case, the first payment is immediately due. So, we are looking for an annuity such that the present value of 23 payments of $C at 12 percent. compounded monthly.

$$
C + C \times ADF(r,n) = 4,000 \\
C + [ 1 + ADF(0.01,23) ] = 4,000 \\
C = 186.42959
$$


## 7

You want to retire a millionaire when you are 65. Currently, you have $20,000 in savings and are 30 years old. How much will you have to save each year for the next 35 years in order to have $1,000,000? Assume you earn 9% on your savings every year. Round off your final answer to three digits after the decimal point. State your answer as 'x.xxx'

*Answer:*

Note that you already have $20,000 in savings. First, let’s find the $V_35$ of $20,000 in 35 years.

$$
V_35 = 20000 × (1.09)35 = 408,279.358
$$

So, you need an additional $1,000,000−$408,279 = $591,721

What is the annual savings? Well, we can use the annuity formula such that the future value equals $591,721.

$$
V35 = 591721 = (C/0.09)×[(1.09)35 – 1] \\
C = 2,743.121
$$


## 8

You decide to buy a home for $100,000. You approach two banks for financing. If you want to minimize your monthly payments, which one would you choose?

a. Bank #1 requires a 10% down payment and requires monthly payments on a 20-year mortgage sufficient to earn it an effective annual return of 8%.

If the effective annual rate is 8%, then we can first solve for the monthly rate.

$$
(1+r/12)12 = 1.08
$$

Solving for r = 0.64%

The mortgage payments can then be found using the present value of an annuity such that

$$
V_0 = 100,000 \times 0.90 = 90,000 = C \times ADF(r = 0.64\%, n = 240)
$$

$C=737.23$. This is the lowest.

b. Bank #2 also needs a 10% down payment and also has a 20-year mortgage, but quotes a 8% annual rate which is compounded monthly.

The mortgage payments can then be found using the present value of an annuity such that

$$
V_0 = 100,000 x 0.90 = 90,000 = C x ADF(r = 8\%/12, n = 240).
$$

$C = 752.796$. This is not the lowest.


## 9

Leeds Autos has just announced its new promotional deal on the new $45,000 Z4 Roadster. You pay $5,000 down, and then $1000 for the next 40 months. Its next door competitor, Chatham Hill Autos will give you a $3000 off the list price straight away. If the interest rate is 6% a year, which company is giving a better deal?

1. Leeds Autos
2. Chatham Hill Autos

*Answer:*

The correct answer is **a**.

You need to compare the present value of the two streams of payments, paying $42,000 today, vs. paying $5000 today, plus $1000 for the next 40 months. Note that the payments are monthly, so we need to use the monthly rate of 6%/12 = 0.5%.

The present value of Leeds Autos offer is:

$$
V_0 = 5000 + 1000 × ADF(r = 0.5\%, n = 40) \\
V_0 = 5000 + 1000 × [(1 – (1/(1.005)40))]/0.005 = 41,172.228
$$

The present value of Chatham Hill Autos offer: $45,000 - $3000 = $42,000. Therefore, Leeds Autos offer is better.


## 10

Your parents make you the following offer: They will give you $5000 at the end of every six months for the next five years if you agree to pay them back $5000 at the end of every six months for the following ten years. Should you accept this offer if your opportunity cost of funds is 18% per year, compounded semiannually?

*Answer:*

The correct answer is a.

Notice that the two alternatives are both annuities that start at different points in time. In order to compare them, you need to value both cash flow streams at the same point in time. Also note that the interest rate of 18% is compounded semiannually so make sure you use the appropriate interest rate.

Let’s first find the present value of what your parents will give you: 

$$
V0 = (5000/0.09) × [1 – (1/(1.09)10] = 32,088
$$

Let’s now compute the present value of what you will pay them:

$$
V0 =( (5000/0.09) × [1 – (1/(1.09)20] ) × (1/1.09)10= 19,279.98
$$

Yes, this is a sweet offer. Accept!