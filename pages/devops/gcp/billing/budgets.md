# Budgets and alerts

## Overview

Budgets in Google Cloud help prevent unexpected costs from misconfiguration or coding errors that lead to significant unnecessary charges.

The budget and alerts should be configured before any cloud activities.

Budgets do not stop resource usage or creation; they only alert once the set limit is reached.


## Budget Creation

To create a budget, these permissions are required:
- `billing.budgets.create`
- `billing.budgets.get`
- `billing.budgets.list`

Those can be assigned by assigning the role **Billing Account Administrator** or **Billing Account Costs Manager**.

A butget can:
- cover time range: Monthly, Quarterly, Yearly, Custom
- include specific projects/services
- compare with **Specified amount** or **Last month’s spend**
- have many **alert threshold rules**
- send notification to different channels: email, Pub/Sub topic
