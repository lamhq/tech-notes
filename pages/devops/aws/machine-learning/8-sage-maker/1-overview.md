# Amazon SageMaker

## Overview

SageMaker is a service to **build, train, deploy ML models** with fully managed infrastructure, tools, and workflows.

Can be used for any generic ML solution.


## Control panel sections

**Ground Truth**. Set up and manage labeling jobs for training datasets using active learning and human labeling.

**Notebook**. Access a managed Jupyter Notebook environment.

**Training**. Train and tune models.

**Inference**. Package and deploy your machine learning models at scale.


## Deployment types

|  | Offline Usage | Online Usage |
|---|---|---|
| Usage | Asynchronous or batch | Synchronous or real time |
| When | Generate predictions for an entire dataset all at once | Generate low-latency predictions |
| Method | SageMaker batch transform | SageMaker hosting services |
| Input Format | Varies depending on algorithm | Varies depending on algorithm |
| Output Format | Varies depending on algorithm | JSON string |


## Stages

1. **Create a Model**. This is the place that will provide predictions for your endpoint.
1. **Create an Endpoint Configuration**. This is where you specify the model to use, inference instance type, instance count, variant name, and weight. This can sometimes be called a production variant.
1. **Create an Endpoint**. This is where the model is published, and you can invoke the model using the InvokeEndpoint () method.


## Model Training

To train a model in AWS, you can use a variety of sources for training data, including the AWS console, SDK, or an S3 bucket.

Once you have your training data, you can load it into SageMaker, which creates a container with a machine learning container inside it.

Once the training is complete, the model artifacts are output to S3. You can then create your model by getting your data from the AWS console, SDK, the model artifacts from the training, and the inference container. This could be an online or offline model.

You can also bring in your own models or buy them on the AWS marketplace.


## Automatic Scaling & High availability

Dynamically add and remove instances to a production variant based on changes in workload.

You define and apply a scaling policy that uses a CloudWatch metric and target value, such as InvocationsPerInstance.

To ensure high availability of SageMaker, Amazon recommends deploying it across multiple AZs. You can deploy SageMaker across two AZs and set up some CloudWatch metrics. If one zone goes down, SageMaker will automatically provision your model in a separate availability zone.


## SageMaker Neo

Customize your machine learning models for specific CPU hardware, such as ARM, Intel, and NVIDIA processors.

It includes a compiler to convert the machine learning model to an environment that is optimized to execute the model on the target architecture.


## Elastic Inference (EI)

EI speeds up throughput and decreases latency of realtime inferences deployed on SageMaker hosted services using only CPU-based instances. It is much more cost-effective than a full GPU instance.

It must be configured when you create a deployable model. El is not available for all algorithms yet.