# Develop AWS Glue job scripts

When you develop and test your AWS Glue for Spark job scripts, there are multiple available options:
- AWS Glue Studio console
- Interactive sessions
- Docker image (local)
- AWS Glue ETL library (local)

There are some [limitations](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-etl-libraries.html#local-dev-restrictions) with local development.


## AWS Glue Studio console

Options:
- AWS Glue Studio visual editor: if you prefer no code or less code experience
- AWS Glue Studio notebook: if you prefer an interactive notebook experience


## Interactive sessions

Interactive sessions allow you to build and test script using local Notebook.


## Docker image (local)

You can develop and test AWS Glue jobs in a Docker container without incurring AWS Glue cost.

You can use your preferred IDE, notebook, or REPL using AWS Glue ETL library.

Local development with the Docker image is **recommended**, as it provides an environment properly configured for the use of AWS Glue ETL library.

Docker images for AWS Glue are available on Docker Hub.

Docker image: `amazon/aws-glue-libs:glue_libs_4.0.0_image_01`.

To set up docker for local development:

1. Set up AWS credentials:
    ```filename="~/.aws/config"
    [default]
    region = us-east-1
    ```
    ```filename="~/.aws/credentials"
    [default]
    aws_access_key_id = 
    aws_secret_access_key = 
    ```

2. Pull the image:
    ```sh
    docker pull amazon/aws-glue-libs:glue_libs_4.0.0_image_01
    ```

To run a python script with **spark-submit**:
```sh
docker run -it --rm \
  --name glue_spark_submit \
  -v ~/.aws:/home/glue_user/.aws \
  -v ./:/home/glue_user/workspace/ \
  -e AWS_PROFILE=default \
  -e DISABLE_SSL=true \
  -p 4040:4040 \
  -p 18080:18080 \
  amazon/aws-glue-libs:glue_libs_4.0.0_image_01 \
  spark-submit \
  home/glue_user/workspace/script.py
```

To develop with VS Code, create a Dev Container setting:
```json filename=".devcontainer/devcontainer.json"
{
	"name": "AWS GLue",
	"image": "amazon/aws-glue-libs:glue_libs_4.0.0_image_01",
	"mounts": [
		"source=${localEnv:HOME}/.aws,target=/home/glue_user/.aws,type=bind,consistency=cached"
	]
}
```

View the official instructions [here](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-etl-libraries.html#develop-local-docker-image).


## Installing AWS Glue ETL library (local)

If you prefer local development without Docker, installing the AWS Glue ETL library locally.

View the instructions [here](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-etl-libraries.html#develop-local-python).
