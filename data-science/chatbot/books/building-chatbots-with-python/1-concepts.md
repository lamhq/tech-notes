# Chapter 1: The Beloved Chatbots

## What Kind of Problems Can I Solve Using Chatbots?

If the answer to all of these three questions is yes, then you are good to go.

- Can the Problem be Solved by Simple Question and Answer or Back-and-Forth Communication?
- Does It Have Highly Repetitive Issues That Require Either Analyzing or Fetching of Data?
- Can Your Bot’s Task be Automated and Fixed?

What chatbot does and is made to do is to make people using it efficient and productive, by removing the need of a user to do repetitive things themselves.

It’s very important to remember that there is a limit to what chatbots can do. It always feels that we are talking to a human-like thing that is very intelligent, but the specific bot is designed and trained to behave in a certain way and solve a specific problem only.

It’s really important to not try to be a hero when solving any problem that is very new
to you. You should always aim to keep the problem scope limited. Build the basic functionality and then add on top of it. Don’t try to make it complex in the first cut itself. So, we should always try to create features only needed at the moment without having to over-engineer things.

Unless you are thinking of building a chatbot just for your learning purpose, you should make sure the problem you are trying to solve can be automated.


## Starting With Chatbots

There are three steps one should follow before building chatbots:

1. Think about all the scenarios or tasks you want your chatbot to be able to do, and gather all related questions in different forms that can be asked to do those tasks. Every task that you want your chatbot to do will define an **intent**.
2. Each question that you list or intent can be represented in multiple ways. All of these have the same intent/task, but they are being asked in different **utterances/variances**.
3. Write all your logic to keep the user tied to the flow that you have chosen after you recognize the user’s intent.


## Components of a Chatbot and Terminologies Used

### Intent

When a user interacts with a chatbot, what is his intention to use the chatbot/what is he asking for?

For example, when a user says, "Book a movie ticket," to a chatbot, we as humans can understand that the user wants to book a movie ticket. This is intent for a bot. It could be named "book_movie" intent.

Another example could be when a user says, "I want to order food," or "Can you help me order food?" These could be named "order_food" intent. Likewise, you can define as many intents as you want.

### Entities

Intents have metadata about the intent called “Entities.” In the example, “Book a movie ticket,” booking a ticket could be an intent and the entity is “movie,” which could have been something else as well, like flight, concert, etc.

For example: *"Order me a shoe of size 8"*. There could be two entities here: Category: Shoe, Size: 8

### Utterances

Utterances are nothing but different forms of the same question/intent your user may show.

It is suggested to have an optimum 10 utterances per intent and a minimum of 5, but this is not restricted.

### Confidence Score

Every time you try to find what intent an utterance may belong to, your model will come up with a confidence score. This score tells you how confident your machine learning model is about recognizing the intent of the user.


## Decision tree

Suppose you were building a similar chatbot that helps people buy apparel online.

The first thing you would do is to make a similar decision tree or a flowchart to help your chatbot ask appropriate questions at the right time.

You will need the state diagrams or a simple flowchart later when you actually code your first chatbot.

The benefit of such a process is the development time will be cut down, and later on the functionality will be loosely coupled and would start making sense as components.

So, your bot will ask a series of questions following the decision tree that you have built. Each node narrows down on the customer’s goal through chatbot intents.

![](http://www.infme.com/wp-content/uploads/2019/12/chatbotarch.png)


## Solve it by design

Lots of times you will find issues solving some intents programmatically. So, the bottom line is, "If you can’t solve something programmatically then solve it by design."

Look at Figure below where the bot is trying to take a quiz and wants to know if the user has a premium card.

![](https://res.cloudinary.com/dn1j6dpd7/image/upload/v1603799379/cb/blog/how-to-create-chatbot-buttons-that-people-love-to-click/2.png)

Since the answer is expected to be a Boolean (True/False), you give just two buttons for the user to click instead of letting them type and wait to fix their mistake.

This is solving by design rather than writing lots of code that will be handling unexpected user inputs. You will have so many scenarios while building the chatbots where by just giving buttons, you will be able to quickly know the intent of the user. It’s important to understand such scenarios and provide buttons both for your own convenience as well as for users who don’t need to type in obvious cases of optional answers.
