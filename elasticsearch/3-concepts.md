# Basic

## How Does Elasticsearch Work?

Elasticsearch uses shipping agents, called beats, to transfer raw data from multiple sources into Elasticsearch. After data is shipped into Elasticsearch, the engine runs data ingestion processes, which parse, normalize, enrich, and prepare data for indexing.

After the data is indexed, users can run complex queries and use aggregations to retrieve complex data summaries.

For visualization and management, the Elastic Stack offers a tool called Kibana, which enables users to create real-time data visualizations, such as pie charts, maps, line graphs, and histograms.

## Elasticsearch Architecture

![https://www.dbi-services.com/blog/wp-content/uploads/sites/2/2022/01/Elasticsearch-index-shards.png](https://www.dbi-services.com/blog/wp-content/uploads/sites/2/2022/01/Elasticsearch-index-shards.png)

## Cluster


## Node

Một server Elasticsearch, chứa một số dữ liệu trong cluster, thực hiện công việc lưu trữ và tìm kiếm.


## Cluster

Tập hợp các node hoạt động cùng với nhau, chia sẽ cùng thuộc tính cluster.name. Dữ liệu của toàn bộ cluster sẽ được chia sẻ giữa các node.

Mỗi cluster có một node chính (master), được lựa chọn một cách tự động và có thể thay thế nếu sự cố xảy ra. Một cluster có thể gồm 1 hoặc nhiều nodes.

Trong thực tế , một cluster sẽ gồm nhiều nodes hoạt động trên các server khác nhau để đảm bảo nếu 1 server gặp sự cố thì server khác (node khác) có thể hoạt động đầy đủ chức năng so với khi có 2 servers


## Document

Một JSON object với một số dữ liệu, đây là một đơn vị thông tin trong Elasticsearch (tương đương với khái niệm document trong MongoDB hay khái niệm row trong table của database SQL)


## Type

Một tập các document có cùng cấu trúc. Tương ứng với 1 collection trong MongoDB. **Type is deprecated in ElasticSearch 7.x**.


## Index

Một tập hợp các document, tương đương như 1 database trong MongoDB


## Shard

Tập con các documents của 1 Index. Mỗi node bao gồm nhiều Shard. Shard hoạt động ở mức thấp nhất, đóng vai trò lưu trữ dữ liệu.

Có 2 loại Shard là : primary shard và replica shard.

### Primary Shard

Primary Shard là sẽ lưu trữ dữ liệu và đánh index . Sau khi đánh xong dữ liệu sẽ được vận chuyển tới các Replica Shard.

Mặc định của Elasticsearch là mỗi index sẽ có 5 Primary shard và với mỗi Primary shard thì sẽ đi kèm với 1 Replica Shard.

### Replica Shard

Replica Shard là nơi lưu trữ dữ liệu nhân bản của Primary Shard

Replica Shard có vai trò đảm bảo tính toàn vẹn của dữ liệu khi Primary Shard xảy ra vấn đề.

Dưới đây là một mô hình đơn giản cho kiến trúc: cluster-node-shard của Elasticsearch.

![cluster-node-shard architecture](https://viblo.asia/uploads/6c13bef6-7f23-4e6d-a772-143c40d96567.png)

Nhìn vào hình trên chúng ta có thể thấy, dữ liệu được lưu trữ ở cluster với 3 nodes trong đó node 1 là master.

Có 3 primary shards, 2 trong số đó được đặt ở node 1, còn lại ở node 3. 

Mỗi primary shard có 2 replica shard (ví dụ primary shard P0 ở Node 3 thì có replica shard R0 ở node 1 và một shard nữa ở Node 2). 

Việc sắp đặt vị trí primary shard là ngẫu nhiên, còn các replica shard luôn được đảm bảo là nó không nằm cùng node với primary shard (Tại sao? Tưởng tượng node ngưng hoạt động mà toàn bộ shard ở node đó thì sẽ mất hết sạch dữ liệu @@). 

Thêm nữa là không bắt buộc primary shard đều nằm ở node master, vì việc phân tán các primary shard giúp phân tán công đoạn ghi dữ liệu, giúp giảm tải cho một node.

Việc lựa chọn node cho các thao tác đọc được thực hiện bởi thuật toán Round-robin.

## Cluster health

Trong Elasticsearch có khái niệm cluster health (tạm gọi là "sức khỏe" của cluster). Có thể kiểm tra dễ dàng với câu lệnh.

```
GET _cluster/health?pretty
```

Kết qủa trả về là một chuỗi json có trường status, đây chính là cluster health. Trường này nhận 1 trong 3 gía trị:

- `Red` Vẫn còn primary shard chưa hoạt động.
- `Yellow` Tất cả primary shard đã hoạt động, nhưng vẫn còn replica shard chưa hoạt động.
- `Green` Tất cả primary shard và replica shard đều hoạt động.

`Red` là trạng thái khá hiếm gặp và tôi chỉ thấy nó trong giai đoạn khởi động, tắt bật node, còn `Yellow` lại khá phổ biến. Nguyên nhân tại sao? Tại sao primary shard hoạt động nhưng replica shard lại chưa hoạt động?

Thiết lập mặc định của Elasticsearch là 5 primary shards và 1 replica shard/1 primary shard. Điều đó có nghĩa nếu bạn khởi động Elasticsearch lên từ 1 node, thì bạn chỉ có một nơi lưu trữ data. Do nguyên lý cơ bản là replica shard phải nằm khác node với primary shard, Elasticsearch sẽ không biết đặt replica shard ở đâu, và tất cả shard ở node đó sẽ là primary shard.

Cách xử lý vấn đề: thêm 1 node nữa từ server khác.


## Cơ chế làm việc với Elasticsearch

![Workflow](https://stackjava.com/wp-content/uploads/2018/07/elasticsearch-1-768x393.png)

Các dữ liệu tổng hợp, dữ liệu được người dùng tải lên sẽ lưu vào database sau đấy đồng bộ hóa sang Elasticsearch.

Khi người dùng tìm kiếm thì sẽ tìm kiếm trên Elasticsearch, tốc độ vừa nhanh, vừa giảm tải cho database.

## Ưu nhược điểm của ES

### Ưu điểm

- Tìm kiếm dữ liệu rất nhanh chóng
- Có khả năng phân tích, thống kê dữ liệu (aggregation)
- Khả năng mở rộng theo chiều ngang
- Hỗ trợ những câu truy vấn phức tạp

### Nhược điểm

- Với những nhiệm vụ khác ngoài search như CRUD thì elastic kém thế hơn so với những database khác
- Trong elasticsearch không có khái niệm database transaction
- Không thích hợp với những hệ thống thường xuyên cập nhật dữ liệu.


## Document version

When we discussed index, get, and delete requests previously, we pointed out that every document has a `_version` number that is incremented whenever a document is changed. Elasticsearch uses this `_version` number to ensure that changes are applied in the correct order. If an older version of a document arrives after a new version, it can simply be ignored.

We can take advantage of the `_version` number to ensure that conflicting changes made by our application do not result in data loss. We do this by specifying the version number of the document that we wish to change. If that version is no longer current, our request fails.

Now imagine that we want to edit the document: we load its data into a web form, make our changes, and then save the new version.

First we retrieve the document, The response body includes the same _version number of 1:

```json
{
  "_id": 1,
  "_version": 1,
  "_source": {...}
}
```

Now, when we try to save our changes by reindexing the document, we specify the version to which our changes should be applied

```
PUT /website/blog/1?version=1
```

This request succeeds, and the response body tells us that the `_version` has been incremented to 2

However, if we were to rerun the same index request, still specifying version=1, Elasticsearch would respond with a 409 Conflict HTTP response code.

All APIs that update or delete a document accept a version parameter, which allows you to apply optimistic concurrency control to just the parts of your code where it makes sense.


## Using Versions from an External System

If your main database already has version numbers—or a value such as timestamp that can be used as a version number—then you can reuse these same version numbers in Elasticsearch by adding `version_type=external` to the query string.

The way external version numbers are handled is a bit different from the internal version numbers we discussed previously. Instead of checking that the current `_version` is the same as the one specified in the request, Elasticsearch checks that the current `_version` is less than the specified version. If the request succeeds, the external ver‐ sion number is stored as the document’s new `_version`.

External version numbers can be specified not only on index and delete requests, but also when creating new documents.


## Partial Updates to Documents

```
POST /website/blog/1/_update
{
  "script" : "ctx._source.views+=1"
}

POST /website/blog/1/_update
{
  "script" : "ctx._source.tags+=new_tag",
  "params" : {
    "new_tag" : "search"
  }
}
```

## Updating a Document That May Not Yet Exist

```
POST /website/pageviews/1/_update
{
  "script" : "ctx._source.views+=1",
  "upsert": {
    "views": 1
  }
}
```