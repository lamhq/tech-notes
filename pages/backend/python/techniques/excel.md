# Excel

## Copy cells to another excel file

```sh
pip install openpyxl
```

```py
import openpyxl
from openpyxl.cell import MergedCell 

in_file = '/Users/lam/Downloads/part1.xlsx'
out_file = '/Users/lam/Downloads/copy.xlsx'

# Load the workbook
wb = openpyxl.load_workbook(in_file)

# Get the sheet
sheet1 = wb['Analysis']

# Create a new workbook
output_wb = openpyxl.Workbook()
output_sheet = output_wb.active

# Iterate through the rows and columns of the input file
for row in sheet1.iter_rows():
    for cell in row:
        if isinstance(cell, MergedCell):
            continue
        # Write the value to the output file
        output_sheet.cell(row=cell.row, column=cell.col_idx).value = cell.value

# Save the output file
output_wb.save(out_file)
```


## Read data from Excel file

```py
import pandas as pd

in_file = '~/Downloads/part1.xlsx'

# correlation
df = pd.read_excel(in_file, 
  sheet_name='Analysis', 
  usecols='F:L',
  index_col=0,
  nrows=6,
  skiprows=2,
) 
```