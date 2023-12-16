# AWS Step Functions

## Overview

AWS Step Functions is a serverless orchestration service combining different AWS services to build business applications.

It provides a graphical console for viewing application workflow views and flows.

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