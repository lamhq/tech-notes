# Deploy

## Deploy an existing TensorFlow model

```sh
tar tvfz model.tar.gz
```

```py
import sagemaker

# upload model artifact to s3
sess = sagemaker.Session()
role = sagemaker.get_execution_role()
prefix = 'byo-tf'
model_path = sess.upload_data(path='model.tar.gz', key_prefix=prefix)
print(model_path)

# create an estimator
from sagemaker.tensorflow.model import TensorFlowModel
tf_model = TensorFlowModel(
    model_data=model_path,
    framework_version='2.1.0',
    role=role)
type(tf_model)

# deploy model
import time
tf_endpoint_name = 'keras-tf-fmnist-'+time.strftime("%Y-%m-%d-%H-%M-%S", time.gmtime())
tf_predictor = tf_model.deploy(
    initial_instance_count=1,
    instance_type='ml.m5.large',
    endpoint_name=tf_endpoint_name
)

tf_predictor.content_type = 'application/json'
tf_predictor.serializer = sagemaker.serializers.JSONSerializer()
tf_predictor.predict(...)
```


## Deploy an existing model with AWS CloudFormation

`endpoint-one-model.yml` (cloudformation template):

```yml
AWSTemplateFormatVersion: 2010-09-09

Parameters:
  ModelName:
    Description: Model name
    Type: String
  ModelDataUrl:
    Description: Location of model artefact
    Type: String
  ContainerImage:
    Description: The container used to deploy the model
    Type: String
  InstanceType:
    Description: Instance type
    Type: String
    Default: ml.m5.large
  InstanceCount:
    Description: Instance count
    Type: String
    Default: 1
  RoleArn:
    Description: Execution Role ARN
    Type: String

Resources:
  Model:
    Type: "AWS::SageMaker::Model"
    Properties:
      Containers:
        -
          Image: !Ref ContainerImage
          ModelDataUrl: !Ref ModelDataUrl
      ExecutionRoleArn: !Ref RoleArn
      ModelName: !Ref ModelName

  Endpoint:
    Type: "AWS::SageMaker::Endpoint"
    Properties:
      EndpointConfigName: !GetAtt EndpointConfig.EndpointConfigName
      #Using a custom name will prevent updates with change sets
      #EndpointName: !Ref EndpointName

  EndpointConfig:
    Type: "AWS::SageMaker::EndpointConfig"
    Properties:
      ProductionVariants:
        -
          ModelName: !GetAtt Model.ModelName
          VariantName: variant-1
          InitialInstanceCount: !Ref InstanceCount
          InstanceType: !Ref InstanceType
          InitialVariantWeight: 1.0
      #Using a custom name will prevent updates with change sets
      #EndpointConfigName: !Ref EndpointConfigName

Outputs:
  EndpointId:
    Value: !Ref Endpoint
  EndpointName:
    Value: !GetAtt Endpoint.EndpointName
```

```py
import boto3

sm = boto3.client('sagemaker')
cf = boto3.client('cloudformation')

# Getting model location from an existing training job
# (Update this with your own model name)
training_job = 'tensorflow-training-2020-06-08-07-46-04-367'
job = sm.describe_training_job(TrainingJobName=training_job)
model_data_url = job['ModelArtifacts']['S3ModelArtifacts']
role_arn       = job['RoleArn']

# Define a docker container for running model
# https://github.com/aws/deep-learning-containers/blob/master/available_images.md
container_image = '763104351884.dkr.ecr.us-east-1.amazonaws.com/tensorflow-inference:2.1.0-cpu-py36-ubuntu18.04'

import time
timestamp = time.strftime("%Y-%m-%d-%H-%M-%S", time.gmtime())
stack_name='endpoint-one-model-'+timestamp
print(stack_name)

# Create one-model endpoint
with open('endpoint-one-model.yml', 'r') as f:
        response = cf.create_stack(StackName=stack_name,
            TemplateBody=f.read(),
            Parameters=[
                {"ParameterKey":"ModelName",     "ParameterValue":training_job+'-'+timestamp},
                {"ParameterKey":"ContainerImage","ParameterValue":container_image},
                {"ParameterKey":"ModelDataUrl",  "ParameterValue":model_data_url},
                {"ParameterKey":"RoleArn",       "ParameterValue":role_arn}
            ]
        )
        print(response)

# wait for completion
waiter = cf.get_waiter('stack_create_complete')
waiter.wait(StackName=stack_name)

# display stack events
response = cf.describe_stack_events(StackName=stack_name)
for e in response['StackEvents']:
    print('%s %s' % (e['ResourceType'], e['ResourceStatus']))

# display endpoint name from stack's output
response = cf.describe_stacks(StackName=stack_name)
print(response['Stacks'][0]['StackStatus'])
for o in response['Stacks'][0]['Outputs']:
    if o['OutputKey']=='EndpointName':
        endpoint_name = o['OutputValue']
print(endpoint_name)
```

### Update endpoint using change set

