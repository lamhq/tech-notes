# Configuration

## Overview

A Terraform configuration is a document in the **Terraform language** that tells Terraform how to manage a given collection of infrastructure.

A configuration can consist of multiple files and directories.


## Configuration files

Configuration files have extensions: `.tf` or `.tf.json` (JSON-based variant)

Configuration files use UTF-8 encoding.


## Modules

A module is a collection of `.tf` and/or `.tf.json` files kept together in a
directory.

Nested directories are treated as completely separate modules, and are not automatically included in the configuration.

Terraform evaluates all of the configuration files in a module.
- You can separate various blocks into different files for better reading (e.g., main, variables, output).
- If two files attempt to define the same object, Terraform returns an error.

A Terraform module can include other modules into the configuration. These child modules can come from local directories or from external sources (like the Terraform Registry).

### The Root Module

In Terraform CLI, the root module is the working directory where Terraform is invoked.

In Terraform Cloud and Terraform Enterprise, the root module for a workspace defaults to the top level of the configuration directory.
