# Quickstart

## Before you begin

1. Make sure that billing is enabled for your Cloud project. 
2. Install and initialize the Cloud SDK.
3. Create a project by go to [project selector](https://console.cloud.google.com/projectselector2/home/dashboard)


## Deploy a Prebuilt Sample Container

1. In the [Google Cloud Console](https://console.cloud.google.com), on the project selector page, select or create a Google Cloud project.
2. Go to [Cloud Run](https://console.cloud.google.com/run), click **Create service**

![](https://cloud.google.com/run/docs/images/create-service-form.png)

3. Select the region where you want your service located: `asia-southeast1` (Singapore)
4. Select **Deploy one revision from an existing container image**.

![](https://cloud.google.com/run/docs/images/create-service-form2.png)

5. Use `us-docker.pkg.dev/cloudrun/container/hello` as the container image.
6. Click Create to deploy the image to Cloud Run and wait for the deployment to finish.
7. Click the displayed URL link to run the deployed container.


## Build and deploy a Node.js service

1. [Create a Node.js app](https://github.com/GoogleCloudPlatform/nodejs-docs-samples/tree/436c0ca99ebedf781c23566560c995bcc6fc76b8/run/helloworld)
2. Create a `Dockerfile`
3. Add a `.dockerignore` file
4. Build your container image using Cloud Build and upload it to Container Registry

```sh
gcloud builds submit --tag gcr.io/PROJECT-ID/helloworld
```

5. Deploy using the following command:

```sh
gcloud run deploy --image gcr.io/PROJECT-ID/helloworld
```

- You will be prompted for the service name: press Enter to accept the default name, `helloworld`.
- You will be prompted for region: select the region of your choice, for example `us-central1`.
- You will be prompted to **allow unauthenticated invocations**: respond `y`.

You can get `PROJECT-ID` by running: 

```sh
gcloud config get-value project
````
