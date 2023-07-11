# Writing Conversation Data

## Designing Stories

When designing stories, there are two groups of conversational interactions that need to be accounted for: happy and unhappy paths. **Happy paths** describe when the user is following the conversation flow as you'd expect and always providing the necessary information when prompted.

However, users will often deviate from happy paths with questions, chit chat, or other asks. We call these **unhappy path**. It's important for your bot to handle unhappy paths gracefully, but it's also impossible to predict what path a given user might take.

Often, developers will try to account for every possible diverging path when designing unhappy paths. Planning for every possible state in a state machine (many of which will never be reached) requires a lot of extra work and increases training time significantly.

Instead, we recommend taking a conversation-driven development approach when designing unhappy paths. Conversation-Driven Development promotes sharing your bot as early as possible with test users and collecting real conversation data that tells you exactly how users diverge from the happy paths. From this data, you can create stories to accomplish what the user is requesting and start to think about ways to guide them back into a happy path.

## When to Write Stories vs. Rules

Rules are a type of training data used by the dialogue manager for handling pieces of conversations that **should always follow the same path**.

Rules can be useful when implementing:

**One-turn interactions**: Some messages do not require any context to answer them. Rules are an easy way to map intents to responses, specifying fixed answers to these messages.

**Fallback behavior**: In combination with the `FallbackClassifier`, you can write rules to respond to low-confidence user messages with a certain fallback behavior.

**Forms**: Both activating and submitting a form will often follow a fixed path. You can also write rules to handle unexpected input during a form.

*An example of a rule where the bot returns a fixed response "utter_greet" to a user message with intent "greet" would be:*

```yml
rules:
- rule: Greeting Rule
  steps:
  - intent: greet
  - action: utter_greet
```

## Managing the Conversation Flow

### When to Use Slots to Influence Conversations

Slots act as your bot’s memory. When you define a slot, you can define whether a slot should influence the conversation or not.

```yml
stories:
- story: Welcome message, premium user
  steps:
   - intent: greet
   - action: action_check_profile
   - slot_was_set:
     - premium_account: true
   - action: utter_welcome_premium

- story: Welcome message, basic user
  steps:
   - intent: greet
   - action: action_check_profile
   - slot_was_set:
     - premium_account: false
   - action: utter_welcome_basic
   - action: utter_ask_upgrade
```

### Implementing Branching Logic

In cases where a value is used only to determine the bot's response, consider embedding the decision logic inside a custom action as opposed to using a featurized slot in your stories. This can help reduce overall complexity and make your stories easier to manage.

*For example, you can convert these stories:*

```yml
stories:
- story: It's raining now
  steps:
  - intent: check_for_rain
  - action: action_check_for_rain
  - slot_was_set:
    - raining: true
  - action: utter_is_raining
  - action: utter_bring_umbrella

- story: It isn't raining now
  steps:
  - intent: check_for_rain
  - action: action_check_for_rain
  - slot_was_set:
    - raining: false
  - action: utter_not_raining
  - action: utter_no_umbrella_needed
```

*into a single story:*

```yml
stories:
- story: check for rain
  steps:
  - intent: check_for_rain
  - action: action_check_for_rain
```

```py
def run(self, dispatcher, tracker, domain):
    is_raining = check_rain()
    if is_raining:
        dispatcher.utter_message(template="utter_is_raining")
        dispatcher.utter_message(template="utter_bring_umbrella")
    else:
        dispatcher.utter_message(template="utter_not_raining")
        dispatcher.utter_message(template="utter_no_umbrella_needed")
    return []
```

### OR statements

In stories where different intents are handled by your bot in the same way, you can use OR statements as an alternative to creating a new story.

*For example, you can merge these two stories:*

```yml
stories:
- story: newsletter signup
  steps:
  - intent: signup_newsletter
  - action: utter_ask_confirm_signup
  - intent: affirm
  - action: action_signup_newsletter

- story: newsletter signup, confirm via thanks
  steps:
  - intent: signup_newsletter
  - action: utter_ask_confirm_signup
  - intent: thanks
  - action: action_signup_newsletter
```

*into a single story with an OR statement:*

```yml
stories:
- story: newsletter signup with OR
  steps:
  - intent: signup_newsletter
  - action: utter_ask_confirm_signup
  - or:
    - intent: affirm
    - intent: thanks
  - action: action_signup_newsletter
```

If you notice that you are using OR statements frequently in your stories, consider restructuring your intents to reduce their granularity and more broadly capture user messages.

Overusing OR statements or checkpoints will slow down training.

### Checkpoints

Checkpoints are useful for modularizing your stories into separate blocks that are repeated often.

*For example, if you want your bot to ask for user feedback at the end of each conversation flow, you can use a checkpoint to avoid having to include the feedback interaction at the end of each story:*

```yml
stories:
- story: beginning of conversation
  steps:
  - intent: greet
  - action: utter_greet
  - intent: goodbye
  - action: utter_goodbye
  - checkpoint: ask_feedback

- story: user provides feedback
  steps:
  - checkpoint: ask_feedback
  - action: utter_ask_feedback
  - intent: inform
  - action: utter_thank_you
  - action: utter_anything_else

- story: user doesn't have feedback
  steps:
  - checkpoint: ask_feedback
  - action: utter_ask_feedback
  - intent: deny
  - action: utter_no_problem
  - action: utter_anything_else
```

