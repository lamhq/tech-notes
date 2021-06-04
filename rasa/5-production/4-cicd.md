# Setting up CI/CD

Continous Integration (CI) is the practice of merging in code changes frequently and automatically testing changes as they are committed. 

Continuous Deployment (CD) means automatically deploying integrated changes to a staging or production environment.

## Continuous Integration (CI)

It is usually best to run CI checks on merge / pull requests or on commit. Most tests are quick enough to run on every change.

Your CI pipeline should include model training and testing as steps to streamline the deployment process.

The first step of saving new training data can be initiated manually or when you create or update a pull request.

Next, you need to run various sets of test to see the impact of your changes. This includes running tests for data validation, NLU cross validation, and story testing.

The last step is to review the results of your test and push the changes if the tests are successful.

Once the new model is trained and tested, it can be deployed automatically using a Continuous Deployment pipeline.

## Continuous Deployment (CD)

CD steps usually run on push or merge to a certain branch, once CI checks have succeeded.

If you ran test stories in your CI pipeline, you'll already have a trained model. You can set up your CD pipeline to upload the trained model to your Rasa server if the CI results are satisfactory.

### Deploying Your Rasa Model

If you ran test stories in your CI pipeline, you'll already have a trained model. You can set up your CD pipeline to upload the trained model to your Rasa server if the CI results are satisfactory.


### Deploying Your Action Server

You can automate [building and uploading a new image for your action server](https://rasa.com/docs/rasa/how-to-deploy#building-an-action-server-image) to an image repository for each update to your action code.

As noted above, be careful with automatically deploying a new image tag to production if the action server would be incompatible with the current production model.