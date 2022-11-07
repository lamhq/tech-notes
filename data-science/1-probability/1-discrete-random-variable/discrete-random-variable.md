# Discrete Random Variables

## Definition

A random variable assigns a single numerical value to every basic outcome.

A discrete random variable $X$ can take on a list of possible values.

Example: the sum of two dice when rolling two fair dice.


## Probability of a random variable

The probability that the random variable $X$ takes on a specific value $x$ is called $P(X=x)$.

$$
P(X=2) = 1/36 \\
P(X=3) = 2/36 \\
$$

$$
P(X=x) = 0 \qquad x\text{ not in \{2, 3, 4, ..., 12\}}
$$

## Cumulative probability

Cumulative probability is the probabiliy of the random variable X takes on a specific value xx for numbers less than or equal to $x$.

$$
F(x) = P(X \leq x)
$$

| X  | P(X=x)      | F(x)        |
|----|-------------|-------------|
| 2  | 0.027777778 | 0.027777778 |
| 3  | 0.055555556 | 0.083333333 |
| 4  | 0.083333333 | 0.166666667 |
| 5  | 0.111111111 | 0.277777778 |
| 6  | 0.138888889 | 0.416666667 |
| 7  | 0.166666667 | 0.583333333 |
| 8  | 0.138888889 | 0.722222222 |
| 9  | 0.111111111 | 0.833333333 |
| 10 | 0.083333333 | 0.916666667 |
| 11 | 0.055555556 | 0.972222222 |
| 12 | 0.027777778 | 1           |


## Expected Value

Mean (or Expected Value) of a discrete random variable $X$ is the probability-weighted sum of all possible values.

$$
\mu = E(X) = x_1p(x_1) + x_2p(x_2) + ... + x_kp(x_k)
$$

### Example 1: rolling dice

if you roll a fair die many many times, then the average of the numbers will get close to the mean $\mu$, which is $3.5$.

$$
\mu = E(X) = 1 \times \frac{1}{6}
  + 2 \times \frac{1}{6}
  + ... + 6 \times \frac{1}{6}
  = 3.5
$$

### Example 2: Car insurrance

An insurrance company offers two packages:

- **Normal**: in case I have an accident, carries a deductible of 800 Euros. That means, if I have an accident, the first 800 Euros of damage, I have to pay.
- **Extra**: for an extra fee of 84 Euros, I could buy a deductible of 100 Euros. So I could decrease my deductible by 700 Euros.

Should I buy the **extra insurrance**?

*Answer:*

- Let call $p$ the probability of an accident.
- There's a random variable $X_1$, which is my accident payment without extra insurrance.
- $X_2$ is my accident payment with extra insurrance.

Without extra insurrance, i pay:

$$
E(X_1) = 800 \times p + 0 \times (1-p) = 800p
$$

With extra insurrance:

$$
E(X_2) + 84 = 100 \times p + 0 \times (1-p) + 84 = 100p + 84
$$

I should buy the extra insurrance if the cost of buying extra insurrance is smaller:

$$
\begin{align*}
&E(X_2) + 84 < E(X_1) \\
&\Rightarrow 100p + 84 < 800p \\
&\Rightarrow p > 0.12
\end{align*}
$$

So, if i think my probability accident is larger than $12\%$, then i should buy the extra insurrance.

About the company, they have the data, so they know the average probability of accident is smaller than that. So they're happy to offer that extra insurrance.


### Example 3: Roulette game

There're 37 numbers:
- $0$ gets the color green
- $18$ red numbers
- $18$ black numbers

Let say you bet on a color red that have $18$ numbers, you get $1$ extra chip if you win. If, however, the green $0$ or one of the $18$ black numbers appears then you'll lose your chip.

**How much money will you win or lose on average?**

Here we have a random variable $B$, for your bet. And there are two possible value: You win one $1$. Or you lose one $-1$.

$$
\begin{align*}
P(B=1) &= 18/37 \\
P(B=-1) &= 19/37 \\
E(B) &= 1 \times \frac{18}{37} + (-1) \times \frac{19}{37} &= \frac{-1}{37} = -0.027027
\end{align*}
$$

So, on average, you will lose money with this bet, about $0.027$ chips. In the language of gambling, what this means is the so called house advantage. On average, the casino wins money.


## Variance & Standard Deviation

Variance of a discrete random variable is the probability-weighted sum of all possible squared deviations from the mean.

$$
\begin{align*}
\sigma^2 &= Var(X) \\
  &= E((X - \mu)^2) \\
  &= (x_1-\mu)^2p(x_1) + (x_2-\mu)^2p(x_2) +... + (x_k-\mu)^2p(x_k)
\end{align*}
$$

Standard Deviation is the square root of the variance $\sigma$.


## Bernoulli Distribution

