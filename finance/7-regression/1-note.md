# Regression analysis

Regression analysis quantifies the relationship between a variable called dependent variable and one or more explanatory (independent) variables.

Regression analysis can be handy when we want to forecast a future dependent variable with the help of patterns from our historical data.

Example: the larger the house, the higher its price. The explanatory variable is **size** and it helps us explain why certain houses cost more. The dependent variable is **price**.

The basic reasoning is that if we know the value of the explanatory variable, we can determine the expected value of the dependent variable.

Types of regression:

- Simple regression: only use one (explanatory) variable
- Multivariate regression: using more than one variable

## Simple regression

Regression analysis assumes the existence of a linear relationship between the two variables.

One straight line help us describe the rapport between all the data points we see in the plot.

![](https://www.reneshbedre.com/assets/posts/reg/reg_front.svg)

Formula

$$
y = \alpha + \beta x  + \text{error}
$$

- $\beta$: slope
- $\alpha$: y-intercept

The best-fitting line is a line that minimizes the **error** observed between itself and actual observations.

When we talk about sample observations, the errors are called **residuals**. The distance between the line and observations give us residuals.

The best-fitting line minimizes the sum of the squared residuals.

## R square

**Are all regressions created equal?**

There can be more than one explanatory variables (for example: location, neighborhood, year of construction that determine price of a house).

Certain variables are better at predicting other variables.

Some regressions have higher explanatory power than others.

**R square** is a tool that allow us to distinguish regressions with good, reasonable and poor explanatory power.

$$
R^2 = 1 - \frac{SSR}{TSS}
$$

- $R^2$: coefficient of determination
- $SSR$: sum of squares of residuals. The distance from regression line to each data point. $\sum{(x - \hat{x})^2}$
- $TSS$: total sum of squares. The sum of the distance the data is away from the mean all squared $\sum{(x - \overline{x})^2}$

R square varies between $0\%$ - $100\%$. The higher it is, the more predictive power the model has (at least 30% to be a solid indicators).