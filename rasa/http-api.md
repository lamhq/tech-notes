# Rasa HTTP API

## Model

### Train

Trains a new Rasa model. The new model is not loaded by default.


### Replace the currently loaded model

Updates the currently loaded model. 

- First, tries to load the model from the local storage system. 
- Secondly, tries to load the model from the provided model server configuration. 
- Last, tries to load the model from the provided remote storage.