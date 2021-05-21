# Basic

## Introducing pandas

pandas is a Python library that help Python programmers to perform powerful data analysis.

Python has long been exceptional for data munging and preparation, but less so for data analysis and modeling. pandas helps fill this gap, enabling you to carry out your entire data analysis workflow in Python


## Data manipulation, analysis, science, and pandas

### Data manipulation

Data is distributed all over the planet. It is stored in different formats. It has widely varied levels of quality. Because of this there is a need for tools and processes for pulling data together and into a form that can be used for decision making. This requires many different tasks and capabilities from a tool that manipulates data in preparation for analysis. The features needed from such a tool include:

- Programmability for reuse and sharing
- Access to data from external sources
- Storing data locally
- Indexing data for efficient retrieval
- Transformation of data into other representations Cleaning data from cruft
- Effective handling of bad data
- Grouping data into common baskets
- Aggregation of data of like characteristics
- Application of functions to calculate meaning or perform transformations
- Query and slicing to explore pieces of the whole
- Restructuring into other forms
- Modeling distinct categories of data such as categorical, continuous, discrete, and time series
- Resampling data to different frequencies

There are many data manipulation tools in existence. These tools include relational databases (SQL Server, Oracle), spreadsheets (Excel), event processing systems (such as Spark), and more generic tools such as R and pandas.


### Data analysis

Data analysis is the process of creating meaning from data. Data with quantified meaning is often called information. Data analysis is the process of creating information from data through the creation of data models and mathematics to find patterns.


### Data science

Data science is the process of using statistics and data analysis processes to create an understanding of phenomena within data. Data science usually starts with information and applies a more complex domain-based analysis to the information. These domains span many fields such as mathematics, statistics, information science, computer science, machine learning, classification, cluster analysis, data mining, databases, and visualization.

### Where does pandas fit?

pandas first and foremost excels in data manipulation. But pandas does provide several features for performing data analysis. pandas itself is not a data science toolkit. It is more of a manipulation tool with some analysis capabilities.

## The process of data analysis

### Ideation

This is referred to as ideation, of coming up with an idea of what we want to do and prove. Ideation generally relates to hypothesizing about patterns in data that can be used to make intelligent decisions.

### Retrieval

Once you have an idea you must then find data to try and support your hypothesis. This data can come from within your organization or from external data providers.

pandas provides a robust and easy-to-use set of tools for retrieving data from various sources and that may be in many different formats.

### Preparation

Data is fraught with all kinds of issues related to quality:

- The data is simply incorrect
- Parts of the dataset are missing
- Data is not represented using measurements appropriate for your analysis The data is in formats not convenient for your analysis
- Data is at a level of detail not appropriate for your analysis
- Not all the fields you need are available from a single source
- The representation of data differs depending upon the provider

pandas provides many great facilities for preparing data, often referred to as tidying up data: handling missing data, converting data types, using format conversion, changing frequencies of measurements, joining data from multiple sets of data, mapping/converting symbols into shared representations, and grouping data, among many others.

### Exploration

Exploration involves being able to interactively slice and dice your data to try and make quick discoveries. Exploration can include various tasks such as:

- Examining how variables relate to each other
- Determining how the data is distributed
- Finding and excluding outliers
- Creating quick visualizations
- Quickly creating new data representations or models to feed into more permanent and detailed modeling processes

Exploration is one of the great strengths of pandas.

### Modeling

In the modeling stage you formalize your discoveries found during exploration into an explicit explanation of the steps and data structures required to get to the desired meaning contained within your data. This is the model, a combination of both data structures as well as steps in code to get from the raw data to your information and conclusions. The models you create are executable.

### Presentation

The penultimate step of the process is presenting your findings to others, typically in the form of a report or presentation. This can often be done using various plotting tools in Python and manually creating a presentation.

Jupyter notebooks are a powerful tool in creating presentations for your analyses with pandas.

### Reproduction

