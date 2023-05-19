# Gravity

## Contributions

### 1. Thiết kế hệ thống backend sử dụng kiến trúc serverless, có thể mở rộng tự động


## Challenges

### 1. Dữ liệu lớn và logic truy vấn phức tạp dẫn đến việc tải dữ liệu ở backend bị chậm

- dữ liệu trên mỗi bảng khoảng 10,000 - 100,000 dòng
- kết quả trả về bao gồm dữ liệu trên nhiều bảng kết hợp lại. Việc kết bảng bằng truy vấn SQL dẫn đến tốc độ chậm, crash do tràn bộ nhớ
- hệ thống có tích hợp module phân quyền dẫn đến dữ liệu hiển thị cho mỗi user là khác nhau, gây khó khăn cho việc caching

Giải pháp:


### 2. Dữ liệu được yêu cầu từ phía client không đồng nhất

- dữ liệu trả về từ API tuy cùng 1 model nhưng sẽ có thêm 1 số thông tin thêm vào tùy API, dẫn đến việc truy vấn dữ liệu không đồng nhất do khác kết quả trả về
- vấn đề này có thể được giải quyết bằng GraphQL, nhưng hệ thống ban đầu phát triển từ kiến trúc RESTful API, chuyển sang GraphQL đòi hỏi phải làm lại 1 số công đoạn: thiết kế, lập trình, kiểm thử, refactor code phía frontend.

Giải pháp:


### 3. Team không có tester

- do team không có tester, Dự án an đầu hay bị lỗi lặt vặt do test sót. việc kiểm tra ban đầu được thực hiện bởi lead, deadline theo tuần nên không có đủ thời gian cho kiểm thử.

Giải pháp:
- thiết kế test case
- phân chia cho các thành viên trong team để test
- định kỳ thực hiện việc kiểm thử
- tích hợp sentry vào slack để phát hiện những lỗi runtime và sửa lỗi sớm.