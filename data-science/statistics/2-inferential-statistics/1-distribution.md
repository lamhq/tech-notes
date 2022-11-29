# Distribution

A distribution is a function that shows the possible values for a variable and how often they occur.

E.g., the numbers when rolling a die:

| Outcome          | Probability |
|------------------|-------------|
| 1; 2; 3; 4; 5; 6 | 0.17        |
| All else         | 0           |

## Discrete Uniform Distribution

All outcomes have an equal chance of occurring.

![](https://study.com/cimages/multimages/16/dvisual3_resized.png)


## Normal distribution

Reasons to study Normal distribution:

- Normal distribution approximate a wide variety of random variables
- Distributions of **sample means** with large enough sample sizes could be approximated to normal
- All computable statistics are elegant
- Decisions based on Normal distribution insights have a good track record.

$$
N \sim (\mu, \sigma^2)
$$

A lower mean would result in the same shape of the distribubtion, but move it to the left side of the graph. A bigger mean would move the graph to the right.

![](https://media.nagwa.com/816171848506/en/thumbnail_l.jpeg)

Changing the standard deviation would not move the graph but reshape it. A lower standard deviation results in a lower dispersion, more data in the middle and **thinner tails**. A higher standard deviation causes the graph to flatten out, less points in the middle and more to the end, **fatter tails**.


## Central limit theorem

Imagining an experiment may help you to understand **sampling distributions**:

- Suppose that you draw a random sample from a population and calculate a statistic for the sample, such as the mean.
- Now you draw another random sample of the same size, and again calculate the mean.
- You repeat this process many times, and end up with a large number of means, one for each sample.

The distribution of the sample means is an example of a sampling distribution.

The central limit theorem says that the sampling distribution of the mean will always be normally distributed, as long as the sample size is large enough (regardless of whether the population has a normal, Poisson, binomial, or any other distribution, the sampling distribution of the mean will be normal).

$$
\overline{X} \sim N(\mu, \frac{\sigma}{\sqrt{n}})
$$

- $\overline{X}$: the sampling distribution of the sample means
- $\sim$ means "follows the distribution"
- $N$: the normal distribution
- $\mu$: the mean of the population
- $\sigma$: the standard deviation of the population
- $n$: the sample size

The central limit theorem states that the sampling distribution of the mean will always follow a normal distribution under the following conditions:

1. The sample size is sufficiently large. This condition is usually met if the sample size is $n \geq 30$.
1. The samples are independent and identically distributed (i.i.d.) random variables. This condition is usually met if the sampling is random.
1. The population’s distribution has **finite variance**. Central limit theorem doesn't apply to distributions with infinite variance, such as the Cauchy distribution. Most distributions have finite variance.

CLT allows us to perform tests, solve problems and make inferences using the normal distribution even when the population is not normally distributed.


## Standard error

The standard error is the standard deviation of the distribution (formed by the sample means)

$$
\text{standard error} = \frac{\sigma}{\sqrt{n}}
$$

Standard error show us the variability of the means of the different sample we extracted from the population. It show us how well you approximated the true mean.

Standard error decreases when sample size increases.