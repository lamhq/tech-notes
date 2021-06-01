# Contextual Conversation Patterns

## 1. Defining Slots

Slots are your assistant's memory. Slots store pieces of information that your assistant needs to refer to later and can direct the flow of the conversation based on `slot_was_set` events.

`domain.yml`:

```yml
slots:
  likes_music:
    type: bool
```

## 2. Creating Stories

In the concert bot example, the concert bot responds differently for users who like music and users who don't because of these two stories:

`stories.yml`:

```yml
stories:
  - story: User likes music
    steps:
    - intent: how_to_get_started
    - action: utter_get_started
    - intent: affirm
    - action: action_set_music_preference
    - slot_was_set:
      - likes_music: True
    - action: utter_awesome

  - story: User doesn't like music
    steps:
    - intent: how_to_get_started
    - action: utter_get_started
    - intent: deny
    - action: action_set_music_preference
    - slot_was_set:
      - likes_music: False
    - action: utter_goodbye
```

These stories diverge based on the user's intent (`affirm` or `deny`). Based on the user's intent, a custom action sets a slot that further directs the conversation.

The `likes_music` slot is a boolean slot. If it is `true`, the bot sends an intro message. If it is `false`, the bot sends a different message.


## Summary

Here's a summary of the concepts you can apply to enable your assistant to have contextual conversations:

- Write stories for contextual conversations
- Use slots to store contextual information for later use
- Set the `max_history` for your policies appropriately for the amount of context your bot needs
- Use the [TEDPolicy](https://blog.rasa.com/unpacking-the-ted-policy-in-rasa-open-source/) for generalization to unseen conversation paths
