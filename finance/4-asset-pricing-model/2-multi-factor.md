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

### Value Effect

Value stocks on average outperform growth stocks. Value stocks are those with low prices relative to their book value or high book-to-market equity ratios. Growth stocks, on the other hand, have high prices relative to their book value or low book-to-market equity ratios. 

### Fama-French Three-Factor Model equation

According to the Fama-French three-factor model, the expected return on an asset is calculated by adding the risk-free rate to the market beta times the market risk premium, plus the asset's exposure to the size factor times the return on the SMB, plus the exposure of the asset to the value factor times the return on the HML factor.

$$
r = r_f + \beta_m(r_m-r_f) + \beta_{SMB}(SMB) + \beta_{HML}(HML)
$$

- SMB (Small Minus Big) = Historic excess returns of small-cap companies over large-cap companies
- HML (High Minus Low) = Historic excess returns of value stocks (high book-to-price ratio) over growth stocks (low book-to-price ratio)


### SMB and HML

SMB refers to small minus big stocks and is constructed to capture the size effect. HML refers to high book-to-market minus low book-to-market stocks and captures the value effect. 


### Debate over Risk Factors

It is still debated whether the size and value factors are indeed risk factors. While CAPM provides a theory of why market risk should be priced, Fama-French factors do not have an obvious economic reason behind them. 

Fama and French argue that smaller firms earn a risk premium because they are riskier and may have greater difficulty surviving recessionary periods.

They also argue that value stocks are riskier and that the value factors may be a proxy for financial distress. However, some explanations for these factors are behavioral. 
