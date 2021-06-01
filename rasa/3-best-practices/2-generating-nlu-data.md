# Generating NLU Data

## Concepts

NLU (Natural Language Understanding) is the part of Rasa Open Source that performs intent classification, entity extraction, and response retrieval.

*NLU will take in a sentence such as "I am looking for a French restaurant in the center of town" and return structured data like:*

```json
{
  "intent": "search_restaurant",
  "entities": {
    "cuisine": "French",
    "location": "center"
  }
}
```

## Gather Real Data

- Don't use synthetic data that are not from what users actually send to your assistant.
- Collect as much real user data as possible to use as training data.


## Share with Test Users Early

You should share your bot with test users outside the development team as early as possible.


## Avoiding Intent Confusion

When different intents contain the same words ordered in a similar fashion, this can create confusion for the intent classifier.

*For example, "How do I migrate to Rasa from IBM Watson?" versus "I want to migrate from Dialogflow."*

*Since each of these messages will lead to a different response, your initial approach might be to create separate intents for each migration type, e.g. watson_migration and dialogflow_migration. However, these intents are trying to achieve the same goal (migrating to Rasa) and will likely be phrased similarly, which may cause the model to confuse these intents.*

*To avoid intent confusion, group these training examples into single `migration` intent and make the response depend on the value of a categorical `product` slot that comes from an entity.*

```yml
stories:
- story: migrate from IBM Watson
  steps:
    - intent: migration
      entities:
      - product
    - slot_was_set:
      - product: Watson
    - action: utter_watson_migration

- story: migrate from Dialogflow
  steps:
    - intent: migration
      entities:
      - product
    - slot_was_set:
      - product: Dialogflow
    - action: utter_dialogflow_migration

- story: migrate from unspecified
  steps:
    - intent: migration
    - action: utter_ask_migration_product
```


## Improving Entity Recognition

You can define custom entities and annotate them in your training data to teach your model to recognize them.

### Pre-trained Entity Extractors

Common entities such as names, addresses, and cities require a large amount of training data for an NLU model to generalize effectively.

Rasa Open Source provides two great options for pre-trained extraction: [SpacyEntityExtractor](https://rasa.com/docs/rasa/components#SpacyEntityExtractor) and [DucklingEntityExtractor](https://rasa.com/docs/rasa/components#DucklingEntityExtractor)

### Regexes

Regexes are useful for performing entity extraction on structured patterns such as 5-digit U.S. zip codes


### Lookup Tables

Similar to regexes, lookup tables can be used to provide features to the model to improve entity recognition, or used to perform match-based entity recognition:

- Flavors of ice cream
- Brands of bottled water
- Sock length styles

### Synonyms

Adding synonyms to your training data is useful for mapping certain entity values to a single normalized entity.

Synonyms, however, are not meant for improving your model's entity recognition and have no effect on NLU performance.

*For example, in an assistant that asks users what insurance policies they're interested in, they might respond with "my truck," "a car," or "I drive a batmobile." It would be a good idea to map truck, car, and batmobile to the normalized value auto so that the processing logic will only need to account for a narrow set of possibilities.*

## Handling Edge Cases

### Misspellings

The goal is not to correct misspellings, but to correctly identify intents and entities. For this reason, while a spellchecker may seem like an obvious solution, adjusting your featurizers and training data is often sufficient to account for misspellings.

### Defining an Out-of-scope Intent

It is always a good idea to define an `out_of_scope` intent in your bot to capture any user messages outside of your bot's domain.

When an out_of_scope intent is identified, you can respond with messages such as *"I'm not sure how to handle that, here are some things you can ask me..."* to gracefully guide the user towards a supported skill.


## Shipping Update

Updates to your training data should be carefully reviewed because of the significant influence it can have on your model's performance.
