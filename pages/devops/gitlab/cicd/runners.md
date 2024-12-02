# Runners

## Hosted runner

### Pricing

Pricing depends on your subscription plan, charged per compute minute. 

- **Free Tier**: 400 compute minutes per month
- **Premium Tier**: $29 per user/month (billed annually), includes 10,000 compute minutes per month
- **Ultimate Tier**: $39 per user/month (billed annually), includes 50,000 compute minutes per month


### Machine Types

To use a machine type, add a `tags: keyword` to your job:
```yml
job_medium:
  tags:
    - saas-linux-medium-amd64
  script:
    - echo "This job runs on the medium Linux x86-64 instance"

job_large:
  tags:
    - saas-linux-large-arm64
  script:
    - echo "This job runs on the large Linux Arm64 instance"
```

Untagged jobs will run on the `small` Linux x86-64 runner.

See [machine types available for Linux - x86-64](https://docs.gitlab.com/ee/ci/runners/hosted_runners/linux.html#machine-types-available-for-linux---x86-64).
