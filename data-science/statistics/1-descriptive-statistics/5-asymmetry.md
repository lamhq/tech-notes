# Measures of Asymmetry

Hình dạng của bất kỳ phân bố nào có thể được mô tả bằng hai thước đo: **kurtosis** và **skewness**. Hai chỉ số này nó sẽ đo mức độ "méo mó, lệch phải lệch trái, lệch lên lệch xuống.." so với hình dạng của phân phối chuẩn.

## Skewness

Skewness indicates whether the data is concentrated on one side.

Skewness được sử dụng để mô tả sự cân bằng của phân phối: nó không cân đối và bị lệch sang một bên (phải hoặc trái) hay nó có trọng tâm và đối xứng với cùng một hình dạng ở cả hai bên.

Khi Skewness = 0:
- Phân phối đối xứng (xem như phân phối chuẩn).

Khi Skewness > 0: 
- Phân phối lệch phải (độ lệch dương). 
- Right skewness means that the outliers are to the right. The data points are concentrated to the left (low values).
- mean > median > mode

Khi Skewness < 0:
- Phân phối lệch trái (độ lệch âm).
- Left skewness means that the outliers are to the left.
- mean < median < mode
- extreme negative values will dominate the distribution.

![Image](https://miro.medium.com/max/1200/1*nj-Ch3AUFmkd0JUSOW_bTQ.jpeg)

A distribution with frequent small losses and a few extreme losses gains has a positive skew. The mean is greater than the median and mode. There is more probability in the tails of the distribution relative to the normal distribution.

A distribution with frequent small gains and a few extreme losses has a negative skew. The mean is less than the median and mode.


## Kurtosis

Giá trị kurtosis đo độ nhọn hoặc độ phẳng của phân phối khi so sánh với phân phối chuẩn.

![](https://phantichspss.com/wp-content/uploads/2021/09/skewkurtosis1.png)

Giá trị dương cho biết phân phối tương đối nhọn và giá trị âm cho biết phân phối tương đối bằng phẳng.

Các phân phối cao hơn hoặc nhọn hơn so với phân phối chuẩn được gọi là leptokurtic, trong khi phân phối phẳng hơn được gọi là platykurtic.

Kurtosis reflects the probabilities of **extreme values** occurring when compared to a normal distribution.

Leptokurtic or **fat tails** is when the frequency of extreme moves is greater than a normal distribution. This is referred to as excess positive kurtosis.

Platykurtic, or **thin-tails** is when the frequency of extreme moves is less than a normal distribution, this is referred to as excess negative kurtosis.

Mesokurtic is when the frequency in the tails is similar to a normal distribution.

If kurtosis is:

- above 0, the distribution is fatter-tailed than the normal distribution (leptokurtic)
- equal to 0, the distribution is similar in tails to the normal distribution (mesokurtic)
- less than 0, the distribution is thinner-tailed than the normal distribution (Platykurtic)