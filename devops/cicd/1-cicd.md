# CI/CD workflow

The CI/CD software development and deployment **process** is an important part of software engineering.

This process uses the principles of **continuous integration (CI)** and **continuous delivery (CD)** to simplify software development, improve quality, and accelerate time to market.

## What is a pipeline?

In development, we set up several **stages** that the code needs to go through before it can be sent to the production system.

The goal of these stages is to reduce the number of errors that get to the end user by checking for errors at each stage.

A **CI/CD pipeline** is made up of a series of stages that the code goes through before it gets to production.

Software developers can use the CI/CD pipeline to focus on producing better products rather than worrying about long development cycles or costly mistakes. This ultimately leads to increased software project success, faster product launches, and satisfied consumers.

## Stages of the CI/CD Pipeline

### Code Checkout

This is the process of **retrieving source code** from a repository's main (or master) branch

### Code Quality Check

During this part of the process, automated tests are run to **look for problems with the code**, such as syntax errors, possible bugs, and code formatting.

### Complie Code

Here, all source code is **compiled** into one executable file that can be run by the software’s intended users.

### Unit Tests

During this phase, each software module or component is **tested independently** for any functionality or performance-related defects.

### Packaging

Make a software package with all of the software's resources, like code libraries, configuration files, and other supporting materials.

### Acceptance Tests

Acceptance testing is the final step before deployment.

During this phase, software is tested in a setting that is very similar to how it will be used in production.

This helps find any possible problems with the software's compatibility or performance in the environment where it will be used.

### Deployment

After software has passed acceptance tests, it can be deployed into production.
