# Deploying Your Rasa Assistant

## When to Deploy Your Assistant

The best time to deploy your assistant and make it available to test users is once it can handle the most important happy paths or is what we call a minimum viable assistant.

Minimum Viable Assistant is a basic assistant that can handle the most important happy path stories.


## Rasa Open Source Only Deployment

It is also possible to deploy a Rasa assistant without Rasa X using Docker Compose. To do so, you can build your Rasa Assistant locally or in Docker. Then you can deploy your model in Docker Compose.


## Building a Rasa Assistant in Docker

Docker image to use: `rasa/rasa:2.6.3-full`

All rasa/rasa image tags start with a version number. The current version is 2.6.3. The tags are:

- `{version}`
- `{version}-full`
- `{version}-spacy-en`
- `{version}-spacy-de`
- `{version}-mitie-en`

The `{version}-full` tag includes all possible pipeline dependencies, allowing you to change your `config.yml` as you like without worrying about missing dependencies. 

The plain `{version}` tag includes all the dependencies you need to run the default pipeline created by rasa init.

To keep images as small as possible, we also publish different tags of the `rasa/rasa` image with different dependencies installed. See [Additional Dependencies](https://rasa.com/docs/rasa/installation#additional-dependencies)

If your model has a dependency that is not included in any of the tags (for example, a different spaCy language model), you can build a docker image that extends the `rasa/rasa` image.


## Custom Actions

If you use Custom Actions, your actions will run on a separate server from your Rasa server.

Docker image to use: `rasa/rasa-sdk:2.6.0`

Run your action server with docker:

```sh
docker run -d -v $(pwd)/actions:/app/actions --net my-project --name action-server rasa/rasa-sdk:2.6.0
```

To instruct the Rasa server to use the action server, you have to tell Rasa its location. Add this endpoint to your `endpoints.yml`, referencing the `--name` you gave the server (in this example, `action-server`):

```yml
action_endpoint:
  url: "http://action-server:5055/webhook"
```