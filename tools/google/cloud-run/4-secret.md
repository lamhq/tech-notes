# Using secrets

You can make a secret available to your containers in either of two ways:

- Mount each secret as a volume, which makes the secret available to the container as files.
- Pass a secret using environment variables. 

## Allowing Cloud Run to access a secret

In order to allow a Cloud Run service to access the secret, you must grant the **Secret Manager Secret Accessor** role to the **Cloud Run service account**:

1. Go to the [Secret Manager page in the Cloud Console](https://console.cloud.google.com/security/secret-manager)
2. Select the secret and in the right side permissions tab, click **Add Member**.
3. In the *New members* textbox, enter the **service account email** for your Cloud Run service.
4. Grant it the role **Secret Manager Secret Accessor**.


## Making a secret accessible to a service

To expose the secret as an environment variable **when deploying** a service:

```sh
gcloud beta run deploy SERVICE --image IMAGE_URL --update-secrets=ENV_VAR_NAME=SECRET_NAME:VERSION
```

Replace:

- `SERVICE` with the name of your service.
- `IMAGE_URL` with a reference to the container image, for example, `gcr.io/myproject/my-image:latest`
- `ENV_VAR_NAME` with the name of the environment variable you want to use with the secret.
- `SECRET_NAME` with the secret name.
- `VERSION` with the secret version. Use `latest` for latest version, or an integer, for example, 2.

To **update existing secrets**, enter the following command:

```sh
gcloud beta run deploy SERVICE --image IMAGE_URL \
--update-secrets=ENV_VAR_NAME=SECRET_NAME:VERSION
```

## Viewing secrets settings

```sh
gcloud run services describe SERVICE
```

## Deleting secret

```sh
gcloud secrets delete 'SMTP_USER' --quiet
```

## List secrets

```sh
gcloud secrets list
```
