# Logging and Monitoring in the Cloud

## The importance of monitoring

Monitoring helps:

- Reveals what needs urgent attention
- Shows trends in application usage patterns
- Helps improve application experience
- Ensure continued system operations
- Uncover trend analyses over time
- Build dashboards
- Alert personnel when systems violate predefined SLOs
- Compare systems and systems changed
- Provide data for improved incident response

Monitoring is defined as: collecting, processing, aggregating, and displaying real-time quantitative data about a system, such as:

- Query counts and types
- Error counts and types
- Processing times
- Server lifetimes

We need:

- Data from monitoring to improve products continually
- Dashboards to provide business intelligence
- Automated alerts
- Monitoring tools to provide data for debugging application functional and performance issues


## Measuring performance and reliability

There are four golden signals that measure a system's performance and reliability: latency, traffic, saturation and errors.

### Latency

Latency measures how long it takes a particular part of a system to return a result

- it directly affects the user experience
- Changes in latency could indicate emerging issues
- its values may be tied to capacity demands
- it can be used to measure system improvements

Sample latency metrics:

- page load latency
- number of requests waiting for a thread
- query duration
- service response time
- transaction duration
- time to first response
- time to complete data return

### Traffic

Measures how many requests are reaching your system

- it's an indicator of current system demand
- its historical trends are used for capacity planning
- it's a core measure when calculating infrastructure spend

Sample traffic metrics:

- number of HTTP requests per second
- number of requests for static vs. dynamic content
- network IO
- number of concurrent sessions
- number of transactions per second,
- number of retrievals per second
- number of active requests
- number of write operations
- number of read operations
- and number of active connections

### Saturation

measures how close to capacity a system is

- it's an indicator of how full the service is
- it focuses on the most constrained resources
- it's frequently tied to degrading performance as capacity is reached

Sample capacity metrics:

- percent memory utilization
- percent thread pool utilization
- percent cache utilization
- percent disk utilization
- percent CPU utilization
- disk quota
- memory quota
- number of available connections
- number of users on the system


### Errors

Events that measure system failures or other issues

- they may indicate that something is failing
- they may indicate configuration or capacity issues
- they can indicate service level objective violations
- an error might mean it's time to send out an alert

Sample error metrics:

- wrong answers or incorrect content
- the number of 400 and 500 HTTP codes
- the number of failed requests
- the number of exceptions
- the number of stack traces
- servers that fail liveness checks
- the number of dropped connections

## Understanding SLA, SLO and SLI

- SLA: service level agreement, the agreement you make with your clients or users
- SLOs: service level objectives, the objectives your team must hit to meet that agreement
- SLIs: service level indicators, the real numbers on your performance

The goal of all three things is to get everybody—vendor and client alike—on the same page about system performance. 

### SLA: Service Level Agreements

An SLA is an agreement between provider and client about measurable metrics like uptime, responsiveness, and responsibilities. 

They represent the promises you’re making to customers—and the consequences if you fail to live up to those promises. Typically, consequences include financial penalties, service credits, or license extensions.


### SLO: Service Level Objectives

An SLO is an agreement within an SLA about a specific metric like uptime or response time. 

So, if the SLA is the formal agreement between you and your customer, SLOs are the individual promises you’re making to that customer. SLOs are what set customer expectations and tell IT and DevOps teams what goals they need to hit and measure themselves against.


### SLI: Service Level Indicator

An SLI measures compliance with an SLO (service level objective). 

So, for example, if your SLA specifies that your systems will be available 99.95% of the time, your SLO is likely 99.95% uptime and your SLI is the actual measurement of your uptime. Maybe it’s 99.96%. Maybe 99.99%. To stay in compliance with your SLA, the SLI will need to meet or exceed the promises made in that document.


## Cloud Monitoring tools

- provides visibility into performance, uptime, and overall health of cloud powered applications
- collects metrics, events, and metadata from projects, logs, services, systems, agents, custom code, and various common application components
- ingests the data and generates insights


## Cloud Logging tools

Cloud Logging allows users to collect, store, search, analyze, monitor, and alert on log entries and events.

Automated logging is integrated into Google Cloud products like App Engine, Cloud Run, Compute Engine VMs running the logging agent and GKE.

Log analysis:

- uses Google Cloud's integrated Logs Explorer
- entries can also be exported to several destinations
- Pub/Sub messages can be analyzed in near real-time using custom code or stream processing
- BigQuery allows analysts to examine logging data through SQL queries
- archive log files in Cloud storage can be analyzed with several tools and techniques

Log export:

- data can be exported as files to Cloud Storage
- data can be exported as messages through Pub/Sub
- data can be exported into BigQuery tables
- log base metrics can be created and integrated into cloud monitoring dashboards, alerts, in-service SLOs

Log retention

- Default log retention depends on the log type
- Data access logs are retained by default for 30 days, up to a maximum of 3,650 days
- Admin logs are stored by default for 400 days
- Logs can be exported to Cloud Storage or BigQuery to extend retention

Four key log categories:

- Cloud audit logs: 
  - who did what, where and when
  - Admin Activity
  - Data access
  - System events
  - Access transparency
- Agent logs: 
  - fluentd agent: ingest logged data from Google Cloud instances
- Network logs: 
  - VPC flow
  - Firewall rules
  - NAT gateway
- Service logs: provide access to logs created by developers deploying code to Google Cloud
  - Standard out / error

## Error reporting

- counts, analyzes, and aggregates the crashes in your running cloud services
- management interface displays the results with sorting and filtering capabilities
- a dedicated view shows the error details: time chart, occurrences, affected user count, first- and last-seen dates, and a cleaned exception stack trace


## Cloud Trace

- collects latency data from your distributed applications and displays it in the Google Cloud console
- capture traces from applications deployed on App Engine, Compute Engine VMs, and Google Kubernetes Engine containers
- performance insights are provided in near-real time
- automatically analyzes all of your application's traces to generate in-depth latency reports to surface performance degradations
- continuously gathers and analyzes trace data to automatically identify recent changes to your application's performance


## Cloud Profiler

- Uses statistical techniques and extremely low-impact instrumentation that runs across all production application instances to provide a complete CPU and heap picture of an application
- allows developers to analyze applications running anywhere, including Google Cloud, other cloud platforms, or on-premises, with support for Java, Go, Python, and Node.js
- presents the call hierarchy and resource consumption of the relevant function in an interactive flame graph


## Quiz

1. There are “Four Golden Signals” that measure a system’s performance and reliability. What are they?
    > Latency, traffic, saturation, errors

2. Which definition best describes a service level indicator (SLI)? 
    > A time-bound measurable attribute of a service

3. Which option describes a commitment made to your customers that your systems and applications will have only a certain amount of “downtime”?
    > Service level agreement

4. You want to create alerts on your Google Cloud resources, such as when health checks fail. Which is the best Google Cloud product to use?
    > Cloud Monitoring
5. Select the two correct statements about Cloud Logging.
    > Cloud Logging lets you view logs from your applications and filter and search on them. \
    > Cloud Logging lets you define metrics based on your logs.