# Simple trading strategy using Simple Moving Average

Chiến lược đầu tư sử dụng đường trung bình động đơn giản

## Definition

Đường trung bình động đơn giản (SMA) được tính bằng cách **lấy giá đóng cửa của N phiên giao dịch rồi chia cho N**

*Nếu bạn vẽ đường SMA 5 kỳ (SMA 5) lên biểu đồ khung thời gian 1 ngày, bạn cần phải cộng giá đóng cửa của 5 ngày trước đó, sau đó chia cho 5. Như vậy bạn đã tính được giá đóng cửa trung bình của 5 ngày. Cứ sau 1 ngày, bạn lại cộng giá đóng cửa 5 ngày gần nhất lại, bạn sẽ được đường trung bình đơn giản.*

## Strategy

We plot Close Price `MA10` and `MA50`. If `MA10` is larger than `MA50`, then the stock price is believed to go up in the next seveval days. Otherwise, the price will decrease.

Our strategy is, if `MA10` is larger than `MA50`, we will buy and hold one share of stock.

We create a new variable called `Shares`, to denote whether we long or not. `Shares` is equal to 1 if `MA10` is larger than `MA50`, otherwise it is `0`.

Next, we will compute **Daily Profit**:

- If `Shares` is equal to `1`, the Daily Profit is equal to the close price of tomorrow minus close price of today. It can be positive or negative. If negative, we lose money on that day.
- If `Shares` is equal to `0`, it means we do not buy stock, the profit is equal to `0`

We can plot the **Profit** and find out on some days we make money. Then, we can compute the cumulative wealth to see the total money we earn.

**Summary**:

1. calculate `MA10` and `MA50` value from `Close Price`
1. for each day, if `MA10`>`MA50`, set the `Buy` value to `1`, else `0`
1. calculate `Profit` value,
  if `Buy`=`1`, `Profit`= `Close Price Tomorrow` - `Close Price`,
  else `Profit`=`0`
1. calculate the sum of `Profit` to get the total profit we have after `n` days


## Tham khảo

1. [Đường trung bình động MA là gì? Cách sử dụng đường MA hiệu quả](https://online.hsc.com.vn/tin-tuc/huong-dan-dau-tu-hieu-qua/nen-su-dung-cac-duong-moving-average-nhu-the-nao-la-hieu-qua.html)
