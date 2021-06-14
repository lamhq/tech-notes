# Training Data

Rasa Open Source uses YAML as a unified and extendable way to manage all training data, including NLU data, stories and rules.

You can split the training data over any number of YAML files, and each file can contain any combination of NLU data, stories, and rules. The training data parser determines the training data type using top level keys.

The **domain** uses the same YAML format as the training data and can also be split across multiple files or combined in one file. The domain includes the definitions for responses and forms.

Each file can contain one or more keys with corresponding training data. One file can contain multiple keys, but each key can only appear once in a single file. The available keys are:

- `version`
- `nlu`
- `stories`
- `rules`

You should specify the `version` key in all YAML training data files.

To specify your test stories, you need to put them into a separate file (`tests/test_stories.yml`)

## NLU Training Data

The goal of NLU (Natural Language Understanding) is to extract structured information from user messages. This usually includes the user's intent and any entities their message contains. 

NLU training data consists of example user utterances categorized by intent. 

You can add extra information such as regular expressions and lookup tables to your training data to help the model identify intents and entities correctly.

### Training Examples

Training examples are grouped by intent and listed under the `examples` key. Usually, you'll list one example per line as follows:

```yml
nlu:
- intent: check_balance
  examples: |
    - What's my [credit](account) balance?
    - What's the balance on my [credit card account]{"entity":"account","value":"credit"}
```

it's also possible to use an extended format if you have a custom NLU component and need metadata for your examples:

```yml
nlu:
- intent: greet
  examples:
  - text: |
      hi
    metadata:
      sentiment: neutral
  - text: |
      hey there!
```

You can also specify metadata at the intent level:

```yml
nlu:
- intent: greet
  metadata:
    sentiment: neutral
  examples:
  - text: |
      hi
  - text: |
      hey there!
```

If you want to specify retrieval intents, then your NLU examples will look as follows:

```yml
nlu:
- intent: chitchat/ask_name
  examples: |
    - What is your name?
    - May I know your name?
    - What do people call you?
    - Do you have a name for yourself?

- intent: chitchat/ask_weather
  examples: |
    - What's the weather like today?
    - Does it look sunny outside today?
    - Oh, do you mind checking the weather for me please?
    - I like sunny days in Berlin.
```

All retrieval intents have a suffix added to them which identifies a particular response key for your assistant. In the above example, `ask_name` and `ask_weather` are the suffixes, `\` is the delimiter.


### Entities

Entities are structured pieces of information that can be extracted from a user's message.

Entities are annotated in training examples with the entity's name. In addition to the entity name, you can annotate an entity with synonyms, roles, or groups.

```yml
nlu:
- intent: check_balance
  examples: |
    - how much do I have on my [savings]("account") account
    - how much money is in my [checking]{"entity": "account"} account
    - What's the balance on my [credit card account]{"entity":"account","value":"credit"}
```

The full possible syntax for annotating an entity is:

```yml
[<entity-text>]{"entity": "<entity name>", "role": "<role name>", "group": "<group name>", "value": "<entity synonym>"}
```


### Synonyms

Synonyms normalize your training data by mapping an extracted entity to a value other than the literal text extracted.

```yml
nlu:
- synonym: credit
  examples: |
    - credit card account
    - credit account
```

You can also define synonyms in-line in your training examples by specifying the value of the entity:

```yml
nlu:
- intent: check_balance
  examples: |
    - how much do I have on my [credit card account]{"entity": "account", "value": "credit"}
    - how much do I owe on my [credit account]{"entity": "account", "value": "credit"}
```


**Regular expressions:**

You can use regular expressions to improve intent classification and entity extraction using the `RegexFeaturizer` and `RegexEntityExtractor` components in your NLU pipeline.


```yml
nlu:
- regex: account_number
  examples: |
    - \d{10,12}
```

Here `account_number` is the name of the regular expression. When used as as features for the `RegexFeaturizer` the name of the regular expression does not matter.

When using the `RegexEntityExtractor`, the name of the regular expression should match the name of the entity you want to extract.

```yml
nlu:
- regex: account_number
  examples: |
    - \d{10,12}
- intent: inform
  examples: |
    - my account number is [1234567891](account_number)
    - This is my account number [1234567891](account_number)