An important piece of research is sharing and making your research reproducible. This can be done by sharing the Python code that drives your pandas code, as well as the data. Jupyter notebooks also provide a convenient means of packaging both the code and application in a means that can be easily shared with anyone else with a Jupyter Notebook installation.


## Types of data

### Structured

Structured data is any type of data that is organized as fixed fields within a record or file, such as data in relational databases and spreadsheets.

### Unstructured

Unstructured data is data that is without any defined organization and which specifically does not break down into stringently defined columns of specific types. This can consist of many types of information such as photos and graphic images, videos, streaming sensor data, web pages, PDF files, PowerPoint presentations, emails, blog entries, wikis, and word processing documents.

### Semi-structured

Semi-structured data fits in between unstructured. It can be considered a type of structured data, but lacks the strict data model structure. JSON is a form of semi-structured data.

## Variables

When modeling data in pandas, we will be modeling one or more variables and looking to find statistical meaning amongst the values or across multiple variables. This definition of a variable is not in the sense of a variable in a programming language but one of statistical variables. A variable is any characteristic, number, or quantity that can be measured or counted.

Stock value, age, sex, business income and expenses, country of birth, capital expenditure, class grades, eye color, and vehicle type are examples of variables.

### Categorical

A categorical variable is a variable that can take on one of a limited, and usually fixed, number of possible values. Examples of categorical variables are gender, social class, blood types, country affiliations, observation time, or ratings such as Likert scales.

### Continuous

A continuous variable is a variable that can take on infinitely many values. Examples of continuous variables include height, time, and temperature.

### Discrete

A discrete variable cannot be a fractional value between any two variables. Examples of discrete variables include the number of registered cars, number of business locations, and number of children in a family, all of which measure whole units (for example 1, 2, or 3 children).

## General concepts of analysis and statistics

### Quantitative versus qualitative data/analysis

Qualitative analysis is the scientific study of data that can be observed but cannot be measured. Examples of qualitative data can be: The softness of your skin, how elegantly someone runs.

Quantitative analysis is the study of actual values within data, with real measurements of items presented as data. Normally, these are values such as: Quantity, Price, Height

### Single and multivariate analysis

Statistics, from a certain perspective, is the practice of studying variables, and specifically the observation of those variables. Much of statistics is based upon doing this analysis for a single variable, which is referred to as univariate analysis. Univariate analysis is the simplest form of analyzing data.

Multivariate analysis is a modeling technique where there exist two or more output variables that affect the outcome of an experiment. Multivariate analysis is often related to concepts such as correlation and regression, which help us understand the relationships between multiple variables, as well as how those relationships affect the outcome.

### Descriptive statistics

Descriptive statistics are functions that summarize a given dataset, typically where the dataset represents a population or sample of a single variable (univariate data).

For example, the following are descriptive statistics:
- The distribution (for example, normal, Poisson)
- The central tendency (for example, mean, median, and mode)
- The dispersion (for example, variance, standard deviation)

### Inferential statistic

Inferential statistics differs from descriptive statistics in that inferential statistics attempts to infer conclusions from data instead of simply summarizing it.

### Stochastic models

The purpose of a stochastic model is to estimate the chance that an outcome is within a specific forecast to predict conditions for different situations.

### Probability and Bayesian statistics

A conditional probability is simply the probability of event A given that event B has occurred. Therefore, in probability terms, the data events have already occurred and have been collected (since we know the probability). By using Bayes' theorem, we can then calculate the probability of various things of interest, given or conditional upon, this already observed data.

### Correlation

A correlation is a single number that describes the degree of relationship between two variables, and specifically between two sequences of observations of those variables.

A common example of using a correlation is to determine how closely the prices of two stocks follows each other as time progresses. If the changes move closely, the two stocks have a high correlation, and if there is no discernible pattern they are uncorrelated. This is valuable information that can be used in a number of investment strategies.

### Regression

Regression is a statistical measure that estimates the strength of relationship between a dependent variable and a series of other variables. It can be used to understand the relationships between variables.