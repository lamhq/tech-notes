# Actions

After each user message, the model will predict an action that the assistant should perform next. This page gives you an overview of the different types of actions you can use.

## Responses

A response is a message the assistant will send back to the user. A response is usually only text, but can also include content like images and buttons.

Responses go under the `responses` key in your domain file. 

`domain.yml`:

```yml
responses:
  utter_greet:
  - text: "Hey, {name}. How are you?"
  - text: "Hey, {name}. How is your day going?"
  utter_bye:
  - text: "See you!"

  utter_chitchat/ask_name:
  - text: Oh yeah, I am called the retrieval bot.

  utter_chitchat/ask_weather:
  - text: Oh, it does look sunny right now in Berlin.
```

You can send response using custom action with filled variable:

```py
dispatcher.utter_message(
    template="utter_greet",
    name="Sara"
)
```

To specify different response variations depending on which channel the user is connected to, use channel-specific response variations:

```yml
responses:
  utter_ask_game:
  - text: "Which game would you like to play on Slack?"
    channel: "slack"
  - text: "Which game would you like to play?"
```


### Buttons

```yml
responses:
  utter_greet:
  - text: "Hey! How are you?"
    buttons:
    - title: "great"
      payload: "/mood_great"
    - title: "super sad"
      payload: "/mood_sad"
```

Each button in the list of `buttons` should have two keys:

- `title`: The text displayed on the buttons that the user sees.
- `payload`: The message sent from the user to the assistant when the button is clicked.

If you would like the buttons to also pass entities to the assistant:

```yml
responses:
  utter_greet:
  - text: "Hey! Would you like to purchase motor or home insurance?"
    buttons:
    - title: "Motor insurance"
      payload: '/inform{{"insurance":"motor"}}'
    - title: "Home insurance"
      payload: '/inform{{"insurance":"home"}}'
```

You can use buttons to bypass NLU prediction and trigger a specific intent and entities with format:

```
'/intent_name{{"entity_type_1":"entity_value_1", "entity_type_2": "entity_value_2"}}'
```

In the example above, if the user clicks a button, the user input will be directly classified as either the `mood_great` or `mood_sad` intent.

### Images

```yml
  utter_cheer_up:
  - text: "Here is something to cheer you up:"
    image: "https://i.imgur.com/nGF1K8f.jpg"
```

### Custom Output Payloads

You can send any arbitrary output to the output channel using the `custom` key. The output channel receives the object stored under the `custom` key as a JSON payload.

```yml
responses:
  utter_take_bet:
  - custom:
      blocks:
      - type: section
        text:
          text: "Make a bet on when the world will end:"
          type: mrkdwn
        accessory:
          type: datepicker
          initial_date: '2019-05-21'
          placeholder:
            type: plain_text
            text: Select a date
```

### Calling Responses in story

If the name of the response starts with `utter_`, the response can directly be used as an action, without being listed in the `actions` section of your domain.

```yml
stories:
- story: greet user
  steps:
  - intent: greet
  - action: utter_greet
```

### Calling Responses from Custom Actions

```py
from rasa_sdk.interfaces import Action

class ActionGreet(Action):
    def name(self):
        return 'action_greet'

    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message(template="utter_greet")
        return []
```


## Custom Actions

Action that can run any code you want. This can be used to make an API call, or to query a database for example. Each response name should start with `utter_`


## Forms

Ask for a specific set of information from user

To use forms with Rasa Open Source you need to make sure that the **Rule Policy** is added to your policy configuration.

```yml
policies:
- name: RulePolicy
```

### Defining a Form

Define a form by adding it to the `forms` section in your domain.

The name of the form is also the name of the action which you can use in stories or rules to handle form executions

You also need to define slot mappings for each slot which your form should fill

*The following example form `restaurant_form` will fill the slot `cuisine` from an extracted entity `cuisine` and slot `num_people` from entity `number`.*

