# Scaling Policies

## Simple Scaling Policy

You specify what to do when a CloudWatch alarm is triggered: **scale in** or **scale out**.

The Auto Scaling group will waits for the health check and **cool down periods to expire** before triggering another scaling activity.

Useful when load is erratic.

### Example

Add 2 instances when the average CPU utilization > 70% and remove 1 instances when it drops below 30%

**Scale Out Policy**:
- Alarm: CPUUtilization > 70%
- Scaling Adjustment: +2 instances
- Cooldown Period: 300 seconds

**Scale In Policy**:
- Alarm: CPUUtilization < 30%
- Scaling Adjustment: -1 instance
- Cooldown Period: 300 seconds


## Step Scaling Policy

Adjust capacity based on a set of scaling adjustments (step adjustments).

Useful when you want to vary adjustments based on the size of the alarm breach.

*For example, you decide to add two more instances in case the CPU utilization is at 85%, and four more instances when it's at 95%.*


## Target Tracking Scaling Policy

Target Tracking use a scaling metric and value that your Auto Scaling Group should maintain at all times.

*Example: maintain `ASGAverageCPUUtilization` = 50%*

To create a target tracking scaling policy, you specify an Amazon CloudWatch metric and a target value that represents the ideal average utilization or throughput level for your application. Amazon EC2 Auto Scaling can then scale out your group to handle peak traffic, and scale in your group to reduce costs during periods of low utilization or throughput.
