# AWS Step Functions

## Overview

AWS Step Functions is a serverless workload orchestration service which can be used to coordinate the components of distributed applications as a series of steps in a visual workflow.

It provides a graphical console for viewing application workflow views and flows, a detailed event log for every execution.

It scales automatically.

It is highly available, maintains service capacity across multiple AZs. No maintenance windows or scheduled downtimes.
 
You can automatically retry failed or timed-out tasks, catch errors.

IAM policies can be used to control access to the Step Functions APIs.

Services and data can be orchestrated that run on Amazon EC2 instances, containers, or on-premises servers.


## How it works

You define your app as a state machine.

You define the steps of your workflow in the JSON-based Amazon States Language. The visual console automatically graphs each step in the order of execution.

Start an execution to visualize and verify the steps of your application are operating as intended. The console highlights the real-time status of each step and provides a detailed history of every execution.

AWS Step Functions operates and scales the steps of your application and underlying compute for you to help ensure your application executes reliably under increasing demand.

You can add branching logic based on the output of a task to determine the next state.


## Components

### State machines

A state machine is a particular workflow with different event-driven steps within it.

### States

Each step in a workflow is considered a **state**.

States are flexible. You can leverage states to either make decisions based on input, perform certain actions, or pass output.

States and workflows are defined in Amazon States Language.

States are referred to by an unique name within the state machine.

Example: steps in an online pickup order: place order, fulfill order, mark order as ready for pickup, mark it as picked up.

Available states:
- **Pass**: Passes any input directly to its output - no work done
- **Task**: Single unit of work performed (e.g., Lambda, Batch, and SNS)
- **Choice**: Adds branching logic to state machines
- **Wait**: Creates a specified time delay within the state machine
- **Succeed**: Stops executions successfully
- **Fail**: Stops executions and marks them as failures
- **Parallel**: Runs parallel branches of executions within state machines
- **Map**: Runs a set of steps based on elements of an input array

### Tasks

A task is a state in a workflow represent a single unit of work.


## Pricing

Each time you perform a step in your workflow, Step Functions counts a state transition.

You pay for the number state transitions (including retries) you use per month. 

Free Tier: 4000 State Transitions per month.

State Transitions cost a flat rate of $0.000025 per state transition thereafter.


## Types of workflow

Each workflow has executions. Executions are instances where you run your workflows in order to perform your tasks.

### Standard

- Have exactly-once execution
- Can run for up to 1 year
- Useful for long-running workflows that need to have an auditable history
- Rates up to 2,000 executions per second
- Pricing based per state transition

### Express

- Have at least once workflow execution. You can get some duplication and you'll need to handle it.
- Can run for up to five minutes.
- Useful for high-event-rate workloads. Things that comes in and goes out very quickly. E.g., IoT data streaming and ingestion.
- Pricing based on number of executions, durations, memory consumed


## Use Cases

Build workflows across multiple Amazon services

Buidl data pipeline, long-running ETL jobs

Automate recurring tasks, such as updating patches, selecting infrastructure, and synchronizing data

Create responsive serverless applications and microservices with multiple AWS Lambda functions without writing code for workflow logic, parallel processes, error handling, or timeouts.