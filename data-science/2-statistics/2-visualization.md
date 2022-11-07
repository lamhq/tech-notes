# Visualization techniques

## Categorical variables

### Frequency distribution tables

| Value | Frequency |
|---|---|
| Audi | 124 |
| BMW | 98 |
| Mercedes | 113 |

### Bar charts

![](https://www.mathsisfun.com/data/images/bar-chart-movies.svg)

### Pie charts

![](https://www.mathsisfun.com/data/images/pie-chart-movies.svg)

### Pareto diagrams

Biểu đồ Pareto được phân tích theo “quy tắc 80/20” tức là 20% nguyên nhân tạo ra 80% kết quả. Ta kẻ một đường thẳng từ 80% chạm đến đường tỷ lệ phần trăm tích lũy, sau đó kẻ thẳng xuống phía dưới. Khi đó những công việc bên trái đường thẳng xuống là những công việc chiếm 80% kết quả.

![](https://cdn.tgdd.vn/hoi-dap/1390412/video-bieu-do-pareto-la-gi-cach-ve-va-phan-tich-tren-excel%20(9).jpg)


### Cross tables (contingency table)

<table>
  <tr>
    <th>Type of investment \ Investor</th>
    <th>Investor A</th>
    <th>Investor B</th>
    <th>Investor C</th>
    <th>Total</th>
  </tr>
  <tr>
    <td>Stocks</td>
    <td>96</td>
    <td>185</td>
    <td>39</td>
    <td style="font-weight: bold">320</td>
  </tr>
  <tr>
    <td>Bonds</td>
    <td>182</td>
    <td>3</td>
    <td>29</td>
    <td style="font-weight: bold">213</td>
  </tr>
  <tr>
    <td>Real Estate</td>
    <td>88</td>
    <td>152</td>
    <td>142</td>
    <td style="font-weight: bold">382</td>
  </tr>
  <tr style="font-weight: bold">
    <td>Total</td>
    <td>365</td>
    <td>340</td>
    <td>210</td>
    <td>915</td>
  </tr>
</table>

### Side-by-side bar chart

It is often used together with Cross tables.

![](https://service.vhslearning.org/servlet/rtaImage?eid=ka04S0000000WWt&feoid=00N4S000000SR7U&refid=0EM4S000000g8ry)


## Numerical Variables

### Frequency distribution tables

When dealing with numerical variables, it makes sens to **group the data into intervals** and then find the corresponding frequencies.

Generally, statisticians prefer working with groups of data that contains 5 to 20 intervals.

$$
\text{interval width} = \frac{\text{largest number} - \text{smallest number}}{\text{number of desired intervals}}
$$

A number is included in an interval if that number:

1. is GREATER THAN the lower bound (or EQUAL TO the smallest value)
2. is LOWER or EQUAL to the upper bound (or EQUAL TO the largest value)


**Example**:

- Dataset: `1, 9, 22, 24, 32, 41, 44, 48, 57, 66, 70, 73, 75, 76, 79, 82, 87, 89, 95, 100`
- Desired interval: 5
- Interval width: 20
- Intervals: `[1, 21], (21, 41], (41, 61], (61, 81], (81, 101]`

Frequency distribution table

| Start | End | Frequency | Relative Frequency |
|-------|-----|-----------|--------------------|
| 1     | 21  | 2         | 0.10               |
| 21    | 41  | 4         | 0.20               |
| 41    | 61  | 3         | 0.15               |
| 61    | 81  | 6         | 0.30               |
| 81    | 101 | 5         | 0.25               |

### Histogram

![](https://www.mathsisfun.com/data/images/histogram-heights.svg)


### Scatter plot

It is used when representing two numerical variables.

Example: ice cream sales versus the noon temperature of that day

![](https://www.mathsisfun.com/data/images/scatter-ice-cream1.svg)