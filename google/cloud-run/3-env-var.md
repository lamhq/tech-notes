# Using Environment Variables

The `PORT` environment variable is injected inside your container by Cloud Run. You should not set it yourself.

Any configuration change leads to the creation of a new revision.

You can set environment variables using the Cloud Console, the gcloud command line, or a YAML file

## Specify environment variables when deploying

You can specify environment variables while deploying a service:

```sh
gcloud run deploy [SERVICE] --image IMAGE_URL --update-env-vars KEY1=VALUE1,KEY2=VALUE2
```

## Update environment variables

```sh
gcloud run services update SERVICE --update-env-vars KEY1=VALUE1,KEY2=VALUE2
```

- Replace `SERVICE` with the name of your service.
- Replace `KEY1=VALUE1,KEY2=VALUE2`, with the comma separated list of desired variable names and their values.
- Replace `IMAGE_URL` with a reference to the container image, for example, `gcr.io/myproject/my-image:latest`.


## Specify multiple variables

If you have too many environment variables that cannot be easily listed in `KEY1=VALUE1,KEY2=VALUE2` format, you can alternatively repeat the flags listed above multiple times:

```sh
gcloud run services update SERVICE \
  --set-env-vars "KEY1=VALUE1" \
  --set-env-vars "KEY2=VALUE2" \
  --set-env-vars "KEY3=VALUE3"
```

## Escape `,` character

if your environment variable contains comma characters as values, you need to escape those delimiters by specifying a different delimiter character, for example, `@`:

```sh
gcloud run services update SERVICE \
  --set-env-vars "^@^KEY1=value1,value2,value3@KEY2=..."
```

## Viewing environment variables settings

```sh
gcloud run services describe SERVICE
```