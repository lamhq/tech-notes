# Building Chatbots the Hard Way

## What Is Rasa NLU?

We'll be using an open-source library called Rasa NLU for learning how to build chatbots from scratch without using any cloud services like Dialogflow, Watson, wit.ai, etc.

Rasa NLU is an open-source NLP library for intent classification and entity extraction in chatbots. It helps you build and write custom NLP for your chatbots.

There are two parts of Rasa that we'll be covering in this chapter:

- Rasa NLU: we'll be learning to prepare our training data for our chatbot, writing configuration files, choosing a pipeline and training the model. Lastly, we will be **predicting the intent of a text** using our model. We'll also be learning how to **parse entities** using Rasa NLU.
- Rasa Core: we'll be learning to **train the Rasa Core dialog management model to prepare responses back to the user. Instead of writing lots of conditions in our decision tree** and spending hours debugging it in case of a big enterprise-level application, it's better to teach the model to create responses.


### Why Should I Use Rasa NLU?

Rasa NLU is not just any other library with a bunch of methods to do some things. It has the capability of building almost any kind of chatbot that you can imagine.

Rasa NLU is an actively maintained project and has a good community to support it.

If we don't want to share our user's sensitive data with a third party, we must use open-source tools like Rasa NLU to build chatbots from scratch

Using Rasa NLU for building chatbots will give you full command over your chatbots.


### Deciding a Pipeline in Rasa

Pipeline is nothing but a set of algorithms to be used to train your model.


## Example: Building a Horoscope Bot

### The scope

We are going to build a Horoscope Bot. Let's decide the scope of this chatbot and see what it does and can do:

- The bot should be able to understand greetings and reply with a greeting.
- The bot should be able to understand if the user is asking for a horoscope.
- The bot should be able to ask the horoscope sign of the user if the user doesn't provide it.
- If the user doesn't know his/her horoscope sign, the bot should ask the user's date of birth (DOB) and find it for them.
- The bot should subscribe/unsubscribe the user to get the daily horoscope.
- The bot should learn from existing responses to formulate a new response.
- The bot should be able to handle spelling mistakes by the user.

Possible intents (of user):

- Greeting Intent: User starting with a greeting
- Get Horoscope Intent: User asking for horoscope
- User's Horoscope Intent: User telling the horoscope sign
- User's DOB Intent: User telling his/her DOB
- Subscription Intent: User asking for subscription


### Conversation Script

Writing a conversation script is like preparing a software requirement document before building the software. It may change later but gives you an overall view of what's going to happen in the final chatbot application.

| User | Bot |
| ---- | --- |
| Hello |   |
|  | Hello! Hope you are doing well. |
| I want to know my horoscope. | |
| | Sure, may I know your horoscope sign? |
| Capricorm | |
| | Sorry, did you mean Capricorn? |
| Yes. | |
| | Alright, Here is your horoscope for today. Chances are that you'll feel upbeat and positive today. Share this energy with others who feel less than content. Your attitude can have a profound effect on friends, partners, spouse, and children. Neighbors and extended family can pick up on your spirit without you even realizing it. If someone is hurt or angry, be encouraging. Everything will eventually work out. |
| | Would you like to subscribe for the daily updates? If yes, just say subscribe. |
| Yes, please subscribe. | |
| | Great, you are subscribed now. Have a good day. |

### Preparing Data for Chatbot

#### Creating Data for Model in JSON Format

**data/data.json**:

```json
{
  "rasa_nlu_data":{
    "common_examples":[
      {
        "text":"Hello",
        "intent":"greeting",
        "entities":[

        ]
      },
      {
        "text":"I want to know my Horoscope",
        "intent":"get_horoscope",
        "entities":[

        ]
      },
      {
        "text":"Can you please tell me my horoscope?",
        "intent":"get_horoscope",
        "entities":[

        ]
      },
      {
        "text":"Please subscribe me",
        "intent":"subscription"
      }
    ],
    "regex_features":[],
    "entity_synonyms":[]
  }
}
```

#### Using an editor for modifying training data

In this section we'll make use of a tool called Rasa NLU trainer to visualize our data. Rasa NLU trainer is a very nice and handy tool to edit our training data right from our browser itself.

Handling JSON data is tricky and also can lead to errors. With this handy tool we can easily add more examples to our training data or edit the existing ones.

```sh
npm i -g rasa-nlu-trainer
rasa-nlu-trainer
```

You'll also notice in the `data.json` file that the entities you might have defined using the rasa-nlu-trainer UI are captured in the `common_examples` list as having `start` and `end` keys, which tells the model at what point the particular entity value starts in the example and when it ends.

### Training the Chatbot Model

#### Creating a Configuration File

`config.json`:

```json
{
  "pipeline":"tensorflow_embedding",
  "path":"./models/nlu",
  "data":"./data/data.json"
}
```

