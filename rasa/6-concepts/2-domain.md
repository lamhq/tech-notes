# Domain

The domain defines the universe in which your assistant operates. It specifies the intents, entities, slots, responses, forms, and actions your bot should know about. It also defines a configuration for conversation sessions.

```yml
version: "2.0"

intents:
  - affirm
  - deny
  - greet
  - thankyou
  - goodbye
  - search_concerts
  - search_venues
  - compare_reviews
  - bot_challenge
  - nlu_fallback
  - how_to_get_started

entities:
  - name

slots:
  concerts:
    type: list
    influence_conversation: false
  venues:
    type: list
    influence_conversation: false
  likes_music:
    type: bool
    influence_conversation: true

responses:
  utter_greet:
    - text: "Hey there!"
  utter_goodbye:
    - text: "Goodbye :("
  utter_default:
    - text: "Sorry, I didn't get that, can you rephrase?"
  utter_youarewelcome:
    - text: "You're very welcome."
  utter_iamabot:
    - text: "I am a bot, powered by Rasa."
  utter_get_started:
    - text: "I can help you find concerts and venues. Do you like music?"
  utter_awesome:
    - text: "Awesome! You can ask me things like \"Find me some concerts\" or \"What's a good venue\""

actions:
  - action_search_concerts
  - action_search_venues
  - action_show_concert_reviews
  - action_show_venue_reviews
  - action_set_music_preference

session_config:
  session_expiration_time: 60  # value in minutes
  carry_over_slots_to_new_session: true
```

## Multiple Domain Files

The domain can be defined as a single YAML file or split across multiple files in a directory. When split across multiple files, the domain contents will be read and automatically merged together.

Using the command line interface, you can train a model with split domain files by running:

```sh
rasa train --domain path_to_domain_directory
```

## Intents

The `intents` key in your domain file lists all intents used in your NLU data and conversation training data.

### Ignoring Entities for Certain Intents

To ignore all entities for certain intents:

```yml
intents:
  - greet:
      use_entities: []
```

To ignore some entities or explicitly take only certain entities into account you can use this syntax:

```yml
intents:
- greet:
    use_entities:
      - name
      - first_name
    ignore_entities:
      - location
      - age
```

## Entities

The `entities` section lists all entities that can be extracted by any entity extractor in your NLU pipeline

## Slot

### Slots and Conversation Behavior

When defining a slot, if you leave out `influence_conversation` or set it to `true`, that slot will influence the next action prediction, unless it has slot type `any`.

*The following example defines a slot `home_city` that influences the conversation. A `text` slot will influence the assistant's behavior depending on whether the slot has a value. The specific value of a `text` slot (e.g. Bangalore or New York or Hong Kong) doesn't make any difference.*

```yml
slots:
  # this slot will influence the conversation depending on
  # whether the slot is set or not
  home_city:
    type: text
    influence_conversation: true
```

*As an example, consider the two inputs **"What is the weather like?"** and **"What is the weather like in Bangalore?"** The conversation should diverge based on whether the `home_city` slot was set automatically by the NLU. If the slot is already set, the bot can predict the `action_forecast` action. If the slot is not set, it needs to get the `home_city` information before it is able to predict the weather.*


### Slot Types

See https://rasa.com/docs/rasa/domain#slot-types

### Slot Auto-fill

The slot will be set automatically if your NLU model picks up an entity, and your domain contains a slot with the same name, and the following conditions are met:

1. `store_entities_as_slots` is set to true
2. the slot's `auto_fill` property is set to true

To disable auto-filling for a particular slot, you can set the `auto_fill` attribute to `false` in the domain file:

```yml
slots:
  name:
    type: text
    auto_fill: false
```

### Initial slot values

```yml
slots:
  num_fallbacks:
    type: float
    initial_value: 0
```

## Responses

Responses are actions that send a message to a user without running any custom code or returning events. 

These responses can be defined directly in the domain file under the `responses` key and can include rich content such as buttons and attachments.


## Actions

Actions are the things your bot can actually do. For example, an action could:

- respond to a user,
- make an external API call,
- query a database, or
- just about anything!

All custom actions should be listed in your domain, except responses which need not be listed under `actions:`, as they are already listed under `responses:`.


## Session configuration

Conversation sessions can begin in three ways:

1. the user begins the conversation with the assistant,
2. the user sends their first message after a configurable period of inactivity, or
3. a manual session start is triggered with the /session_start intent message.

You can define the period of inactivity after which a new conversation session is triggered in the domain under the `session_config` key.

Available parameters are:

- `session_expiration_time` defines the time of inactivity in minutes after which a new session will begin.
- `carry_over_slots_to_new_session` determines whether existing set slots should be carried over to new sessions.

```yml
session_config:
  session_expiration_time: 60  # value in minutes, 0 means infinitely long
  carry_over_slots_to_new_session: true  # set to false to forget slots between sessions
```


## Config

The config key in the domain file maintains the `store_entities_as_slots` parameter. When an entity is recognized by the NLU model and the entity name matches a slot name, `store_entities_as_slots` defines whether the entity value should be placed in that slot. By default, entities will auto-fill slots of the same name.

```yml
config:
  store_entities_as_slots: false
```

You can also turn off this behavior for a specific slot using the `auto_fill` parameter in that slot's definition.
