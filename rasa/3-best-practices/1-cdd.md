# Conversation-Driven Development

## What is CDD?

Conversation-Driven Development (CDD) means letting real user conversations guide your development.

## CDD in Early stages

- Follow best practices for [NLU data](https://rasa.com/docs/rasa/generating-nlu-data) and [Stories](https://rasa.com/docs/rasa/writing-stories)
- Give your bot to test users early on. Test users can be anyone who doesn't already know how your bot works from the inside.
- Set up a CI/CD pipeline.
- Install Rasa X in local mode to make it easier to share your bot with test users


## CDD in Production

- Install Rasa X on a server to both deploy your bot and enable CDD with a bot in production.

### Review

- Look at conversations where an `out_of_scope` intent or fallback behavior occurred. These could indicate a potential new skill, or just a misclassified user utterance.
- Look for user frustration, such as requests for transfer to a human.


### Annotate

- Follow best practices for NLU
- Add new user utterances from real conversations to your training data. Add only user utterances that the model previously predicted incorrectly or with low confidence.


### Test

Add successful user conversations to your [test conversations](https://rasa.com/docs/rasa/testing-your-assistant). Doing this consistently will help ensure you don't introduce regressions as you make other fixes to your bot.


### Track

Look for metrics to help you track your bot's performance.

- If you are building a bot to relieve demand on a customer service call center, one metric for success could be the reduction in traffic to the call center
- Whether a user reaches a certain action that represents achieving the user goal.
- The only way to get a true measure of success would be to individually review and rate every single conversation with your bot.


### Fix

- Follow best practices for Stories as you expand and improve your bot's skills.
- Let user demand guide which skills you add and which fixes you make.
- Make smaller changes frequently rather than making big changes only once in a while.
