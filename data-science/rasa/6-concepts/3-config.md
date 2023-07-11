# Model Configuration

The configuration file defines the components and policies that your model will use to make predictions based on user input.

The `language` and `pipeline` keys specify the components used by the model to make NLU predictions.

The `policies` key defines the policies used by the model to predict the next action.

## Suggested Config

You can leave the `pipeline` and/or `policies` key out of your configuration file. Make sure to specify the language key in your `config.yml` file with the 2-letter ISO language code.

As long as you leave the configuration commented out and don't specify any configuration for a key yourself, a default configuration will be suggested whenever you train a new model.

```yml
language: en

pipeline:
# will be selected by the Suggested Config feature

policies:
- name: MemoizationPolicy
- name: TEDPolicy
  max_history: 5
  epochs: 10
```

## Pipeline Components

Components make up your NLU pipeline and work sequentially to process user input into structured output. There are components for entity extraction, for intent classification, response selection, pre-processing, and more.

### Language Models

The following components load pre-trained models that are needed if you want to use pre-trained word vectors in your pipeline.

- MitieNLP: MITIE initializer
- SpacyNLP: spaCy language initializer


### Tokenizers

Tokenizers split text into tokens.

- WhitespaceTokenizer: Tokenizer using whitespaces as a separator
- JiebaTokenizer: Tokenizer using Jieba for Chinese language
- MitieTokenizer: Tokenizer using MITIE
- SpacyTokenizer: Tokenizer using spaCy


### Featurizers

Text featurizers are divided into two different categories: sparse featurizers and dense featurizers.

Sparse featurizers are featurizers that return feature vectors with a lot of missing values, e.g. zeros. As those feature vectors would normally take up a lot of memory, we store them as sparse features.

Sparse features only store the values that are non zero and their positions in the vector. Thus, we save a lot of memory and are able to train on larger datasets.

All featurizers can return two different kind of features: sequence features and sentence features.

- MitieFeaturizer: Creates a vector representation of user message and response using the MITIE featurizer.
- SpacyFeaturizer: Creates a vector representation of user message and response using the spaCy featurizer.
- ConveRTFeaturizer: Creates a vector representation of user message and response using ConveRT model.
- LanguageModelFeaturizer: Creates a vector representation of user message and response using a pre-trained language model.
- RegexFeaturizer: Creates a vector representation of user message using regular expressions.
- CountVectorsFeaturizer: Creates bag-of-words representation of user messages, intents, and responses.
- LexicalSyntacticFeaturizer: Creates lexical and syntactic features for a user message to support entity extraction.


### Intent Classifiers

Intent classifiers assign one of the intents defined in the domain file to incoming user messages.

- MitieIntentClassifier: MITIE intent classifier (using a text categorizer)
- SklearnIntentClassifier: Sklearn intent classifier
- KeywordIntentClassifier: Simple keyword matching intent classifier, intended for small, short-term projects.
- **DIETClassifier**: Dual Intent Entity Transformer (DIET) used for intent classification and entity extraction
- FallbackClassifier: Classifies a message with the intent nlu_fallback if the NLU intent classification scores are ambiguous.


### Entity Extractors

Entity extractors extract entities, such as person names or locations, from the user message.

If you use multiple entity extractors, we advise that each extractor targets an exclusive set of entity types. For example, use `Duckling` to extract dates and times, and `DIETClassifier` to extract person names. Otherwise, if multiple extractors target the same entity types, it is very likely that entities will be extracted multiple times.

- MitieEntityExtractor: MITIE entity extraction (using a MITIE NER trainer)
- SpacyEntityExtractor: spaCy entity extraction
- CRFEntityExtractor: Conditional random field (CRF) entity extraction
- DucklingEntityExtractor: Duckling lets you extract common entities like dates, amounts of money, distances, and others in a number of languages.
- DIETClassifier: Dual Intent Entity Transformer (DIET) used for intent classification and entity extraction
- RegexEntityExtractor: Extracts entities using the lookup tables and/or regexes defined in the training data
- EntitySynonymMapper: Maps synonymous entity values to the same value.