As you can see, there are some important configuration parameters done in our `config.json` file. Let's try to understand them.
- **pipeline**: Pipeline is going to specify what featurizers or feature extractors are going to be used to crunch text messages and extract necessary information. In our case, we are using tensorflow_embedding.
- **path**: path is essentially the directory where we keep our model after the training. We are going to keep our model in the `/models/nlu` folder.
- **data**: data is the path we need to specify; it's basically where our training data sits

#### Writing Python Code to Train the Model and Predict

- Pass the training data and config file to rasa `train` method and save the model to a directory
- Load model from model directory and call `parse` method to parse a text to retrieve the predicted intent and entities


## Dialog Management Using Rasa Core

*Let's look at the side-by-side user vs. bot conversation that we built in Chapter 3 while building an OnlineEatsBot.*

| User | OnlineEatsBot |
| - | - |
| hello onlineeats | hello! how may i help you? |
| i am looking to order food | sure, What would you like to order today? |
| one chicken burger | done. your final amount is $3.99 |
| thank you | thanks a lot |

*This conversation is pretty much simple. Now, the interesting question that will come to your mind is, "What if I want my bot to be able to change the order? What if I want my bot to be able to remove or add more quantity of the food items?"

*So, as discussed, add more use-cases, more complexity, more intents and their utterances, more if...else in code to handle corner-cases, but when you are building a chatbot for a business you have to scale it to generate more revenue through it. All software systems do that, and those who don’t fail to survive. The bottom line is, we can’t keep changing and deploying the code.*

With Rasa Core, we can specify all of the things our bot is supposed to say or do. These are called actions. One action might be to say a greeting to the user or to query a database, or it could be to retrieve some information using some web service or API.

Rasa Core provides the facility to train our probabilistic model to predict what action has to be taken based on the historical conversation of the user or users. Imagine doing it without an ML model and writing hundreds of use-cases to figure out what response or action should be sent or executed. In simple terms, Rasa Core solves this problem for you.

## Understanding Rasa Concepts

### Action

it's a specific action to be taken to response to user. For example, if a user asks the horoscope for today, our bot could execute the "GetTodaysHoroscope" action.

```py
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
from __future__ import unicode_literals

import requests
from rasa_core_sdk import Action
from rasa_core_sdk.events import SlotSet

class GetTodaysHoroscope(Action):

    def name(self):
        return "get_todays_horoscope"

    def run(self, dispatcher, tracker, domain):
        # type: (Dispatcher, DialogueStateTracker, Domain) -> List[Event]

        user_horoscope_sign = tracker.get_slot('horoscope_sign')
        base_url = "http://horoscope-api.herokuapp.com/horoscope/{day}/{sign}"
        url = base_url.format(**{'day': "today", 'sign': user_horoscope_sign})
        #http://horoscope-api.herokuapp.com/horoscope/today/capricorn
        res = requests.get(url)
        todays_horoscope = res.json()['horoscope']
        response = "Your today's horoscope:\n{}".format(todays_horoscope)

        dispatcher.utter_message(response)
        return [SlotSet("horoscope_sign", user_horoscope_sign)]
```

### Slots

Slots are like a storage space where the information given by the user can be stored or a pre-fetched information from a database or an API can also be used.


### Templates

Templates in Rasa are used for utterances. An utterance template contains a set of preset text to be sent to the user when some action is triggered.

By having the same name of the action as the utterance or by an action with custom code, we can send our formatted message in templates to the user.

```yml
templates:
  utter_greet:
    - "Hello! What can I do for you?"
  utter_ask_horoscope_sign:
    - "What is your horoscope sign?"
  utter_ask_dob:
    - "What is your DOB in DD-MM format?"
  utter_subscribe:
    - "Do you want to subscribe for daily updates?"
```

## Creating Domain File for the Chatbot

The Domain defines the universe in which your bot operates. It specifies the intents, entities, slots, and actions your bot should know about. Optionally, it can also include templates for the things your bot can say.

`horoscope_domain.yml`:

```yml
slots:
  horoscope_sign:
    type: text
  DD:
    type: text
  MM:
    type: text
  subscribe:
    type: bool


intents:
 - greeting
 - get_horoscope
 - subscription
 - dob_intent


entities:
 - horoscope_sign
 - DD
 - MM
 - subscribe
 - dob_intent


templates:
  utter_greet:
    - "Hello! What can I do for you?"
  utter_ask_horoscope_sign:
    - "What is your horoscope sign?"
  utter_ask_dob:
    - "What is your DOB in DD-MM format?"
  utter_subscribe:
    - "Do you want to subscribe for daily updates?"


actions:
 - utter_greet
 - utter_ask_horoscope_sign
 - utter_ask_dob
 - utter_subscribe
 - get_todays_horoscope
 - subscribe_user
```