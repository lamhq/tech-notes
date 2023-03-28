# Multi-factor models

## CAPM and its Limitations

CAPM has significant limitations, as hundreds of empirical studies have shown that its predictions are incorrect.

Specifically, CAPM predicts that expected returns or the risk premium on an asset should depend only on the asset's beta, and the market portfolio risk is the only risk that matters. 


## Extending the Intuition of CAPM with Multi-Factor Models

To overcome the limitations of CAPM, we can extend its basic intuition to think about risk and include other sources of risk. This leads us to the topic of multi-factor models. 

We will discuss factor theory and factor models in general, which help define bad times for the average investor. We can think of factors as each defining a set of bad times for the average investor. CAPM is also an example of a factor model where the risk factor is simply the market factor.


## Defining "Bad Times" and Factors

To help understand multi-factor models, we need to define "bad times." Investors should be compensated for bearing systemic risk, which is the only risk they cannot diversify away.

If the different sources of systematic risk are too complicated to be captured by a single market beta, then there may be multiple risk factors to consider. These natural candidates for bad times include economic recessions, low consumption growth, financial crises, high inflation, and high uncertainty or volatility periods. 

Factors are systematic variables that affect the return of all assets and cannot be diversified away. They drive the risk premiums on assets, and exposure to these factors is what makes investors earn risk premiums.

Factors can be macro factors like economic growth, inflation, and volatility, as well as dynamic or investment factors like value and growth or momentum.


## Fama-French three-factor model

The most commonly used multi-factor model in finance. 

The Fama-French three-factor model is a parsimonious model that captures the size and value effects. The model extends the CAPM by adding two additional factors - one size factor to account for the size effects, and a value factor to account for the value growth effect.

### Size Effect

The size effect refers to the fact that small-cap stocks have tended to do better than large-cap stocks even after adjusting for their CAPM betas. In contrast, larger stocks' returns cannot be explained by higher market risk. 

The size effect has dissipated significantly since its discovery.

The size effect refers to the fact historical average returns on stocks with small capitalization are higher than predicted by the Capital Asset Pricing Model.

The size factor is captured by the return on a  zero-net-investment portfolio that is constructed by going long the small-cap and going short large-cap stocks.


### Value Effect

Value stocks on average outperform growth stocks. Value stocks are those with low prices relative to their book value or high book-to-market equity ratios. Growth stocks, on the other hand, have high prices relative to their book value or low book-to-market equity ratios. 

High book-to-market stocks are called value assets because, for the large part, their market values derive from assets in place – the book value of the assets are high relative to their market value.

Low book-to-market stocks are called growth assets because the market value of their assets is high relative to their value, indicating that the value is coming from expected growth in future cash flows – that is, one anticipates growth to justify the current market value of the assets.

The HML factor in the Fama-French three-factor model is constructed by going long in high book-to-market stocks and going short in low book-to-market stocks.


### "Going short" and "going long"

"Going short" and "going long" refer to two different strategies that investors can use when trading assets. 

- Going long means buying an asset with the expectation that its value will increase over time. 

- Going short means selling an asset that you do not own with the expectation that its value will decrease over time. To go short, an investor borrows shares of the asset from a broker and sells them in the market. Later, the investor buys back those shares to return them to the broker, hoping that the price has fallen, allowing them to profit from the difference between their sale price and their repurchase price.

In both cases, the ultimate goal is to earn a profit from the investment, but the strategies are different depending on whether the investor thinks the asset's value will increase (long) or decrease (short).


### Fama-French Three-Factor Model equation

According to the Fama-French three-factor model, the expected return on an asset is calculated by adding the risk-free rate to the market beta times the market risk premium, plus the asset's exposure to the size factor times the return on the SMB, plus the exposure of the asset to the value factor times the return on the HML factor.

$$
r = r_f + \beta_m(r_m-r_f) + \beta_{SMB}(SMB) + \beta_{HML}(HML)
$$

- SMB (Small Minus Big) = Historic excess returns of small-cap companies over large-cap companies
- HML (High Minus Low) = Historic excess returns of value stocks (high book-to-price ratio) over growth stocks (low book-to-price ratio)


### SMB and HML

SMB refers to small minus big stocks and is constructed to capture the size effect.

HML refers to high book-to-market minus low book-to-market stocks and captures the value effect. 


### Debate over Risk Factors

It is still debated whether the size and value factors are indeed risk factors. While CAPM provides a theory of why market risk should be priced, Fama-French factors do not have an obvious economic reason behind them. 

Fama and French argue that smaller firms earn a risk premium because they are riskier and may have greater difficulty surviving recessionary periods.

They also argue that value stocks are riskier and that the value factors may be a proxy for financial distress. However, some explanations for these factors are behavioral. 