Checkpoints are meant to make it easier to re-use certain sections of conversation in lots of different stories. We highly discourage using checkpoints inside existing checkpoints, as this increases training time significantly and makes your stories difficult to understand.

### Creating Logical Breaks in Stories

When designing conversation flows, it is often tempting to create long story examples that capture a complete conversational interaction from start to finish. Consider separating your longer stories into smaller conversational blocks that handle sub-tasks.

*Handling a lost credit card involves a series of sub-tasks, namely checking spending history for fraudulent transactions, confirming a mailing address for a replacement card, and then following up with the user with any additional requests. In this conversation arc, there are several places where the bot prompts for user input, creating branching paths that need to be accounted for.*

*For example, when prompted with `utter_ask_fraudulent_transactions`, the user might respond with a "deny" intent if none are applicable. The user might also choose to respond with a "deny" intent when asked if there's anything else the bot can help them with.*

*A happy path story for handling a lost credit card might look like:*

```yml
stories:
- story: Customer loses a credit card, reviews transactions, and gets a new card
  steps:
  - intent: card_lost
  - action: check_transactions
  - slot_was_set:
    - reviewed_transactions: ["starbucks"]
  - action: utter_ask_fraudulent_transactions
  - intent: inform
  - action: action_update_transactions
  - intent: affirm
  - action: utter_confirm_transaction_dispute
  - action: utter_replace_card
  - action: mailing_address_form
  - active_loop: mailing_address
  - active_loop: null
  - action: utter_sent_replacement
  - action: utter_anything_else
  - intent: affirm
  - action: utter_help
```

*We can separate out this long story into several smaller stories as:*

```yml
stories:
- story: Customer loses a credit card
  steps:
  - intent: card_lost
  - action: utter_card_locked
  - action: spending_history_form
  - active_loop: spending_history_form
  - active_loop: null
  - slot_was_set:
    - reviewed_transactions: ["starbucks"]
  - action: utter_ask_fraudulent_transactions

- story: Customer reviews transactions and gets a new card
  steps:
  - action: utter_ask_fraudulent_transactions
  - intent: inform
  - action: action_update_transactions
  - slot_was_set:
    - reviewed_transactions: ["target", "starbucks"]
  - intent: affirm
  - action: utter_confirm_transaction_dispute
  - action: utter_replace_card
  - action: mailing_address_form
  - active_loop: mailing_address
  - active_loop: null
  - action: utter_sent_replacement
  - action: utter_anything_else

- story: Customer has something else they need help with
  steps:
  - action: utter_anything_else
  - intent: affirm
  - action: utter_help
```

## Handling Context Switching

Often, users will not respond with the information you ask of them and instead deviate from the happy path with unrelated questions. Using CDD to understand what unhappy paths your users are taking, you can create stories for handling context switching.

### Using Rules for Context Switching

In some cases, such as single-turn interjections, you can handle context-switching using rules instead of through stories.

*Consider a conversation scenario when user want to pay for their credit card. The user is in the middle of paying their credit card bill, asks for their account balance, and is then guided back into the credit card payment form.*

*Because asking for the account balance should always get the same response regardless of context, you can create a rule that will automatically be triggered inside of an existing flow:*

```yml
rules:
- rule: Check my account balance
  steps:
  - intent: check_account_balance
  - action: action_get_account_balance
```

### Using Stories for Context Switching

You'll need to write additional stories for handling context switching when the user's interjection requires multiple conversation turns.

If you have two distinct conversational flows and want the user to be able to switch between the flows, you will need to create stories that specify how the switching will occur and how the context is maintained.

*Consider a conversation scenario when user is in the middle of paying their credit card bill, user requests a money transfer, credit card form is deactived and switch to money transfer form, once the transfer is completed, user is asked to return to the credit card payment form.*

```yml
stories:
- story: Context switch from credit card payment to money transfer
  steps:
  - intent: pay_credit_card
  - action: credit_card_payment_form
  - active_loop: credit_card_payment_form
  - intent: transfer_money                         # - user requests a money transfer
  - active_loop: null                              # - deactivate the credit card form
  - action: transfer_money_form                    # - switch to the money transfer form
  - active_loop: transfer_money_form
  - active_loop: null
  - action: utter_continue_credit_card_payment     # - once the money transfer is completed,
                                                   #   ask the user to return to the
                                                   #   credit card payment form
```

## Managing Conversation Data Files

You can provide training data to Rasa Open Source as a single file or as a directory containing multiple files. For example, you might create a file `chitchat.yml` for handling chitchat, and a `faqs.yml` file for FAQs.


## Using Interactive Learning

Interactive learning makes it easy to write stories by talking to your bot and providing feedback.

In Rasa Open Source, you can run interactive learning in the command line with `rasa interactive` command.

In interactive mode, you will be asked to confirm every intent and action prediction before the bot proceeds.

If you type `y` to approve a prediction, the bot will continue. If you type `n`, you will be given the chance to correct the prediction before continuing.

At any point, you can use `Ctrl-C` to access the menu, allowing you to create more stories and export the data from the stories you've created so far.