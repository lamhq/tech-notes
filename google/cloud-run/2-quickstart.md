# Quickstart

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
