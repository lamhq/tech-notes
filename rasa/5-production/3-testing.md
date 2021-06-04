# Testing Your Assistant

## Validating Data and Stories

To validate your data, have your CI run this command:

```sh
rasa data validate
```

## Writing Test Stories

Test stories allow you to provide entire conversations and test that, given certain user input, your model will behave in the expected manner.

Test stories are like the stories in your training data, but include the user message as well.

`tests/test_stories.yml`

**Basic:**

```yml
stories:
- story: A basic story test
  steps:
  - user: |
      hello
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

**Custom actions:**

```yml
stories:
- story: A test where a custom action returns events
  steps:
  - user: |
      hey
    intent: greet
  - action: my_custom_action
  - slot_was_set:
    - my_slot: "value added by custom action"
  - action: utter_ask_age
  - user: |
      thanks
    intent: thankyou
  - action: utter_no_worries
```

**Forms Happy Path:**

```yml
stories:
- story: A test story with a form
  steps:
  - user: |
      hi
    intent: greet
  - action: utter_greet
  - user: |
      im looking for a restaurant
    intent: request_restaurant
  - action: restaurant_form
  - active_loop: restaurant_form
  - user: |
      [afghan](cuisine) food
    intent: inform
  - action: restaurant_form
  - active_loop: null
  - action: utter_slots_values
  - user: |
      thanks
    intent: thankyou
  - action: utter_no_worries
```

**Forms Unhappy Path:**

```yml
stories:
- story: A test story with unexpected input during a form
  steps:
  - user: |
      hi
    intent: greet
  - action: utter_greet
  - user: |
      im looking for a restaurant
    intent: request_restaurant
  - action: restaurant_form
  - active_loop: restaurant_form
  - user: |
      How's the weather?
    intent: chitchat
  - action: utter_chitchat
  - action: restaurant_form
  - active_loop: null
  - action: utter_slots_values
  - user: |
      thanks
    intent: thankyou
  - action: utter_no_worries
```

By default, the command will run tests on stories from any files with names starting with `test_`. You can also provide a specific test stories file or directory with the `--stories` argument. You can test your assistant against them by running:

```sh
rasa test
```

A good rule of thumb to follow is that you should aim for your test stories to be representative of the true distribution of real conversations.

Rasa X makes it easy to [add test conversations based on real conversations](https://rasa.com/docs/rasa-x/user-guide/test-assistant/#how-to-create-tests).


## Evaluating an NLU Model

Once your assistant is deployed in the real world, it will be processing messages that it hasn't seen in the training data. To simulate this, you should always set aside some part of your data for testing. 

You can see how well your trained NLU model predicts the data from the test set you generated, using:

```sh
rasa test nlu --nlu train_test_split/test_data.yml
```

If you use the train-test set approach, it is best to [shuffle and split your data](https://rasa.com/docs/rasa/command-line-interface#rasa-data-split) using rasa data split as part of this CI step, as opposed to using a static NLU test set, which can easily become outdated.


### Interpreting the Output

#### Intent Classifiers

The `rasa test` script will produce a report (`intent_report.json`), confusion matrix (`intent_confusion_matrix.png`) and confidence histogram (`intent_histogram.png`) for your intent classification model.

The report logs precision, recall and f1-score for each intent, as well as providing an overall average. You can save these reports as JSON files using the `--report` argument.

The confusion matrix shows which intents are mistaken for others. Any samples which have been incorrectly predicted are logged and saved to a file called `errors.json` for easier debugging.

#### Response Selectors

`rasa test` evaluates response selectors in the same way that it evaluates intent classifiers, producing a report (`response_selection_report.json`), confusion matrix (`response_selection_confusion_matrix.png`), confidence histogram (`response_selection_histogram.png`) and errors (`response_selection_errors.json`).

The report logs precision, recall and f1 measure for each sub-intent of a retrieval intent and provides an overall average. 

#### Entity Extraction

`rasa test` reports recall, precision, and f1-score for each entity type that your trainable entity extractors are trained to recognize.

Only trainable entity extractors, such as the `DIETClassifier` and `CRFEntityExtractor` are evaluated by rasa test. Pretrained extractors like the `DucklingHTTPExtractor` are not evaluated.


## Evaluating a Dialogue Model

You can evaluate your trained dialogue model on a set of test stories by using the test script:

```sh
rasa test core --stories test_stories.yml --out results
```

This will print any failed stories to `results/failed_test_stories.yml`. A story fails if at least one of the actions was predicted incorrectly.