```py
# create change set
response = cf.create_change_set(
    StackName=stack_name,
    ChangeSetName='add-instance',
    UsePreviousTemplate=True,
    Parameters=[
        {"ParameterKey":"InstanceCount", "ParameterValue": "2"},
        {"ParameterKey":"ModelName",     "UsePreviousValue": True},
        {"ParameterKey":"ContainerImage","UsePreviousValue": True},
        {"ParameterKey":"ModelDataUrl",  "UsePreviousValue": True},
        {"ParameterKey":"RoleArn",       "UsePreviousValue": True}
    ]
)

# wait for change set to be created
waiter = cf.get_waiter('change_set_create_complete')
waiter.wait(
    StackName=stack_name,
    ChangeSetName='add-instance'
)

response = cf.describe_change_set(
    StackName=stack_name,
    ChangeSetName='add-instance'
)

# execute change set
response = cf.execute_change_set(
    StackName=stack_name,
    ChangeSetName='add-instance'
)

response = cf.describe_stacks(StackName=stack_name)

print(response['Stacks'][0]['StackStatus'])
response = cf.describe_stack_events(StackName=stack_name)

for e in response['StackEvents']:
    print('%s %s' % (e['ResourceType'], e['ResourceStatus']))

# wait for stack updated
waiter = cf.get_waiter('stack_update_complete')
waiter.wait(StackName=stack_name)

# display updated endpoint's instance count
response = sm.describe_endpoint(EndpointName=endpoint_name)
response['ProductionVariants'][0]['CurrentInstanceCount']
```

## Automate training and deployment for a Scikit-Learn model with AWS Step Functions

```sh
pip -q install sagemaker==1.71.1
pip -q install stepfunctions --upgrade
```

```py
import boto3
import sagemaker
import stepfunctions

from stepfunctions import steps
from stepfunctions.steps import TrainingStep, ModelStep, EndpointConfigStep, EndpointStep, TransformStep, Chain
from stepfunctions.inputs import ExecutionInput
from stepfunctions.workflow import Workflow

# Enter your role ARN
workflow_execution_role = "arn:aws:iam::123456789012:role/StepFunctionsWorkflowExecutionRole"
sess = sagemaker.Session()
bucket = sess.default_bucket()
role   = sagemaker.get_execution_role()
prefix = 'sklearn-boston-housing-stepfunc'

# upload training data
training_data = sess.upload_data(path='housing.csv', key_prefix=prefix + "/training")
output   = 's3://{}/{}/output/'.format(bucket,prefix)
print(training_data)
print(output)

# upload batch transform data
import pandas as pd
data = pd.read_csv('housing.csv')
data.head()
data.drop(['medv'], axis=1, inplace=True)
data.to_csv('test.csv', index=False, header=False)
batch_data = sess.upload_data(path='test.csv', key_prefix=prefix + "/batch")

# create an estimator
from sagemaker.sklearn import SKLearn
sk = SKLearn(entry_point='sklearn-boston-housing.py',
    role=role,
    framework_version='0.20.0',
    instance_count=1,
    instance_type='ml.m5.large',
    output_path=output,
    hyperparameters={
        'normalize': True,
        'test-size': 0.1
    }
)

# define steps
execution_input = ExecutionInput(schema={
    'JobName': str,
    'ModelName': str,
    'EndpointName': str
})
training_step = TrainingStep(
    'Train a Scikit-Learn script on the Boston Housing dataset',
    estimator=sk,
    data={'training': sagemaker.TrainingInput(training_data, content_type='text/csv')},
    job_name=execution_input['JobName']
)
model_step = ModelStep(
    'Create the model in SageMaker',
    model=training_step.get_expected_model(),
    model_name=execution_input['ModelName']
)
transform_step = TransformStep(
    'Transform the dataset in batch mode',
    transformer=sk.transformer(instance_count=1, instance_type='ml.m5.large'),
    job_name=execution_input['JobName'],
    model_name=execution_input['ModelName'],
    data=batch_data,
    content_type='text/csv'
)
endpoint_config_step = EndpointConfigStep(
    "Create an endpoint configuration for the model",
    endpoint_config_name=execution_input['ModelName'],
    model_name=execution_input['ModelName'],
    initial_instance_count=1,
    instance_type='ml.m5.large'
)
endpoint_step = EndpointStep(
    "Create an endpoint hosting the model",
    endpoint_name=execution_input['EndpointName'],
    endpoint_config_name=execution_input['ModelName']
)

# define workflow
import time
timestamp = time.strftime("%Y-%m-%d-%H-%M-%S", time.gmtime())
workflow_definition = Chain([
    training_step,
    model_step,
    transform_step,
    endpoint_config_step,
    endpoint_step
])
workflow = Workflow(
    name='sklearn-boston-housing-workflow1-{}'.format(timestamp),
    definition=workflow_definition,
    role=workflow_execution_role,
    execution_input=execution_input
)

# create and run workflow
workflow.render_graph(portrait=True)
workflow.create()
execution = workflow.execute(
    inputs={
        'JobName': 'sklearn-boston-housing-{}'.format(timestamp),
        'ModelName': 'sklearn-boston-housing-{}'.format(timestamp),
        'EndpointName': 'sklearn-boston-housing-{}'.format(timestamp)
    }
)
execution.render_progress()
execution.list_events(html=True)
workflow.list_executions(html=True)
Workflow.list_workflows(html=True)
```