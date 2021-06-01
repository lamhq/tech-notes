# Chitchat and FAQs

FAQs and chitchat are two cases where the conversational assistant responds with a fixed set of messages, and the assistant should always answer the same way, no matter what has happened previously in the conversation.

Chitchat is a conversation pattern where the user says something that isn't directly related to their goal. This can include things like greetings, asking how you are etc.

FAQs are common questions that your users ask.

To handle FAQs and chitchat you'll need a rule-based dialogue management policy (the `RulePolicy`) and an easy way to return the appropriate response for a question (the `ResponseSelector`).

## 1. Updating the configuration

To use rules, the you need to add the `RulePolicy` to your policies in your configuration file:

`config.yml`:

```yml
policies:
# other policies
- name: RulePolicy
```

Next, include the `ResponseSelector` in your NLU pipeline in your configuration file. The `ResponseSelector` requires a featurizer and intent classifier to work, so it should come after these components in your pipeline:

`config.yml`:

```yml
pipeline:
  - name: WhitespaceTokenizer
  - name: RegexFeaturizer
  - name: LexicalSyntacticFeaturizer
  - name: CountVectorsFeaturizer
  - name: CountVectorsFeaturizer
    analyzer: char_wb
    min_ngram: 1
    max_ngram: 4
  - name: DIETClassifier
    epochs: 100
  - name: EntitySynonymMapper
  - name: ResponseSelector
    epochs: 100
```

## 2. Defining Retrieval Intents and the ResponseSelector

Retrieval Intent is a special type of intent that can be divided into smaller sub-intents. For example, an FAQ retrieval intent has sub-intents that represent each individual question the assistant knows how to answer.

Consider an example where you have 20 different FAQs. Although each question is represented as an individual intent, all FAQ intents are handled the same way in the dialogue. For each FAQ intent, the assistant retrieves the proper response depending on which question has been asked.

Instead of writing 20 rules, you can use a single action, e.g. `utter_faq` to handle all FAQs with a single rule by grouping them together under a single **retrieval intent** called e.g. `faq`.


## 3. Creating rules

You need to write only one rule for each retrieval intent. All intents grouped under that retrieval intent will then be handled the same way. The action name starts with `utter_` and ends with the retrieval intent's name. Write rules for responding to FAQs and chitchat:

`rules.yml`:
```yml
rules:
  - rule: respond to FAQs
    steps:
    - intent: faq
    - action: utter_faq
  - rule: respond to chitchat
    steps:
    - intent: chitchat
    - action: utter_chitchat
```

## 4. Updating the NLU Training Data

`nlu.yml`:

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

`domain.yml`:

```yml
intents:
# other intents
- chitchat
```

## 5. Defining the responses

`domain.yml`:

```yml
responses:
  utter_chitchat/ask_name:
  - image: "https://i.imgur.com/zTvA58i.jpeg"
    text: Hello, my name is Retrieval Bot.
  - text: I am called Retrieval Bot!
  utter_chitchat/ask_weather:
  - text: Oh, it does look sunny right now in Berlin.
    image: "https://i.imgur.com/vwv7aHN.png"
  - text: I am not sure of the whole week but I can see the sun is out today.
```
