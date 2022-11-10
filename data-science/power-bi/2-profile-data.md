# Profile your Data with Power BI

## What Is Data Profiling?

Data profiling is the process of examining, assessing, and assuring the quality of data and collecting statistics and information about that data.

It also gathers metadata information like:
- what the data type is
- the uniqueness of the data
- the occurrence of null/empty values or duplicates
- the distribution of the data

You profile your data to determine the accuracy, completeness, and validity of your data. The quality of your data determines how reliable and precise the results produced by any analysis will be.

*For example, when you load the data, you first want to make sure that the data is complete; therefore, you look at the row count as a statistic to identify if all the data was loaded correctly from your data source, or when you have an ID column where everything's supposed to be unique, you can then identify that there are no duplicates.*


## Examina Data Structure

When you load the data into Power BI Desktop, you can find the data model by clicking on the data Model icon in the left navigation.

It will display the representation layout of all the tables that have been loaded into your data model.

One of the nice things about the data model is that you can easily identify how the relationships are between the tables.

If you want to manage the relationships, you can click on Manage relationships, and this will showcase how your current relationships are.

You can also Edit relationship and change the Cross filter direction.

Power BI automatically created the layout for all the tables, but you can also create your own layout with just specific tables and choose Add related tables 


## Interrogate Data Statistics

You profile your data in Power BI by interrogating the data statistics.

In the Power Query Editor, **View** tab, we have the following options:

### Column quality

Determine the percentage of data that is valid, or it has errors or empty values.

If you do spot an error, there are a few options to resolve those errors.

By right‑clicking on the statistics, you can then decide to **remove an error**, **remove empty values**, or **replace the errors with another value**.

### Column distribution

It show you:
- how many distinct items you have
- how many are unique and where that spread is

It help you:
- spot even distributed data
- spot unusual spikes
- identify possible outlier.

### Column profile

Gives you a more in‑depth look into the statistics within the column. 

Power BI by default looks at the first thousand rows of the data. If you want to have a total overview of the column profile, you can change the profile status in the status bar and select column profiling based on the entire dataset.

Column profile provides several different values:
- counts of rows, ensure if the importing of your data was successful
- minimum and maximum values
- the value distribution graph tells you the count of each distinct value in a specific column

## Identify Data Anomolies

An anomaly is an outlier within your data, also described as an abnormality. It is something that is unusual or unexpected when you look at values within your datasets.

A great starting point to identify anomalies is by looking at the normal distribution of your data, by turning on Column distribution option.

Power BI has a built‑in feature to detect anomalies. In order to detect anomalies, first **select your visual**, then go to the ribbon top and select **Data/Drill**. Here you'll find an option that says Find anomalies.