Bernoulli distribution is the discrete probability distribution of a random variable $X$ which takes the value $1$ (success) with probability $p$ and the value $0$ (fail) with probability $q=1-p$.

$$
P_X(x) = \begin{cases}
  p &\text{for }x = 1 \\
  1 - p &\text{for }x = 0 \\
  0 &\text{otherwise}
\end{cases}
$$

$$
E(X) = μ = 1×p + 0×(1-p) = p
$$

$$
\begin{align*}
var(X)  &= σ^2 \\
        &= (1-p)^2 × p + (0-p)^2 × (1-p) \\
        &= p(1-p)
\end{align*}
$$


## Binomial Distribution

When you repeat a Bernoulli random variable over and over again, this is now called Bernoulli trials, all the individual trials are independent.

We have a random variable $X$ (number of success) that is the whole sum of all  Bernoulli random variables.

$$
X = B_1 + B_2 + ... + B_3
$$

We say $X$ has **binomial distribution**. It depends on two parameters:

- `n`: how many repetitions of the trial do I have?
- `p`: the probability of the success.

$$
B(n, p)
$$

$$
\begin{align*}
E(X)  &= E(B_1 + B_2 + ... + B_n) \\
      &= p + p + ... + p \\
      &= np
\end{align*}
$$

$$
\begin{align*}
var(X)  &= var(B_1 + B_2 + ... + B_n) \\
        &= p(1-p) + p(1-p) + ... + p(1-p) \\
        &= np(1-p)
\end{align*}
$$

The probability for $X$ to have the value $k$ is calculated as follow:

$$
P_n(k) = C_n^kp^kq^{n-k}
\qquad
k = 0, 1, 2, ..., n
$$

**Công thức excel**:

$$
P(X=k) = \text{BINOM.DIST}(k, n, p, \text{FALSE})
$$
$$
f(k) = P(X \le k) = \text{BINOM.DIST}(k, n, p, \text{TRUE})
$$

**Python**:

```py
from scipy import stats
pk = stats.binom.pmf(k, n, p)
```

```py
# calculate probability for a range of outcome
from scipy import stats
import numpy as np
n = 5
p = 0.1
k = np.arange(n+1)
sum(stats.binom.pmf(k, n, p))
```

**Example:**

Let's say you flip the coin five times, what's the probability that we get two heads?

$$
P(X=2) = \text{BINOM.DIST}(2, 5, 0.5, \text{FALSE}) = 0.3125
$$


## Application: Airline Overbooking

Airlines may actually sell more tickets than the number of seats they have. Because people may cancel a flight, just a couple hours before it's supposed to take off, and they still may get a substantial refund. At this point, the aircraft may leave with empty seats. That's bad for the airlines, because there's lost revenue.

So, the airlines wants to get extra revenues and one way is to do airline over booking, that's the benefit.

The cost on the other hand is now when too many people show up. Now you have to buy some people out of traveling, either by giving them vouchers. Or in the worst case, if you don't have enough volunteers who take vouchers, you have to kick off people. That cost you money directly. And in general, you have customer dissatisfaction.

**So the question now is, what's the best behavior of airlines?**

Now, for the sake of this discussion, we make a simplifying assumption: "all people make the decision of whether to show up or not at the airplane independently, versus same probability $p$". This independence of course is not quite correct.

With that assumption, we can use the binomial distribution.

We have the inputs:

- number of seats: $200$
- price of a ticket: $300$
- the cost to handle an overbooked passenger: $500$
- the probability of a person won't show up: $0.07$ $(1-p)$
- number of tickets: 200 ($n$)

Let's call $X$ is the number of people show up, $X$ is a random variable that has binomial distribution.

$$
\begin{align*}
E(X) = np \\

\text{revenue} &= \text{price} \times \text{show up} - \text{cost} \times \text{overbook} \\
  &= \text{price} \times \text{show up} - \text{cost} \times \text{max}(0, \text{show up} - \text{seats}) \\

E(\text{revenue}) &= \text{price} \times E(\text{show up}) - \text{cost} \times \text{max}(0, E(\text{show up}) - \text{seats}) \\
  &= \text{price} \times E(X) - \text{cost} \times \text{max}(0, E(X) - \text{seats}) \\
  &= price \times n \times p - \text{cost} \times \text{max}(0, (n \times p)  - \text{seats})
\end{align*}
$$

Let's say we sell $200$ tickets, the average revenue is $\$55,800$.

To maximize revenue ($E(X) = \$60,000$), the number of tickets to sell is $215$. We can prove that by plotting the revenue in the Excel sheet.


## References

- [An Intuitive Introduction to Probability](https://www.coursera.org/learn/introductiontoprobability/home/week/1)
- [Introduction to Probability, Statistics, and Random Processes by Hossein Pishro-Nik](https://www.probabilitycourse.com/videos/videos.php)