```yml
forms:
  restaurant_form:
    required_slots:
        cuisine:
          - type: from_entity
            entity: cuisine
        num_people:
          - type: from_entity
            entity: number
```

You can define a list of intents to ignore for the whole form under the `ignored_intents` key:

```yml
forms:
  restaurant_form:
    ignored_intents: 
    - chitchat
    required_slots:
        cuisine:
          - type: from_entity
            entity: cuisine
        num_people:
          - type: from_entity
            entity: number
```

Once the form action gets called for the first time, the form gets activated and will prompt the user for the next required slot value. It does this by looking for a response called `utter_ask_<form_name>_<slot_name>` or `utter_ask_<slot_name>` if the former isn't found. Make sure to define these responses in your domain file for each required slot.


### Activating a Form

To activate a form you need to add a story or rule, which describes when the assistant should run the form.

In the case a specific intent triggering a form, you can for example use the following rule:

```yml
rules:
- rule: Activate form
  steps:
  - intent: request_restaurant
  - action: restaurant_form
  - active_loop: restaurant_form
```

### Deactivating a Form

A form will automatically deactivate itself once all required slots are filled.

### Slot Mappings

Rasa Open Source comes with four predefined mappings to fill the slots of a form based on the latest user message.

#### `from_entity`

The `from_entity` mapping fills slots based on extracted entities. If `intent_name` is None, the slot will be filled regardless of intent name

```yml
forms:
  your_form:
    required_slots:
        slot_name:
        - type: from_entity
          entity: entity_name
          role: role_name
          group: group name
          intent: intent_name
          not_intent: excluded_intent
```

#### `from_text`

The `from_text` mapping will use the text of the next user utterance to fill the slot `slot_name`. If `intent_name` is `None`, the slot will be filled regardless of intent name. Otherwise, the slot will only be filled if the user's intent is `intent_name`.

```yml
forms:
  your_form:
    required_slots:
        slot_name:
        - type: from_text
          intent: intent_name
          not_intent: excluded_intent
```

#### `from_intent`

The `from_intent` mapping will fill slot `slot_name` with value `my_value` if user intent is `intent_name` or `None`

```yml
forms:
  your_form:
    required_slots:
        slot_name:
        - type: from_intent
          value: my_value
          intent: intent_name
          not_intent: excluded_intent
```

#### `from_trigger_intent`

The `from_trigger_intent` mapping will fill slot `slot_name` with value `my_value` if the form was activated by a user message with intent `intent_name`

```yml
forms:
  your_form:
    required_slots:
        slot_name:
        - type: from_trigger_intent
          value: my_value
          intent: intent_name
          not_intent: excluded_intent
```

### Writing Stories / Rules for Unhappy Form Paths

While a form is active, if a user's input does not fill the requested slot, the execution of the form action will be rejected i.e. the form will automatically raise an `ActionExecutionRejection`. These are the specific scenarios in which a form will raise an `ActionExecutionRejection`:

- a slot was requested, but the user didn't fill the slot with their last message and you didn't define a custom action for validating slots or extracting slots.
- a slot was requested, but your custom action for validating slots or extracting slots didn't return any `SlotSet` events.

To intentionally reject the form execution, you can also return an `ActionExecutionRejected` event as part of your custom validations or slot mappings.

To handle situations that might cause a form's execution to be rejected, you can write rules or stories that include the expected interruptions.

```yml
rules:
- rule: Example of an unhappy path
  condition:
  # Condition that form is active.
  - active_loop: restaurant_form
  steps:
  # This unhappy path handles the case of an intent `chitchat`.
  - intent: chitchat
  - action: utter_chitchat
  # Return to form after handling the `chitchat` intent
  - action: restaurant_form
  - active_loop: restaurant_form
```

In some situations, users may change their mind in the middle of the form action and decide not to go forward with their initial request. In cases like this, the assistant should stop asking for the requested slots. You can handle such situations gracefully using a default action `action_deactivate_loop` which will deactivate the form and reset the requested slot. An example story of such conversation could look as follows:

