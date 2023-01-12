# Performance Monitoring

With performance monitoring, Sentry tracks application performance, measures metrics like throughput and latency, and displays the impact of errors across multiple services.

Sentry captures distributed traces consisting of **transactions** and **spans** to measure individual services and operations within those services.


## What Is a Transaction?

A **transaction** represents a single instance of an activity you want to measure or track, like a page load, page navigation, or an asynchronous task.

You can trace issues back through services (for instance, frontend to backend) to identify poorly performing code.

Without transactions, you can only know when things in your application have actually gone wrong, which is important, but not the whole picture.


## Peformance page

Each tab in oeformance page and its metrics are explained below

### All Transactions

Includes all transactions across any projects and period you have selected.

### Web Vitals

Includes frontend pageload transactions. 

The transactions are automatically filtered to only include `transaction.op:pageload`. This generally corresponds to all browser page transitions that are the first load of a page.

It also includes performance information from the beginning of the load itself, as well as the performance of the SPA frameworks being loaded.

### Frontend

Includes all frontend transactions. This generally corresponds to page transitions handled internally in SPA frameworks.

### Backend

puts an emphasis on duration, throughput, failure rate, and Apdex.

### Mobile

puts an emphasis on Mobile Vitals.