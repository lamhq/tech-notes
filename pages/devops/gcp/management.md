# Management interfaces and command-line tools

## Google Cloud console

- The primary tool to interact with Google Cloud
- Modern interface
- Possible to customize the dashboard, allowing users to pin services and organize them for ease of use
- Can be accessed from computers as well as mobile devices


## Cloud Shell

- a Linux shell provided for every Google Cloud user.
- has a set of pre-installed development tools: gcloud CLI, kubectl, Terraform, Git
- can be accessed directly from the browser
- provides 5 GB of Persistent Disk storage


## The gcloud CLI

- Set of command-line tools for managing Google Cloud resources
- Can perform all the actions that can be done in the Google Cloud console


## Cloud APIs

- Allow interact with Google Cloud directly from code.
- Integrating Cloud APIs with REST calls or client libraries is possible in many popular programming languages.


## Mobile applications

Google Cloud offers mobile applications which give users the ability to monitor and make changes to Google Cloud resource

Features:
- **Incident management**: Open, assign, acknowledge, and resolve incidents
- **GCE**: Start, stop, and turn SSH into instances and view logs from each instance
- **App Engine**: Troubleshoot errors, roll back deployments, and change traffic splitting
- **Alerts**: Get alerts on production issues
- **Dashboard**: View the health of your services, view graphs, and key metrics
- **Cloud Storage**: View and delete Cloud Storage data
- **Error reporting**: Understand crashes of your cloud services
- **Billing**: See up-to-date billing information and get billing alerts for projects
- **Cloud SQL**: View the health of, start, and stop Cloud SQL instances


## Google Cloud Deployment Manager

An **infrastructure deployment service** that **automates the creation and management of Google Cloud resources**. 

Allows you to write flexible templates and configuration files (YAML-based syntax), which can then be used to create deployments with various Google Cloud services.


## Terraform

An Infrastructure as Code (IaC) software tool created by HashiCorp.
Use its own declarative language, HashiCorp Configuration Language (HCL), or JSON.

If you learn how to use HCL, you no longer need to learn how to deploy specific cloud provider features and you use the necessary Terraform provider.


## Service Catalog

A tool that enables **cloud administrators** to **control distribution**, **ensure internal compliance**, and **increase discoverability** of solutions within an enterprise.

It acts as a **one-stop shop** for pre-approved tools, eliminating the need for wikis or documents.

Admins can manage visibility, deployment rights, and compliance, ensuring that deployments follow company policy.
