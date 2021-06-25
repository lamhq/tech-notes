# Tuning Your NLU Model

## Pipeline

In Rasa Open Source, incoming messages are processed by a sequence of components. These components are executed one after another in a so-called processing pipeline defined in your config.yml. Choosing an NLU pipeline allows you to customize your model and finetune it on your dataset.

## Starting pipeline

To get started, just provide your bot's language in the `config.yml` file and leave the pipeline key out or empty

```yml
language: fr  # your 2-letter language code

pipeline:
# intentionally left empty
```

## Pretrained word pipeline

It's often helpful to start with pretrained word embeddings. Pre-trained word embeddings are helpful as they already encode some kind of linguistic knowledge. If you are getting started with a one of [spaCy's supported languages](https://spacy.io/usage/models#languages), we recommend the following pipeline:

```yml
language: "fr"  # your two-letter language code

pipeline:
  - name: SpacyNLP
  - name: SpacyTokenizer
  - name: SpacyFeaturizer
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

## Domain specific (no pre-trained word) pipeline

If there are no word embeddings for your language or you have very domain specific terminology, we recommend using the following pipeline:

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

This pipeline uses the CountVectorsFeaturizer to train on only the training data you provide. This pipeline can handle any language in which words are separated by spaces. If this is not the case for your language, check out [alternatives to the WhitespaceTokenizer](https://rasa.com/docs/rasa/components#tokenizers).


## Component Lifecycle

Each component processes an input and/or creates an output. The order of the components is determined by the order they are listed in the `config.yml`

The output of a component can be used by any other component that comes after it in the pipeline. Other components produce `output` attributes that are returned after the processing has finished.

For example, for the sentence *"I am looking for Chinese food"*, the `output` is:

```json
{
    "text": "I am looking for Chinese food",
    "entities": [
        {
            "start": 8,
            "end": 15,
            "value": "chinese",
            "entity": "cuisine",
            "extractor": "DIETClassifier",
            "confidence": 0.864
        }
    ],
    "intent": {"confidence": 0.6485910906220309, "name": "restaurant_search"},
    "intent_ranking": [
        {"confidence": 0.6485910906220309, "name": "restaurant_search"},
        {"confidence": 0.1416153159565678, "name": "affirm"}
    ]
}
```

This is created as a combination of the results of the different components in the following pipeline (the `entities` attribute here is created by the `DIETClassifier` component). 

```yml
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
  - name: EntitySynonymMapper
  - name: ResponseSelector
```

Every component can implement several methods from the `Component` base class; in a pipeline these different methods will be called in a specific order. 

*Assuming we added the following pipeline to our `config.yml`:*

```yml
pipeline:
  - name: "Component A"
  - name: "Component B"
  - name: "Last Component"
```

*The image below shows the call order during the training of this pipeline:*

![](https://rasa.com/docs/rasa/ideal-img/component-lifecycle-img.0111328.1202.png)

The `context` is created before the first component is created using `create` function. This context is used to pass information between the components.

*For example, one component can calculate feature vectors for the training data, store that within the context and another component can retrieve these feature vectors from the context and do intent classification.*

After all components are trained and persisted, the final context dictionary is used to persist the model's metadata.


## Doing Multi-Intent Classification

You can use Rasa Open Source components to split intents into multiple labels.

*For example, you can predict multiple intents (`thank+goodbye`) or model hierarchical intent structure (`feedback+positive` being more similar to `feedback+negative` than chitchat).*

To do this, you need to use the `DIETClassifier` in your pipeline. You'll also need to define these flags in whichever tokenizer you are using:

- `intent_tokenization_flag`: Set it to `True`, so that intent labels are tokenized.
- `intent_split_symbol`: Set it to the delimiter string that splits the intent labels. In this case `+`, default `_`.

Here's an example configuration:

```yml
language: "en"

pipeline:
- name: "WhitespaceTokenizer"
  intent_tokenization_flag: True
  intent_split_symbol: "_"
- name: "CountVectorsFeaturizer"
- name: "DIETClassifier"
```

## Pipeline main parts

### Tokenization

For tokenization of English input, we recommend the [ConveRTTokenizer](https://rasa.com/docs/rasa/components#converttokenizer).

For other whitespace-tokenized languages you can process them with the [WhitespaceTokenizer](https://rasa.com/docs/rasa/components#whitespacetokenizer).

If your language is not whitespace-tokenized, you should use a different tokenizer. We support a number of different [tokenizers](https://rasa.com/docs/rasa/components), or you can create your own custom tokenizer.

### Featurization

You need to decide whether to use components that provide pre-trained word embeddings or not.

We recommend to start with pre-trained word embeddings in cases of small amounts of training data. Once you have a larger amount of data and ensure that most relevant words will be in your data and therefore will have a word embedding, supervised embeddings, which learn word meanings directly from your training data, can make your model more specific to your domain. 

If you can't find a pre-trained model for your language, you should use supervised embeddings.

#### Pre-trained Embeddings

The advantage of using pre-trained word embeddings in your pipeline is that if you have a training example like: "I want to buy apples", and Rasa is asked to predict the intent for "get pears", your model already knows that the words "apples" and "pears" are very similar. This is especially useful if you don't have enough training data. 

We support a few components that provide pre-trained word embeddings:

- MitieFeaturizer
- SpacyFeaturizer
- ConveRTFeaturizer
- LanguageModelFeaturizer

If your training data is in English, we recommend using the **ConveRTFeaturizer**. The advantage of the **ConveRTFeaturizer** is that it doesn't treat each word of the user message independently, but creates a contextual vector representation for the complete sentence. 

*For example, if you have a training example, like: "Can I book a car?", and Rasa is asked to predict the intent for "I need a ride from my place", since the contextual vector representation for both examples are already very similar, the intent classified for both is highly likely to be the same. This is also useful if you don't have enough training data.*

An alternative to **ConveRTFeaturizer** is the **LanguageModelFeaturizer** which uses pre-trained language models such as BERT, GPT-2, etc. to extract similar contextual vector representations for the complete sentence. See [HFTransformersNLP](https://huggingface.co/models) for a full list of supported language models.

If your training data is not in English you can also use a different variant of a language model which is pre-trained in the language specific to your training data. For example, there are chinese (`bert-base-chinese`) and japanese (`bert-base-japanese`) variants of the BERT model. A full list of different variants of these language models is available in the [official documentation of the Transformers library](https://huggingface.co/transformers/pretrained_models.html).

**spacynlp** also provides word embeddings in many different languages, so you can use this as another alternative, depending on the language of your training data.

#### Supervised Embeddings (domain specific)

If you don't use any pre-trained word embeddings inside your pipeline, you are not bound to a specific language and can train your model to be more domain specific.

*For example, in general English, the word "balance" is closely related to "symmetry", but very different to the word "cash". In a banking domain, "balance" and "cash" are closely related and you'd like your model to capture that.*

You should only use featurizers from the category [sparse featurizers](https://rasa.com/docs/rasa/components#featurizers), such as CountVectorsFeaturizer, RegexFeaturizer or LexicalSyntacticFeaturizer, if you don't want to use pre-trained word embeddings.

### Intent Classification / Response Selectors

We recommend using:

- [DIETClassifier](https://rasa.com/docs/rasa/components#dietclassifier) for intent classification and entity recognition 
- [ResponseSelector](https://rasa.com/docs/rasa/components#responseselector) for response selection.

Sometimes it makes sense to restrict the features that are used by a specific component. To achieve that, you can do the following: 

- Set an alias for every featurizer in your pipeline via the option `alias`. 
- Specify what features from which featurizers should be used via the option `featurizers`. If you don't set the option `featurizers` all available features will be used.

*Here is an example configuration file where the `DIETClassifier` is using all available features and the `ResponseSelector` is just using the features from the `ConveRTFeaturizer` and the `CountVectorsFeaturizer`.*

```yml
language: "en"

pipeline:
  - name: ConveRTTokenizer
  - name: ConveRTFeaturizer
    alias: "convert"
  - name: RegexFeaturizer
    alias: "regex"
  - name: LexicalSyntacticFeaturizer
    alias: "lexical-syntactic"
  - name: CountVectorsFeaturizer
    alias: "cvf-word"
  - name: CountVectorsFeaturizer
    alias: "cvf-char"
    analyzer: "char_wb"
    min_ngram: 1
    max_ngram: 4
  - name: DIETClassifier
    epochs: 100
  - name: EntitySynonymMapper
  - name: ResponseSelector
    featurizers: ["convert", "cvf-word"]
    epochs: 100
```

### Entity Extraction

Rasa Open Source provides entity extractors for custom entities as well as pre-trained ones like dates and locations. Here is a summary of the available extractors and what they are best used for:

- DIETClassifier:	good for training custom entities
- CRFEntityExtractor: good for training custom entities, require sklearn-crfsuite
- SpacyEntityExtractor: provides pre-trained entities, require spaCy
- DucklingEntityExtractor: provides pre-trained entities, require running duckling
- MitieEntityExtractor: good for training custom entities, require MITIE
- EntitySynonymMapper: maps known synonyms, require existing entities