```yml
stories:
- story: User interrupts the form and doesn't want to continue
  steps:
  - intent: request_restaurant
  - action: restaurant_form
  - active_loop: restaurant_form
  - intent: stop
  - action: utter_ask_continue
  - intent: stop
  - action: action_deactivate_loop
  - active_loop: null
```

It is strongly recommended that you build these rules or stories using [interactive learning](https://rasa.com/docs/rasa/writing-stories#using-interactive-learning). 


### Validating Form Input

You can implement a Custom Action `validate_<form_name>` to validate any extracted slots. Make sure to add this action to the actions section of your domain:

```yml
actions:
- validate_restaurant_form
```

*The following example shows the implementation of a custom action which validates that the slot named `cuisine` is valid.*

```py
from typing import Text, List, Any, Dict

from rasa_sdk import Tracker, FormValidationAction
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.types import DomainDict


class ValidateRestaurantForm(FormValidationAction):
    def name(self) -> Text:
        return "validate_restaurant_form"

    @staticmethod
    def cuisine_db() -> List[Text]:
        """Database of supported cuisines"""

        return ["caribbean", "chinese", "french"]

    def validate_cuisine(
        self,
        slot_value: Any,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: DomainDict,
    ) -> Dict[Text, Any]:
        """Validate cuisine value."""

        if slot_value.lower() in self.cuisine_db():
            # validation succeeded, set the value of the "cuisine" slot to value
            return {"cuisine": slot_value}
        else:
            # validation failed, set this slot to None so that the
            # user will be asked for the slot again
            return {"cuisine": None}
```

You can also extend the Action class and retrieve extracted slots with `tracker.slots_to_validate` to fully customize the validation process.


### Custom Slot Mappings

If none of the predefined Slot Mappings fit your use case, you can use the Custom Action `validate_<form_name>` to write your own extraction code.

The following example shows the implementation of a form which extracts a slot `outdoor_seating` in a custom way, in addition to the slots which use predefined mappings. The method `extract_outdoor_seating` sets the slot `outdoor_seating` based on whether the keyword outdoor was present in the last user message.

```py
from typing import Dict, Text, List, Optional, Any

from rasa_sdk import Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.forms import FormValidationAction


class ValidateRestaurantForm(FormValidationAction):
    def name(self) -> Text:
        return "validate_restaurant_form"

    async def required_slots(
        self,
        slots_mapped_in_domain: List[Text],
        dispatcher: "CollectingDispatcher",
        tracker: "Tracker",
        domain: "DomainDict",
    ) -> Optional[List[Text]]:
        required_slots = slots_mapped_in_domain + ["outdoor_seating"]
        return required_slots

    async def extract_outdoor_seating(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict
    ) -> Dict[Text, Any]:
        text_of_last_user_message = tracker.latest_message.get("text")
        sit_outside = "outdoor" in text_of_last_user_message

        return {"outdoor_seating": sit_outside}
```

### Dynamic Form Behavior

By default Rasa Open Source will ask for the next empty slot from the slots listed for your form in the domain file. 

If you use custom slot mappings and the `FormValidationAction`, it will ask for the first empty slot returned by the `required_slots` method. 

If all slots in `required_slots` are filled the form will be be deactivated.

If needed, you can update the required slots of your form dynamically.

```py
from typing import Text, List, Optional

from rasa_sdk.forms import FormValidationAction

class ValidateRestaurantForm(FormValidationAction):
    def name(self) -> Text:
        return "validate_restaurant_form"

    async def required_slots(
        self,
        slots_mapped_in_domain: List[Text],
        dispatcher: "CollectingDispatcher",
        tracker: "Tracker",
        domain: "DomainDict",
    ) -> Optional[List[Text]]:
        additional_slots = ["outdoor_seating"]
        if tracker.slots.get("outdoor_seating") is True:
            # If the user wants to sit outside, ask
            # if they want to sit in the shade or in the sun.
            additional_slots.append("shade_or_sun")

        return additional_slots + slots_mapped_in_domain
```

### The `requested_slot` slot

The `requested_slot` slot define what slot is currently being asked. You might want to do this if you want to handle your unhappy paths differently.

For example, if your users respond to one of the bot's questions with another question, like *"why do you need to know that?"* The response to this `explain` intent depends on where we are in the story. In the restaurant case, your stories would look something like this:

```yml
stories:
- story: explain cuisine slot
  steps:
  - intent: request_restaurant
  - action: restaurant_form
  - active_loop: restaurant
  - slot_was_set:
    - requested_slot: cuisine
  - intent: explain
  - action: utter_explain_cuisine
  - action: restaurant_form
  - active_loop: null

- story: explain num_people slot
  steps:
  - intent: request_restaurant
  - action: restaurant_form
  - active_loop: restaurant
  - slot_was_set:
    - requested_slot: cuisine
  - slot_was_set:
    - requested_slot: num_people
  - intent: explain
  - action: utter_explain_num_people
  - action: restaurant_form
  - active_loop: null
```

Again, it is strongly recommended that you use interactive learning to build these stories.


### Using a Custom Action to Ask For the Next Slot

As soon as the form determines which slot has to be filled next by the user, it will execute the action `utter_ask_<form_name>_<slot_name>` or `utter_ask_<slot_name>` to ask the user to provide the necessary information. 

If a regular utterance is not enough, you can also use a custom action `action_ask_<form_name>_<slot_name>` or `action_ask_<slot_name>` to ask for the next slot.

```py
from typing import Dict, Text, List

from rasa_sdk import Tracker
from rasa_sdk.events import EventType
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk import Action


class AskForSlotAction(Action):
    def name(self) -> Text:
        return "action_ask_cuisine"

    def run(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict
    ) -> List[EventType]:
        dispatcher.utter_message(text="What cuisine?")
        return []
```


## Default Actions

Default actions are actions that are built into the dialogue manager by default. Most of these are automatically predicted based on certain conversation situations.

### Customize default action's behavior

Each of these actions have a default behavior, described in the sections below. In order to **overwrite this default behavior**, write a custom action whose `name()` method returns the same name as the default action:

```py
class ActionRestart(Action):

  def name(self) -> Text:
      return "action_restart"

  async def run(
      self, dispatcher, tracker: Tracker, domain: Dict[Text, Any]
  ) -> List[Dict[Text, Any]]:

      # custom behavior

      return [...]
```

Add this action to the actions section of your domain file so your assistant knows to use the custom definition instead of the default one:

```yml
actions:
  - action_restart
```

### action_listen

This action is predicted to signal that the assistant should do nothing and wait for the next user input.

### action_restart

This action resets the whole conversation history, including any slots that were set during it.

If you define an `utter_restart` response in your domain, this will be sent to the user as well.

### action_session_start

This action starts a new conversation session, and is executed in the following situations:

- at the beginning of each new conversation
- after a user was inactive for a period defined by the `session_expiration_time` parameter in the domain's session configuration
- when a user sends a `/session_start` message during a conversation

The action will reset the conversation tracker, but by default will not clear any slots that were set.

### action_default_fallback

This action undoes the last user-bot interaction and sends the `utter_default` response if it is defined.

### action_deactivate_loop

This action deactivates the active loop and resets the requested slot. This is used when handling unhappy paths in forms.

### action_two_stage_fallback

This is a fallback loop that can be used to handle low NLU confidence. Read more about handling low NLU confidence.

### action_default_ask_affirmation

This action is used by the `action_two_stage_fallback` loop. It asks the user to confirm the intent of their message.

### action_default_ask_rephrase

This action is used by the `action_two_stage_fallback` loop if the user denies the intent `action_default_ask_affirmation` displays. It asks the user to rephrase their message.