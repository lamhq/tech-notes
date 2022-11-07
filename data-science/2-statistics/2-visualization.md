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