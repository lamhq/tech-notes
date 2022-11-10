# Machine Learning for Absolute Beginners

## Overview of Data Science

Data science is a broad umbrella term that encompasses a number of disciplines and concepts including big data, artificial intelligence (AI), data mining and machine learning. The discipline of studying large volumes of data is known as "data science"

Big data analytics is an independent discipline that processes big data with the used of advanced algorithms based on a starting hypothesis. An example of a big data analytics’ hypothesis could be: A relationship between the ambience (measured in decibels) at Manchester United home games played at Old Trafford and the likelihood of the home team coming from behind to win.

Data mining involves applying advanced algorithms to unearth previously unknown relationships, patterns and regularities from a very large data set. Data mining is therefore similar to big data analytics but is different in that it doesn’t have a starting hypothesis.

Artificial intelligence is a grouping of several techniques including machine learning.

Machine learning algorithms have existed for virtually two decades but only in recent times has computing power and data storage caught up to make machine learning so widely available.

Machine learning focuses on developing algorithms that can learn from the data and make subsequent predictions. For example, when you type in to Google *"machine learning"*, it pops up with a list of search results.


## Big Data

Big data is used to describe a data set. In other words, big data is a collection of data that would be virtually impossible for a human to make sense of without the help of a computer.

Big data is reliant on technology to be managed and analyzed. Data sets are becoming increasingly bigger as we find new ways to efficiently collect and store data at low cost.

Big data is the power to process very larger sets of data to unearth information never seen before with the aid of computers.

Big data analytics or data mining can then be applied to clean up and analyse the data to analyze or uncover interesting variables and gain insight from the trove of information collected.

However, it's important to remember that big data is not a technique or process in itself. It is a noun to describe a lot of data.

Also, you don’t necessarily have to have troves of data to conduct machine learning and data mining. Both machine learning and data mining techniques can be applied to a modest source of data found on an Excel spread sheet.

However in order to find valuable insight, big data provides a rich new source of data to extract value from, which would not be possible from a smaller data set.


## Machine Learning

Machine learning is a discipline of data science that applies statistical methods to improve performance based on previous experience or detect new patterns in massive amounts of data.

If properly configured, machine learning algorithms are capable of learning and recognising new patterns within a matter of minutes.

But machine learning naturally doesn't just start by itself, there needs to be a human to program and supervise the automated process. This is where data scientists and data professionals come into the picture.

The role of data scientists is to configure the equipment (servers, operation systems and databases) and architecture (how the equipment interacts with each other) as well as programming algorithms using various mathematical operations.


## Data Mining

Data mining, as mentioned, is a data science discipline that aims to unearth previously unknown relationships, patterns and regularities from large data sets, and does not start with a set hypothesis.

A big question for people new to data science is: What's the difference between "data mining" and "machine learning"?

At a very abstract level, both are concerned with analyzing data and extracting valuable insights.

Whereas machine learning uses algorithms to improve with experience at a given task, data mining focuses on analyzing data to discover previously unseen patterns or properties and applies a more broad range of algorithms.

Machine learning concentrates on studying and reproducing specifically known knowledge, whereas data mining is exploratory and searches for unknown knowledge.


## Machine Learning Case Studies

### Online Advertising

Ever wondered how Facebook, YouTube or Amazon can see into your brain and know what you want?

YouTube for example processes your previous online activities and applies an algorithm to populate ads within your browser whenever you visit YouTube. Through pooling data from various sources such as Google search queries, YouTube is able to know what you like.

The ads displayed to you should also be different to your colleague or classmate sitting next to you, as it is based on the unique data collected of each user. YouTube also doesn’t know what each user likes until they apply machine learning techniques to learn from the data and draw out insight.


## Google's Machine Learning

But Google’s new algorithm – backed by machine learning – looks at “Donald Trump” not as a string of letters but as an actual person. A person who has a defined age, a defined job profile, a list of relatives and so forth.