```

Whenever a user message contains a sequence of 10-12 digits, it will be extracted as an `account_number` entity. `RegexEntityExtractor` doesn't require training examples to learn to extract the entity, but you do need at least two annotated examples of the entity so that the NLU model can register it as an entity at training time.

### Lookup tables

Lookup tables are lists of words used to generate case-insensitive regular expression patterns. The format is as follows:

```yml
nlu:
- lookup: banks
  examples: |
    - JPMC
    - Comerica
    - Bank of America
```

When you supply a lookup table in your training data, the contents of that table are combined into one large regular expression. This regex is used to check each training example to see if it contains matches for entries in the lookup table.


## Conversation Training Data

Stories and rules are both representations of conversations between a user and a conversational assistant. They are used to train the dialogue management model. 

Stories are used to train a machine learning model to identify patterns in conversations and generalize to unseen conversation paths. 

Rules describe small pieces of conversations that should always follow the same path and are used to train the RulePolicy.

### Stories

Stories are composed of:

- `story`: The story's name. The name is arbitrary and not used in training; you can use it as a human-readable reference for the story.
- `metadata`: arbitrary and optional, not used in training, you can use it to store relevant information about the story like e.g. the author
- a list of `steps`: The user messages and actions that make up the story

```yml
stories:
- story: Greet the user
  metadata:
    author: Somebody
    key: value
  steps:
  # list of steps
  - intent: greet
  - action: utter_greet
```

Each step can be one of the following:

- A user message, represented by intent and entities.
- An or statement, which includes two or more user messages under it.
- A bot action.
- A form.
- A slot was set event.
- A checkpoint, which connects the story to another story.

#### User Messages

All user messages are specified with the `intent`: key and an optional `entities`: key.

```yml
stories:
- story: user message structure
  steps:
    - intent: intent_name  # Required
      entities:  # Optional
      - entity_name: entity_value
    - action: action_name
```

It is important to include the entities here as well because the policies learn to predict the next action based on a combination of both the intent and entities (you can, however, change this behavior using the use_entities attribute).

#### Actions

All actions executed by the bot are specified with the action: key followed by the name of the action. Two types of actions:

**Responses**: start with `utter_` and send a specific message to the user. e.g.

```yml
stories:
- story: story with a response
  steps:
  - intent: greet
  - action: utter_greet
```

**Custom actions**: start with `action_`, run arbitrary code and send any number of messages (or none).

```yml
stories:
- story: story with a custom action
  steps:
  - intent: feedback
  - action: action_store_feedback
```

#### Forms

A form is a specific kind of custom action that contains the logic to loop over a set of required slots and ask the user for this information. You define a form in the `forms` section in your domain. Once defined, you should specify the happy path for a form as a **rule**. 

You should include interruptions of forms or other "unhappy paths" in stories so that the model can generalize to unseen conversation sequences. As a step in a story, a form takes the following format:

```yml
stories:
- story: story with a form
  steps:
  - intent: find_restaurant
  - action: restaurant_form                # Activate the form
  - active_loop: restaurant_form           # This form is currently active
  - active_loop: null                      # Form complete, no form is active
  - action: utter_restaurant_found
```

Much like a `slot_was_set` step, a form step doesn't set a form to active but indicates that it should already be activated. 

In the same way, the `active_loop: null` step indicates that no form should be active before the subsequent steps are taken.

A form can be interrupted and remain active; in this case the interruption should come after the `action: <form to activate`> step and be followed by the `active_loop: <active form>` step. An interruption of a form could look like this:

```yml
stories:
- story: interrupted food
  steps:
    - intent: request_restaurant
    - action: restaurant_form
    - intent: chitchat
    - action: utter_chitchat
    - active_loop: restaurant_form
    - active_loop: null
    - action: utter_slots_values
```

#### Slots

Slots act as the bots memory. Slots are set by entities or by custom actions.

Stories do not set slots. The slot must be set by an entity or custom action before the `slot_was_set` step.

A slot event is specified under the key `slot_was_set`: with the slot name and optionally the slot's value.

```yml
stories:
- story: story with a slot
  steps:
  - intent: celebrate_bot
  - slot_was_set:
    - feedback_value: positive
  - action: utter_yay
