# Text Classification

## Text classification using BlazingText algorithm

### Download data

```sh
aws s3 cp s3://amazon-reviews-pds/tsv/amazon_reviews_us_Camera_v1_00.tsv.gz /tmp
```

### Processing data

```py
import pandas as pd
import numpy as np

data = pd.read_csv('/tmp/amazon_reviews_us_Camera_v1_00.tsv.gz',
    sep='\t',
    compression='gzip',
    error_bad_lines=False,
    dtype='str'
)
data.dropna(inplace=True)
print(data.shape)
print(data.columns)

# get the first 100,000 lines
data = data[:100000]

# drop all columns except star_rating, review_body
data = data[['star_rating', 'review_body']]

# add a new column `label`
data['label'] = data.star_rating.map({
    '1': '__label__negative__',
    '2': '__label__negative__',
    '3': '__label__neutral__',
    '4': '__label__positive__',
    '5': '__label__positive__'
})
data = data.drop(['star_rating'], axis=1)

# move the label column to the front
data = data[['label', 'review_body']]

# convert text to space-separated tokens
import nltk
nltk.download('punkt')
data['review_body'] = data['review_body'].apply(nltk.word_tokenize)
data['review_body'] = data.apply(lambda row: " ".join(row['review_body']).lower(), axis=1)

# prepare dataset for training and validation
from sklearn.model_selection import train_test_split
import numpy as np
training, validation = train_test_split(data, test_size=0.05)
np.savetxt('/tmp/training.txt', training.values, fmt='%s')
np.savetxt('/tmp/validation.txt', validation.values, fmt='%s')

# upload data to s3 for training
import boto3, sagemaker
session = sagemaker.Session()
bucket = session.default_bucket()
prefix = 'amazon-reviews'
s3_train_path = session.upload_data(path=f'{data_dir}/training.txt', bucket=bucket, key_prefix=prefix+'/input/train')
s3_val_path = session.upload_data(path=f'{data_dir}/validation.txt', bucket=bucket, key_prefix=prefix+'/input/validation')
s3_output = 's3://{}/{}/output/'.format(bucket, prefix)
```

### Train and deploy model

```py
# Configuring a training job
from sagemaker import image_uris
region = boto3.Session().region_name
container = image_uris.retrieve('blazingtext', region)
print(container)

role = sagemaker.get_execution_role()
bt = sagemaker.estimator.Estimator(container,
    role,
    instance_count=1,
    instance_type='ml.c5.2xlarge',
    output_path=s3_output
)
bt.set_hyperparameters(mode='supervised')
train_data = sagemaker.TrainingInput(s3_train_path,
    distribution='FullyReplicated',
    content_type='text/plain',
    s3_data_type='S3Prefix'
)
validation_data = sagemaker.TrainingInput(s3_val_path,
    distribution='FullyReplicated',
    content_type='text/plain',
    s3_data_type='S3Prefix'
)
s3_channels = {'train': train_data, 'validation': validation_data}

# Launching a training job
bt.fit(inputs=s3_channels)

# Deploying a model
bt_predictor = bt.deploy(initial_instance_count=1, instance_type='ml.t2.medium')
```

### Use model for prediction

```py
import json
import pprint
sentences = [
    'This is a bad camera it doesnt work at all , i want a refund  .',
    'The camera works , the pictures are decent quality, nothing special to say about it .',
    'Very happy to have bought this , exactly what I needed'
]
payload = {"instances" : sentences, "configuration": {"k": 3}}
bt_predictor.serializer = sagemaker.serializers.JSONSerializer()
response = bt_predictor.predict(payload)
print(response)
```

### Cleaning up

```py
bt_predictor.delete_endpoint()
```

## Text classification using Scikit Learn framework

### Download data

```sh
aws s3 cp s3://amazon-reviews-pds/tsv/amazon_reviews_us_Camera_v1_00.tsv.gz /tmp
```

### Vanilla code

