# Measures of Relationship between Variables

## Covariance

Let take an example, we have a list of houses, including their size and price:

We say that the two variables: size and price are correlated. The statistic to measure this correlation is called **covariance**.

- If covariance > 0, the two variables move together
- If covariance < 0, the two variables move in opposite directions
- If covariance = 0, the two variables are independent

Population formula:

$$
\sigma_{xy} = \frac{\sum_{i=1}^N(x_i-\mu_x)*(y_i-\mu_y)}{N}
$$

Sample formula:

$$
S_{xy} = \frac{\sum_{i=1}^N(x_i - \overline{x})*(y_i - \overline{y})}{n - 1}
$$


## Correlation Coefficient

Correlation adjust Covariance so that the relationship between the two variables becomes easy and intuitive to interpret.

The correlation value is greater than 1 or less than -1.

- **1**: perfect positive correlation, means the entire variability of one variable is explained by the other.
- **0**: two variables are absolutely independent variables.
- **-1**: perfect negative correlation, e.g.: icecream sale and umbrella sale.

The correlation between two variables $x$ and $y$ is the same as the correlation between $y$ and $x$. 

The correlation does not imply **causation**. E.g: In the housing business, size causes the price, and not vice versa.

A common practice is to disregard correlations that are below $0.2$.

Population Formula:

$$
\frac{\sigma_{x, y}}{\sigma_x\sigma_y}
$$

Sample formula:

$$
\frac{S_{x, y}}{S_xS_y}
$$
