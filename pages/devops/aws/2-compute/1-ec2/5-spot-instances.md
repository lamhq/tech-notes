# Spot Instances

## How it works

To use Spot Instances, you must first decide on your maximum Spot price. The instance will be provisioned so long as the Spot price is **below** your maximum Spot price.

If the Spot price goes above your maximum, you have **2 minutes** to choose whether to **stop or terminate** your instance.

When we create our spot instances, we're creating a spot request including:
- maximum price
- launch specifications (AMI)
- request type:
  - **persistent**: you have to say when the request is valid from and when it's valid to
  - **one-time**: instances will be stopped or terminated depending on what you configure as soon as the spot price goes above our maximum price


## Terminate spot instances

If you've got a spot request that's open and persistent, you can't just go in and terminate your instances (cause it'll then just keep re-provisioning those instances).

You have to first cancel the spot request then terminate those instances yourself.

You can block Spot instances from terminating by using a **Spot block**.


## Spot Fleets

A Spot Fleet is a collection of **Spot Instances** and (optionally) **On-Demand Instances**.

The Spot Fleet attempts to launch the number of Spot instances and On-Demand instances to meet the target capacity you specified in the Spot Fleet request.

If there is enough capacity and the current Spot price is lower than your maximum price, your request will be fulfilled and the Spot Instances will be launched.

The Spot Fleet attempts to maintain its target capacity fleet if your Spot Instances are interrupted.

Spot Fleet will stop launching instances one you reach your price threshold or capacity desire.


## Launch pools

You can define things like EC2 instance type, operating system, and AZ. You can have multiple pools.

Spot fleets will choose the best way to implement depending on the strategy you define.


## Strategies

- `lowestPrice` (default): The Spot Instances come from the pool with the lowest price.
- `InstancePoolsToUseCount`: The Spot Instances are distributed across the number of Spot Instance pools you specify. This parameter is valid only when used in combination with `lowestPrice`.
- `capacityOptimized`: The Spot Instances come from the pool with optimal capacity for the number of instances launching.
- `diversified`: The Spot Instances are distributed across all pools.