```py
import os
import requests
import zipfile
from io import BytesIO
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import precision_recall_fscore_support

data_dir = f'{os.getcwd()}/chatbot'
vec = CountVectorizer(ngram_range=(1,3), min_df=3, strip_accents='ascii')
clf = MultinomialNB(fit_prior=True)

def train():
    # load csv
    df = pd.read_csv(f'{data_dir}/data.csv',
        header=0,
        names=['label', 'text']
    )

    # prepare training data
    df_train, df_test = train_test_split(df,
        test_size=0.3,
        random_state=42,
        stratify=df['label']
    )
    x_train = vec.fit_transform(df_train['text'])
    y_train = df_train['label']
    x_test = vec.transform(df_test['text'])
    y_test = df_test['label']

    # train
    clf.fit(x_train, y_train)

    # show accuracy
    y_test_pred = clf.predict(x_test)
    p, r, f, s = precision_recall_fscore_support(y_test, y_test_pred)
    prec_df = pd.DataFrame(
        {
            'Precision': p,
            'Recall': r,
            'F': f,
            'Support': s,
        }
    ).round(2)
    print(prec_df)


def predict(text):
    test = vec.transform([text])
    pred = clf.predict(test)
    return pred[0]

train()
res = predict("hello")
print(res)
```


### Entry point script

`train.py`

```py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import precision_recall_fscore_support
import joblib
import argparse, os
import json

def model_fn(model_dir):
    model = joblib.load(os.path.join(model_dir, 'model.joblib'))
    return model

def input_fn(request_body, request_content_type):
    return request_body


def predict_fn(input_data, model):
    clf, vec = model
    # convert input_data to vector so that it is ready to be sent to our model.
    input_vec = vec.transform([input_data])
    prediction = clf.predict(input_vec)
    return prediction[0]


def output_fn(prediction, content_type):
    return json.dumps(prediction)


# python train.py --test-size 0.3 --training . --model-dir .
if __name__ == '__main__':
    # read arguments
    parser = argparse.ArgumentParser()
    parser.add_argument('--test-size', type=float, default=0.4)
    parser.add_argument('--random-state', type=int, default=123)
    parser.add_argument('--model-dir', type=str, default=os.environ['SM_MODEL_DIR'])
    parser.add_argument('--training', type=str, default=os.environ['SM_CHANNEL_TRAINING'])

    args, _ = parser.parse_known_args()
    test_size = args.test_size
    random_state = args.random_state
    model_dir  = args.model_dir
    training_dir = args.training

    # read data
    filename = os.path.join(training_dir, 'data.csv')
    data = pd.read_csv(filename, header=0, names=['label', 'text'])

    # prepare training data
    df_train, df_test = train_test_split(data, test_size=test_size, random_state=random_state)
    vec = CountVectorizer(ngram_range=(1,3), min_df=3, strip_accents='ascii')
    x_train = vec.fit_transform(df_train['text'])
    y_train = df_train['label']
    x_test = vec.transform(df_test['text'])
    y_test = df_test['label']

    # train
    clf = MultinomialNB(fit_prior=True)
    clf.fit(x_train, y_train)

    model = os.path.join(model_dir, 'model.joblib')
    joblib.dump([clf, vec], model)
```

### Setup and deploy script

```py
import sagemaker

# 1.1 use this code if you want to train and deploy locally
training = 'file://data.csv'
output   = 'file://.'
print(training)
print(output)

role = 'arn:aws:iam::536023322294:role/service-role/AmazonSageMaker-ExecutionRole-20210427T204575'
est_instance_type='local'
dep_instance_type='local'

# 1.2 use this code if you want to train and deploy using SageMaker managed infrastructure
sess = sagemaker.Session()
bucket = sess.default_bucket()
prefix = 'text-cls'
training = sess.upload_data(path='data.csv', key_prefix=prefix + "/training")
output   = 's3://{}/{}/output/'.format(bucket,prefix)
print(training)
print(output)

role = sagemaker.get_execution_role()
est_instance_type='ml.m5.large'
dep_instance_type='ml.t2.medium'

# 2. Launch a training job
from sagemaker.sklearn import SKLearn

sk = SKLearn(entry_point='train.py',
    role=role,
    framework_version='0.23-1',
    instance_count=1,
    instance_type=est_instance_type,
    output_path=output,
    hyperparameters={
        'random-state': 123,
        'test-size': 0.3
    }
)

sk.fit({'training':training})

# 3. Deploy
sk_predictor = sk.deploy(initial_instance_count=1, instance_type=dep_instance_type)

# 4. Predict
sk_predictor.content_type = 'application/json'
sk_predictor.serializer = sagemaker.serializers.JSONSerializer()
sk_predictor.deserializer = sagemaker.deserializers.JSONDeserializer()
sk_predictor.predict('Good case, Excellent value')

# 5. Clean up
sk_predictor.delete_endpoint()
```