```

This means the story requires that the current value for the `feedback_value` slot be `positive` for the conversation to continue as specified.

Whether or not you need to include the slot's value depends on the slot type and whether the value can or should influence the dialogue. If the value doesn't matter, list only the slot's name:

```yml
stories:
- story: story with a slot
  steps:
  - intent: greet
  - slot_was_set:
    - name
  - action: utter_greet_user_by_name
```

#### Checkpoints

Checkpoints are ways to connect stories together. They can be either the first or the last step in a story. If they are the last step in a story, that story will be connected to each other story that starts with the checkpoint of the same name when the model is trained.

```yml
stories:
- story: story_with_a_checkpoint_1
  steps:
  - intent: greet
  - action: utter_greet
  - checkpoint: greet_checkpoint

- story: story_with_a_checkpoint_2
  steps:
  - checkpoint: greet_checkpoint
  - intent: book_flight
  - action: action_book_flight
```

Checkpoints at the beginning of stories can also be conditional on slots being set:

```yml
stories:
- story: story_with_a_conditional_checkpoint
  steps:
  - checkpoint: greet_checkpoint
    # This checkpoint should only apply if slots are set to the specified value
    slot_was_set:
    - context_scenario: holiday
    - holiday_name: thanksgiving
  - intent: greet
  - action: utter_greet_thanksgiving
```

Do not overuse checkpoints. Using lots of checkpoints can quickly make your stories hard to understand, stories without checkpoints are easier to read and write. It makes sense to use them if a sequence of steps is repeated often in different stories.

#### OR statement

`or` steps are ways to **handle multiple intents the same way**, without writing a separate story for each intent.

```yml
stories:
- story: story with OR
  steps:
  - intent: signup_newsletter
  - action: utter_ask_confirm
  - or:
    - intent: affirm
    - intent: thanks
  - action: action_signup_newsletter
```

Overusing checkpoints and OR statements will slow down training.


### Rules

Rules look similar to stories. Rules can additionally contain the `conversation_started` and `conditions` keys. These are used to specify conditions under which the rule should apply.

Before you start writing rules, you have to make sure that the Rule Policy is added to your model configuration:

```yml
policies:
- ... # Other policies
- name: RulePolicy
```

```yml
rules:
- rule: Only say `hey` when the user provided a name
  conversation_start: true
  condition:
  - slot_was_set:
    - user_provided_name: true
  steps:
  - intent: greet
  - action: utter_greet
```

Possible information that you can include under `condition` includes `slot_was_set` events and `active_loop` events.

By default, rules will wait for the next user message when finished with the last step. If you want to hand over the next action prediction to another story or rule, add wait_for_user_input: false to your rule:

```yml
rules:

- rule: Rule which will not wait for user message once it was applied
  steps:
  - intent: greet
  - action: utter_greet
  wait_for_user_input: false
```

When a Form is active, the bot will make predictions based on how the form is defined, ignoring rules. Rules become applicable again if:

- the form fills all required slots
- the form rejects its execution


### Events

#### Slot Events

Slot events are written under `slot_was_set` in a story. If this slot is set inside a custom action, add the `slot_was_set` event immediately following the custom action call. 

If your custom action resets a slot value to None, the corresponding event for that would look like this:

```yml
stories:
- story: set slot to none
  steps:
    # ... other story steps
    - action: my_custom_action
    - slot_was_set:
      - my_slot: null
```

#### Form Events

A form action event (e.g. `- action: restaurant_form`) is used in the beginning when first starting a form, and also while resuming the form action when the form is already active.

A form activation event (e.g. `- active_loop: restaurant_form`) is used right after the first form action event.

A form deactivation event (e.g. `- active_loop: null`), which is used to deactivate the form.


## Test Stories

Test stories check if a message is classified correctly as well as the action predictions.

Test stories use the same format as stories, except that user message steps can include a `user` to specify the actual text and entity annotations of the user message.

```yml
stories:
- story: A basic end-to-end test
  steps:
  - user: |
     hey
    intent: greet
  - action: utter_ask_howcanhelp
  - user: |
     show me [chinese]{"entity": "cuisine"} restaurants
    intent: inform
  - action: utter_ask_location
  - user: |
     in [Paris]{"entity": "location"}
    intent: inform
  - action: utter_ask_price
```

You can run the tests using the following command:

```sh
rasa test
```