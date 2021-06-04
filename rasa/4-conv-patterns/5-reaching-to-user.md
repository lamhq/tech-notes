# Reaching Out to the User

Sometimes you want your assistant to reach out to the user without the user's prompting. For example:

- you might want the assistant to send a message when the user opens the chat window
- you might want to prompt the user if they haven't sent a message for a while.

## Reaching out first

In most use cases, when the user opens the chat window with your assistant, you will want the assistant to send the first message. Doing this can give the user an idea of what the bot can or can't do and set them up to have a more successful conversation.

Some messaging or voice channels have existing configuration options to send a payload to the assistant when the user first starts the conversation, but you can also add this option to your own custom channel.

Once you've configured your channel to send a payload, you will need to specify how the assistant should react and greet the user. Below is a guide on how to specify a welcome rule.

### 1. Update the configuration

Since you are using a rule for this behavior, you need to add the RulePolicy to your configuration file:

`config.yml`:

```yml
policies:
  # other policies
  - name: RulePolicy
```

### 2. Add a rule

To have the assistant respond to the intent `greet` with a welcome message only at the beginning of a conversation, add the following rule:

`rules.yml`:

```yml
rules:
  - rule: welcome user
    conversation_start: true  # this rule only applies at the beginning of a conversation
    steps:
      - intent: greet
      - action: utter_welcome
```

### 3. Add a response

`domain.yml`:

```yml
responses:
  utter_welcome:
  - text: Hi there! What can I help you with today?
```


## External Events

Sometimes you want an external device to change the course of an ongoing conversation.

The examples below are from the [reminderbot example bot](https://github.com/RasaHQ/rasa/blob/main/examples/reminderbot), which includes both reminders and external events.

*For example, if you have a moisture-sensor attached to a Raspberry Pi, you could use it to notify you when a plant needs watering via your assistant.*

### 1. Trigger an Intent

To have an event from an external device change the course of an ongoing conversation, you can have the device post to the `trigger_intent` endpoint of your conversation.

The `trigger_intent` endpoint injects a user intent into your conversation. The assistant will then predict and execute the next action as usual.

*For example, the following post request would inject the intent `EXTERNAL_dry_plant` and the `plant` entity into the conversation with id `user123`:*

```sh
curl -H "Content-Type: application/json" -X POST \
  -d '{"name": "EXTERNAL_dry_plant", "entities": {"plant": "Orchid"}}' \
  "http://localhost:5005/conversations/user123/trigger_intent?output_channel=latest"
```

### 2. Get the Conversation ID

In a real-life scenario, your external device would get the conversation ID from an API or a database.

*In the dry plant example, you might have a database of plants, the users that water them, and the users' conversation IDs.*

### 3. Add NLU Training Data

The intent is reserved for use by the Raspberry Pi, so there won't be any NLU training examples for it.

You should name intents that come from other devices with the `EXTERNAL_` prefix because it makes it easier to see which intents are expected to come from external devices when working with your training data.

`domain.yml`:

```yml
intents:
  - EXTERNAL_dry_plant
```

### 4. Update the Domain

To be able to use the entity value directly in a response, define a slot by the same name.

*To tell the assistant which plant needs watering, you can define an entity that you'll post along with the intent.*

`domain.yml`:

```yml
entities:
  - plant

slots:
  plant:
    type: text
    influence_conversation: false
```

### 5. Add a Rule

You'll need a rule that tells your assistant how to respond when it receives a message from the Raspberry Pi.

`rules.yml`

```yml
rules:
  - rule: warn about dry plant
    steps:
    - intent: EXTERNAL_dry_plant
    - action: utter_warn_dry
```

### 6. Add a Response

You'll need to define the response text for `utter_warn_dry`:

`domain.yml`

```yml
responses:
  utter_warn_dry:
  - text: "Your {plant} needs some water!"
```

## Reminders

You can have your assistant reach out to the user after a set amount of time by using Reminders.

The examples below are from the [reminderbot example bot](https://github.com/RasaHQ/rasa/blob/main/examples/reminderbot).
