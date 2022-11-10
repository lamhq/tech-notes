# Clean, Transform, and Load Data with Power BI

## Clean Data

Once you finish profiling data. You have to ask your business what to do. You'll need their signoff to ensure your data is valid.

You might want to do some data cleaning work:
- convert the nulls to 0
- translate blank values to either N/A, not available, or unknown
- replacing misspellings
- remove the errors or invalid data, or anomalies

To **replace values**, open Power Query Editor, go to Transform tab, click Replace Values. Or right-click on a value in the preview and choose Replace.

To **remove errors**, right-click on a column, choose **Remove Errors**.

You might want to copy the error to another query and report it, so someone can go and clean up the data.


## Transform Data

Transforming data includes steps like:
- changing the data type of a column
- removing rows that might be duplicated
- splitting a particular column into multiple columns
- creating a column for more than one column

### Transforming columns

To add column, open Power BI editor, go to **Add Column** tab.

You can use **Column From Examples**. This uses some artificial intelligence inside a Power Query. It can learn from the values you entered based on a selected column

### Transforming rows

You can **Remove Rows**, **Keep Rows** in the **Home** tab

In case Power BI can not detect the column name, we can help it by remove unrelated rows, and choose **Use First Row as Headers**.

You can select columns an use feature **Unpivot Columns** to transform columns to rows


## Merging Queries

You can merge (join) two queries in Power Query by go to **Home** tab, select **Merge Queries**, it will add a new column for the merged table. Then you can select the column and expand its inner columns.