## Policies

Your assistant uses policies to decide which action to take at each step in a conversation. There are machine-learning and rule-based policies that your assistant can use in tandem.

`config.yml`

```yml
language:  # your language
pipeline:
  # - <pipeline components>

policies:
  - name: MemoizationPolicy
  - name: TEDPolicy
    max_history: 5
    epochs: 200
  - name: RulePolicy
```

### Action Selection

At every turn, each policy defined in your configuration will predict a next action with a certain confidence level. The policy that predicts with the highest confidence decides the assistant's next action.

### Policy Priority

In the case that two policies predict with equal confidence, the priority of the policies look like this:

- `6` - `RulePolicy`
- `3` - `MemoizationPolicy` or `AugmentedMemoizationPolicy`
- `1` - `TEDPolicy`

If you create your own policy, and your policy is a machine learning policy, it should most likely have priority `1`, the same as the `TEDPolicy`.

### Machine Learning Policies

- TED Policy: The Transformer Embedding Dialogue (TED) Policy is a multi-task architecture for next action prediction and entity recognition. 
- Memoization Policy: The `MemoizationPolicy` remembers the stories from your training data. It checks if the current conversation matches the stories in your `stories.yml` file.
- Augmented Memoization Policy: remembers examples from training stories for up to `max_history` turns, just like the `MemoizationPolicy`. Additionally, it has a forgetting mechanism that will forget a certain amount of steps in the conversation history and try to find a match in your stories with the reduced history.

### Rule-based Policies

- Rule Policy: is a policy that handles conversation parts that follow a fixed behavior (e.g. business logic). It makes predictions based on any `rules` you have in your training data.

### Configuring Policies

- Max History: This controls how much dialogue history the model looks at to decide which action to take next. `RulePolicy` doesn't have max history parameter, it always consider the full length of provided rules.
- Data Augmentation: If you want to teach your policy to ignore the dialogue history when it isn't relevant and to respond with the same action no matter what happened before.
- Featurizers: In order to apply machine learning algorithms to conversational AI, you need to build up vector representations of conversations.

### Custom Policies

You can also write custom policies and reference them in your configuration.

```yml
policies:
  - name: "TEDPolicy"
    max_history: 5
    epochs: 200
  - name: "RulePolicy"
  - name: "path.to.your.policy.class"
    arg1: "..."
```


## Training Data Importers

Rasa Open Source has built-in logic to collect and load training data written in Rasa format, but you can also customize how your training data gets imported using custom training data importers. You can :

- specify where Rasa should look for training data on your disk
- using a custom parser to load training data in other formats
- using different approaches to collect training data (e.g. loading them from different resources)
- write a custom importer and instruct Rasa to use it


## Language Support

### Training a Model in Any Languages

The following pipeline can be used to train models in whitespace tokenizable langauges:

```yml
language: "fr"  # your two-letter language code

pipeline:
  - name: WhitespaceTokenizer
  - name: RegexFeaturizer
  - name: LexicalSyntacticFeaturizer
  - name: CountVectorsFeaturizer
  - name: CountVectorsFeaturizer
    analyzer: "char_wb"
    min_ngram: 1
    max_ngram: 4
  - name: DIETClassifier
    epochs: 100
  - name: EntitySynonymMapper
  - name: ResponseSelector
    epochs: 100
```

You can see how your model interprets different input messages by running:

```yml
rasa shell nlu
```

### Using Pre-trained Language Models

Language models with pre-trained word vectors are a great way to get started with less data

- spaCy: With the [Pre-trained Spacy Embeddings](https://rasa.com/docs/rasa/components#spacynlp), you can use spaCy's [pre-trained language models](https://spacy.io/usage/models#languages) or load fastText vectors, which are available for [hundreds of languages](https://github.com/facebookresearch/fastText/blob/master/docs/crawl-vectors.md).
- MITIE: You can also pre-train your own word vectors from a language corpus using [MITIE](https://rasa.com/docs/rasa/components#mitienlp).