# Handling Business Logic

This page is a guide on handling the business logic of collecting user information to fulfill a request

Forms work by prompting the user for information until it has gathered all required information. The information is stored in slots. Once all the required slots are filled, the bot fulfills the user's original request.


## 1. Defining the form

To define a form, you will need to define:

- Slot mappings: The required info to collect
- Responses: How your bot should ask for each piece of information

You define a form in your domain by specifying slot mappings for each piece of required information. Slot mappings define both which slots are required, and how each slot can be filled:

`domain.yml`:

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
        outdoor_seating:
          - type: from_intent
            intent: affirm
            value: true
          - type: from_intent
            intent: deny
            value: false
```

For any slot filled `from_entity`, the entity needs to be added to the domain:

`domain.yml`:

```yml
entities:
  - cuisine
  - number
```

Entities like numbers can be extracted by the `DucklingEntityExtractor`. To use it, add `DucklingEntityExtractor` to your NLU pipeline:

`config.yml`:

```yml
language: en
pipeline:
# other components
- DucklingEntityExtractor:
  dimensions: ["number"]
```

The `outdoor_seating` slot is filled based on the user's intent: If it is `affirm`, it'll be `true`, if it is deny, it'll be `false`.

Since the form relies on certain slots being available, you need to add these slots to the domain. Slots filled by forms should usually not influence the conversation. Set `influence_conversation` to false to ignore their values during the conversation:

`domain.yml`:

```yml
slots:
  cuisine:
    type: text
    auto_fill: false
    influence_conversation: false
  num_people:
    type: float
    auto_fill: false
    influence_conversation: false
  outdoor_seating:
    type: text
    auto_fill: false
    influence_conversation: false
```

### Validating Slots

Often, you'll want to validate the user's input before accepting it. See the docs on [validating form input](https://rasa.com/docs/rasa/forms#validating-form-input) for more information about validation actions.


### Requesting Slots

To specify how the bot should ask for the required information, you define responses called `utter_ask_{slotname}` in your domain:

`domain.yml`:

```yml
responses:
  utter_ask_cuisine:
    - text: "What cuisine?"
  utter_ask_num_people:
    - text: "How many people?"
  utter_ask_outdoor_seating:
    - text: "Do you want to sit outside?"
```

## 2. Updating the configuration

A form's happy path should be defined as a **rule** which means you'll need to add the `RulePolicy` to your policies:

`config.yml`:

```yml
policies:
  - name: RulePolicy
```

## 3. Creating rules

The form itself takes care of the logic around asking the user for all the required information, so you need only two rules for a form's happy path: One that defines when it starts, and one that defines what happens when it has been filled.

`rules.yml`:

```yml
rules:
  - rule: activate restaurant form
    steps:
      - intent: request_restaurant   # intent that triggers form activation
      - action: restaurant_form      # run the form
      - active_loop: restaurant_form # this form is active

  - rule: submit form
    condition:
    - active_loop: restaurant_form   # this form must be active
    steps:
      - action: restaurant_form      # run the form
      - active_loop: null            # the form is no longer active because it has been filled
      - action: utter_submit         # action to take after the form is complete
      - action: utter_slots_values   # action to take after the form is complete
```

By splitting up the activation and submission of the form, the rules will still apply if the user provides unexpected input or interrupts the form with chitchat.


## 4. Updating the NLU training data

You need to provide training examples for the intent(s) that should activate the form:

`nlu.yml`:

```yml
nlu:
- intent: request_restaurant
  examples: |
    - im looking for a restaurant
    - can i get [swedish](cuisine) food in any area
    - a restaurant that serves [caribbean](cuisine) food
    - id like a restaurant
    - im looking for a restaurant that serves [mediterranean](cuisine) food
    - can i find a restaurant that serves [chinese](cuisine)
```

Slots filled with `from_entity` can by default be filled by any user utterance, regardless of the intent, as long as the correct entity is extracted. That means that if the user provides the cuisine entity as part of their first message, the slot will be filled at the beginning of the form and the bot will not ask them for the cuisine again.

For the restaurant search example, the `outdoor_seating` slot is mapped to two intents `affirm` and `deny`, so you need to add training data for these intents.

For the `cuisine` and `number` slots, no intent is specified, so you can add examples to a generic `inform` intent. You need to annotate the `cuisine` entity so that `DIETClassifier` can learn to extract it. You don't need to annotate the number entity since `DucklingEntityExtractor` is a rule-based extractors that isn't trained on your training data.

`nlu.yml`:

```yml
nlu:
- intent: affirm
  examples: |
    - Yes
    - yes, please
    - yup
- intent: deny
  examples: |
    - no don't
    - no
    - no I don't want that

- intent: inform
  examples: |
    - [afghan](cuisine) food
    - how bout [asian oriental](cuisine)
    - what about [indian](cuisine) food
    - uh how about [turkish](cuisine) type of food
    - um [english](cuisine)
    - im looking for [tuscan](cuisine) food
    - id like [moroccan](cuisine) food
    - for ten people
    - 2 people
    - for three people
    - just one person
    - book for seven people
    - 2 please
    - nine people
```

`domain.yml`:

```yml
intents:
  - request_restaurant
  - affirm
  - deny
  - inform
```

## 5. Defining the responses

Add the responses that are sent after the form has been submitted:

`domain.yml`:

```yml
responses:
  utter_submit:
  - text: "All done!"
  utter_slots_values:
  - text: "I am going to run a restaurant search using the following parameters:\n
            - cuisine: {cuisine}\n
            - num_people: {num_people}\n
            - outdoor_seating: {outdoor_seating}"
```


## Summary

The examples on this page come from the [formbot example bot](https://github.com/RasaHQ/rasa/tree/main/examples/formbot).

To define a minimal form, this is a summary of what you'll need to do:

- [ ] Add the RulePolicy to config.yml
- [ ] Define the form with slot mappings in the domain
- [ ] Add all required slots to the domain
- [ ] Add rules for activating and submitting the form
- [ ] Add examples for the intent(s) to activate your form
- [ ] Add examples for the intent(s) to fill the required slots
- [ ] Define an action or response for the bot to take when the form is completed
- [ ] Update your domain with new intents and actions you've defined

Because the `DucklingEntityExtractor` is being used to extract entities, you'll need to start Duckling in the background as well (see the instructions for [running Duckling](https://rasa.com/docs/rasa/components#DucklingEntityExtractor)).
