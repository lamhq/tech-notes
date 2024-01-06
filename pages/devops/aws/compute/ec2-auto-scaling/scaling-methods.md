# Scaling methods

## Maintain
- Keep a specific or minimum number of instances running.
- Use when you always need a known number of instances running at all times

## Manual
- Manually change desired capacity
- Use when your needs change rarely enough that you’re ok the make manual changes

## Scheduled
- Increase or decrease the number of instances based on a schedule.
- Useful for predictable workload, ensuring enough instances are available before busy times

## Dynamic
- Scale based on real-time system metrics (e.g. CloudWatch metrics).
- Useful for changing capacity based on system utilization, e.g. CPU hits 80%.
- Supported policies: Target tracking scaling, Step scaling, Simple scaling

## Predictive
- Use machine learning algorithms to determine when you'll need to scale.
- Useful for when capacity, and number of instances is unknown.
- They are re-evaluated every 24 hours to create a forecast for the next 48 hours
