# Chapter 2: Natural Language Processing for Chatbots

## Why Do I Need to Know Natural Language Processing to Build a Chatbot?

It's not that you can't build a chatbot at all if you don't know the method and techniques of NLP, but your scope will be somewhat limited. You won't be able to scale the application and keep the code clean at the same time. NLP gives your chatbot the wings to fly when it can't just walk and run.

Machines haven't reached a stage where they can think as similar as humans to have their own intelligence. AI systems today—what they do and the way they behave—are the outcome of how we have trained them. So, to understand the natural language of the user in whatsoever language it may be, or whatever input form it may be (text, voice, image, etc.), we have to write algorithms and use techniques of NLP.

NLP is considered the brain of chatbots that processes the raw data, does the munging, cleans it, and then prepares to take appropriate action

## spaCy

### Installation

```sh
pip install -U spacy==2.0.11
```

### SpaCy Models?

SpaCy models are just like any other machine learning or deep learning models. A model is a yield of an algorithm or, say, an object that is created after training data using a machine learning algorithm.

Install spaCy models as Python packages:

```sh
python3 -m spacy download en
```

## Fundamental Methods of NLP for Building Chatbots

### POS Tagging

Part-of-speech (POS) tagging is a process where you read some text and assign parts of speech to each word or token, such as noun, verb, adjective, etc.

POS reduce the complexity of understanding a text that can't be trained or is trained with less confidence. By use of POS tagging, we can identify parts of the text input and do string matching only for those parts.

For example, if you were to find if a location exists in a sentence, then POS tagging would tag the location word as NOUN, so you can take all the NOUNs from the tagged list and see if it's one of the locations from your preset list or not.


## Stemming and Lemmatization

**Stemming** is the process of reducing inflected words to their word stem, base form.

A stemming algorithm reduces the words *"saying"* to the root word *"say"*, whereas *"presumably"* becomes *"presum"*. As you can see, this may or may not always be 100% correct.

**Lemmatization** is closely related to stemming, but lemmatization is the algorithmic process of determining the lemma of a word based on its intended meaning.

For example, in English, the verb *"to walk"* may appear as *"walk"*, *"walked"*, *"walks"*, or *"walking"*. The base form, *"walk"*, that one might look up in a dictionary, is called the lemma for the word.

Difference between Stemming and Lemmatization

- Stemming does the job in a crude, heuristic way that chops off the ends of words, assuming that the remaining word is what we are actually looking for, but it often includes the removal of derivational affixes.
- Lemmatization tries to do the job more elegantly with the use of a vocabulary and morphological analysis of words. It tries its best to remove inflectional endings only and return the dictionary form of a word, known as the lemma.

It's always a best practice to use lemmatization to get the root word correctly.


## Named-Entity Recognition

Named-entity recognition (NER), also known by other names like entity identification or entity extraction, is a process of finding and classifying *named entities* existing in the given text into pre-defined categories.

In information extraction, a named entity is a real-world object, such as persons, locations, organizations, products, etc., that can be denoted with a proper name. It can be abstract or have a physical existence. Examples of named entities include *Barack Obama*, *New York City*, *Volkswagen Golf*, or anything else that can be named. Named entities can simply be viewed as entity instances (e.g., *New York City* is an instance of a city).


## Stop Words

Stop words are high-frequency words like a, an, the, to and also that we sometimes want to filter out of a document before further processing. Stop words usually have little lexical content and do not hold much of a meaning.

Stop words are a very important part of text clean up. It helps removal of meaningless data before we try to do actual processing to make sense of the text.


## Dependency Parsing

Dependency parsing is one of the features of spaCy that is fast and accurate. This feature of spaCy gives you a parsed tree that explains the parent-child relationship between the words or phrases and is independent of the order in which words occur.

Dependency parsing is one the most important parts when building chatbots from scratch. It becomes far more important when you want to figure out the meaning of a text input from your user to your chatbot.

There can be cases when you haven't trained your chatbots, but still you don't want to lose your customer or reply like a dumb machine. In these cases, dependency parsing really helps to find the relation and explain a bit more about what the user may be asking for.

If we were to list things for which dependency parsing helps, some might be:

- It helps in finding relationships between words of grammatically correct sentences.
- It can be used for sentence boundary detection.
- It is quite useful to find out if the user is talking about more than one context simultaneously.

### What about grammatically incorrect sentence?

You must be wondering, what if your bot user says any grammatically incorrect sentence or uses any SMS textspeak while giving input about something? As discussed in Chapter 1, you have to be cautious about these situations and handle them accordingly using NLP techniques.

You need to write your own custom NLP to understand the context of the user or your chatbot and, based on that, identify the possible grammatical mistakes a user can make.

All in all, you must be ready for such scenarios where a user will input garbage values or grammatically incorrect sentences. You can't handle all such scenarios at once, but you can keep improving your chatbot by adding custom NLP code or by limiting user input by design.


## Noun Chunks

You can think of noun chunks as a noun with the words describing the noun.


## Finding Similarity

Finding similarity between two words is a use-case you will find most of the time working with NLP. Sometimes it becomes fairly important to find if two words are similar. While building chatbots you will often come to situations where you don't have to just find similar-looking words but also how closely related two words are logically.

If you have ever used StackOverFlow, whenever we try to ask a new question, it tries to list similar questions already asked on the platform. This is one of the best examples where finding similarity between two sets of sentences might help. spaCy's confidence to find the similarity between two words based on an already trained model purely depends on the kind of general assumption taken.

When building chatbots, finding similarity can be very handy for the following situations:

- When building chatbots for recommendation
- Removing duplicates
- Building a spell-checker


## Tokenization

Tokenization is one of the simple yet basic concepts of NLP where we split a text into meaningful segments.

A question might come to your mind: Why can't i just use the built-in split method of Python language and do the tokenization? Python's split method is just a raw method to split the sentence into tokens given a separator. It doesn't take any meaning into account, whereas tokenization tries to preserve the meaning as well.