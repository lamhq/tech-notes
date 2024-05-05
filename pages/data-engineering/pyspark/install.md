# Installing PySpark

## Homebrew (macOS)

Install JDK:
```shell
brew install openjdk@11
```

You need to install a Java version that is compatible with the PySpark you going to install.


Install PySpark:
```shell
pip install pyspark
```

Validate PySpark Install by running the PySpark shell:
```shell
pyspark
```


## Using Docker

Setting up PySpark by itself can be challenging too because of all the required dependencies (JVM and underlying Java infrastructure).

Run the following command to download and launch a Docker container with a pre-built PySpark single-node setup include with Jupyter Notbook:

```shell
docker run -p 8888:8888 jupyter/pyspark-notebook
```

### Jupyter Notebook

To access Jupyter Notebook, copy and paste the URL from command output into the browser:

```
http://127.0.0.1:8888/?token=80149acebe00b2c98242aa9b87d24739c78e562f849e4437
```

![](https://files.realpython.com/media/jupyter_notebook_homepage.99427f629127.png)


### CLI

Connect to the bash shell inside the container:

```shell
docker exec -it <container_id> bash
```

Execute PySpark code on a cluster:

```shell
/usr/local/spark/bin/spark-submit hello_world.py
```


### PySpark Shell

The PySpark shell is an interactive environment for running PySpark code.

Connect to the container’s CLI. Then, start the PySpark shell:
```py
/usr/local/spark/bin/pyspark
```
