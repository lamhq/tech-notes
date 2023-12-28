# Basic Operations

## Setting up Amazon SageMaker on your local machine

```sh
# create virtual environment
python3 -m venv sagemaker
source sagemaker/bin/activate

pip install boto3 sagemaker pandas
```

Verify installation:

```py
import boto3
import sagemaker
print(boto3.__version__)
print(sagemaker.__version__)
```

Install Jupyter

```sh
pip install ipykernel
python3 -m ipykernel install --user --name=sagemaker
jupyter notebook
```

## Invoking an existing endpoint

```py
from sagemaker.predictor import Predictor
predictor = Predictor(
    endpoint_name = tf_endpoint_name,
    content_type = sagemaker.serializers.JSONSerializer.CONTENT_TYPE,
    serializer = sagemaker.serializers.JSONSerializer()
)
predictor.predict(...)
```


## Update endpoint to capture data

```py
from sagemaker.predictor import Predictor
predictor = Predictor(
    endpoint_name = tf_endpoint_name,
    content_type = sagemaker.serializers.JSONSerializer.CONTENT_TYPE,
    serializer = sagemaker.serializers.JSONSerializer()
)

from sagemaker.model_monitor.data_capture_config import DataCaptureConfig

capture_path = 's3://{}/{}/capture'.format(bucket, prefix)

ll_predictor = ll_estimator.deploy(endpoint_name=endpoint_name,
    initial_instance_count=1,
    instance_type='ml.t2.medium',
    data_capture_config=DataCaptureConfig(
        enable_capture=True,                     # Capture data
        sampling_percentage=100,
        capture_options=['REQUEST', 'RESPONSE'], # Default value
        destination_s3_uri=capture_path          # Save data here
    )
)
```