For instance, say you search: "Who is Donald Trump’s first wife?". Google is able to decipher words not strictly as strings of letters but things. Google knows Donald Trump is a person, and Google knows who his first wife is. It can then processes this information in rapid time to display information regarding Donald Trump’s first marriage to Ivana Trump.


## Machine Learning Techniques

Machine learning algorithms can be split into different classes of algorithms, including supervised, unsupervised and reinforced.

### Supervised

Supervised algorithms refer to learning guided by human observations and feedback with known outcomes.

For instance, supposes you want the machine to separate email into spam and non-spam messages.
In a supervised learning environment, you already have information that you can feed the machine to describe what type of email should belong to which category. The machine therefore knows that there are two labels available in which to sort the incoming data (emails). The data is therefore already pre- tagged.

Supervised algorithms, with tags applied, include Linear Regression, Logistic Regression, Neural Networks, and Support Vector Machine algorithms


### Unsupervised

In the case of an unsupervised learning environment, there is no such integrated feedback or use of tags. Instead the machine learning algorithm must rely exclusively on clustering separate data and modify its algorithm to respond to its initial findings - all without the external feedback of humans.

Clustering algorithms are a popular example of unsupervised learning. Clustering group together data points which are discovered to possess similar features.

The advantage of applying unsupervised algorithms is that it enables you to discover patterns within the data that you may not have been aware existed – such as the presence of two different sexes.


## Regression

Regression is a statistical measure that takes a group of random variables and seeks to determine a mathematical relationship between them.

Regression calculates numerous variables to predict an outcome or score.

The goal is to draw a straight line that best fits all the points on the graph, with the minimum distance possible from each point to the regression line.

The regression line is straight. This is a case of linear regression. If the line were not straight, it would be known as non-linear regression

The closer the data points are to the regression line, the more accurate your prediction will be. If there is a greater degree of deviation in the distance between the data points and your regression line then the less accurate your slope will be in its predictive ability.

Regression is used in a range of disciples including data mining, finance, business and investing. In investment and finance, regression is used to value assets and understand the relationship with variables such as exchange rates and commodity prices.

Specifically, regression is applied to determine the strength of a relationship between one dependent variable (typically represented at Y) and other changing variables (known also as independent variables).

There are various types of regression:

- **Linear regression** uses one independent variable to predict the outcome of the dependent variable. `Y = a + bX + u`
- **Multiple linear regression** uses two or more independent variables to predict the outcome of the dependent variable. `Y = a + b1X1 + b2X2 + b3X3 + ... + btXt + u`
- **Non-linear regression modelling** is similar in that it seeks to track a particular response from a set of variables on the graph. However, non-linear models are somewhat more complicated to develop.
- **Logistic regression** and linear regression are similar in nature but different in regards to the problems they solve. Linear regression addresses numerical problems and forms numerical predictions (in numbers). Whereas, logistic regression is used within classification algorithms to predict discrete classes.

Where:

- `Y` is the variable you are predicting (the dependent variable)
- `X` is the variable you are using to predict the Y value (independent variable) a = is the intercept
- `b` is the slope
- `u` the regression residual

Logistic regression, for example, is often used in fraud detection or to identify spam email.

In practical usage, logistic regression is applied similarly to linear regression. Logistic regression however adds a Sigmoid function to compute the result and converts numerical result into a number of probability between 0 and 1. A value of 0 represents no chance of occurring, and 1 represents a certain chance of occurring.

The degree of probability for values located between 0 and 1 can be calculated according to how close they rest to 0 (impossible) to 1 (certain possibility). The value 0.75 for example would be considered a probable possibility, or expressed as a 75% chance.

## Support Vector Machine Algorithms

Support vector machine (SVM) algorithms are an advanced progression from logistic regression algorithms.

SVM algorithms are essentially logistic regression algorithms with stricter set conditions.

SVM algorithms are better at drawing classification boundary lines.

A logistic regression algorithm, will split the two groups of data points with a straight line that minimizes the distance between all points.