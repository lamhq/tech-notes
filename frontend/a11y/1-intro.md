# Intro

## What is digital accessibility?

Digital accessibility is about designing and building websites and web apps that disabled people can interact with in a meaningful and equivalent way.


## What is the individual impact?

The World Health Organization (WHO) estimates that over 15% of the world's population—or 1.3 billion people—self-identify as having a disability, making this group the largest minority group globally.

Inaccessible digital products impact people with disabilities. Some types of disabilities are impacted more in the digital world than others.

### Visual impairments

Visual impairment (vision impairment, vision disability) is a decreased ability to see to the degree that causes problems not fixable by usual means, such as glasses or medication.

Tools include: 
- Screen reader software
- screen magnification tools
- Braille output devices.

Pain points:
- Digital products that do not work with screen reader software
- mobile websites/apps without pinch to zoom
- complex graphs and charts differentiated by colors alone
- color contrasts that make it difficult to read text on the screen


### Mobility impairments

Mobility impairment is a category of disability that includes people with various physical disabilities. This type of disability includes upper or lower limb loss or disability, manual dexterity, and disability in coordination with different organs of the body.

Tools include: 
- Adaptive switches
- eye tracking devices
- mouth/head sticks
- speech input.

Pain points:
- Elements that are only designed to work with the use of a mouse.


### Hearing impairments

A hearing impairment or hearing loss is a full or partial decrease in the ability to detect or understand sounds

Tools include:
- hearing aids
- captions, transcripts
- sign language.

Pain points:
- Audio content without text transcripts
- video with no synchronized captions


### Cognitive impairments

A cognitive disability covers a variety of medical conditions affecting cognitive ability. People with cognitive disabilities include various intellectual or cognitive deficits, deficits too mild to properly qualify as intellectual disability, specific conditions, and problems acquired later in life through acquired brain injuries or neurodegenerative diseases like dementia.

Tools include:
- Screen readers
- text highlighting
- text prediction
- abstractive summarization tools.

Pain points:
- Busy interfaces that make it overly complicated to focus on the task at hand
- Big walls of words with little whitespace, justified text
- Small or hard-to-read fonts.


### Speech impairments

A speech disorder is a condition in which a person has problems creating or forming the speech sounds needed to communicate with others.

Tools include:
- Augmentative and alternative communication (AAC) 
- speech-generating devices.

Pain points:
- Voice-activated technology such as smart home devices and apps.


## How is digital accessibility measured?

Accessibility measurement ensures everyone, including people with disabilities, can still interact with your website in a meaningful and equal way.

There are many ways to test a digital product for accessibility. One fundamental approach is to evaluate it against a set of accessibility standards.

The standard recommendation is to follow the latest version of the [Web Content Accessibility Guidelines (WCAG)](https://web.dev/learn/accessibility/measure/#wcag).

Testing your digital product against an accessibility standard and conformance level is commonly referred to as an accessibility audit.

You should run this audit multiple times throughout the software product lifecycle to check for changes in the level of conformance, against a set of pre-determined accessibility checkpoints or guidelines.


## Web Content Accessibility Guidelines (WCAG)

The Web Content Accessibility Guidelines (WCAG) are an international set of accessibility standards developed through the W3C, in cooperation with individuals and organizations.

The goal of WCAG is to provide a single shared standard for digital accessibility that meets the needs of individuals, organizations, and governments worldwide.

WCAG is primarily intended for web-based and native mobile app designers and developers.

The WCAG guidelines have three levels of success criteria: A, AA, and AAA.

For the current standard (WCAG 2.1), there are 78 success criteria in total, split across each level.

- A success: 30 success criteria
- AA success: 20 success criteria
- AAA success: 28 success criteria


## Accessibility principles

Principles of WCAG: Perceivable, Operable, Understandable, and Robust (POUR)

The whole point of POUR is not about rigidly adhering to hard and fast rules. Instead, it is a way to help you understand and meet the diverse needs of your users.


### Perceivable

This principle states that users must be able to perceive all essential information on the screen, and it must be conveyed to multiple senses.

**Ask yourself**: Is there any content or functionality in your digital product that a person with a specific disability would not be able to perceive? Be sure to consider all the different types of disabilities—visual, mobility, hearing, cognitive, and speech impairments, vestibular and seizure disorders, and more.

**Examples of Perceivable:**

- Adding text alternatives to all non-decorative images and essential icons.
- Adding captions, transcripts, and audio descriptions to videos.
- Ensuring color is not the only method of conveying meaning.


### Operable

For this principle, users must be able to operate the digital product's interface. The interface cannot require interaction that a user cannot perform.

Ask yourself:
- Can users control the interactive elements of your digital product?
- Are there any focus order issues or keyboard traps?
- How are touch interfaces handled?

Examples of Operable:

- Adding keyboard and touchscreen support to all active elements.
- Ensuring slideshows and videos have all of the necessary controls available.
- Giving users enough time to fill out a form or a method to extend the time.


### Understandable

For this principle, users must understand the information and the operation of the user interface.

Ask yourself:
- Is all of the content clearly written?
- Are all of the interactions easy to understand?
- Does the order of the page make sense—to sighted users, keyboard-only users, screen reader users?

Examples of Understandable:

- Writing simply—don't use a complex word when a simple one will do.
- Ensuring your digital product has predictable navigation.
- Ensuring error messages are clear and easy to resolve.


### Robust

This principle focuses on supporting assistive technologies and ensuring that, as devices and user agents evolve, the digital product remains accessible.

Ask yourself:
- What types of assistive technology are you supporting?
- Does your digital product only work on the newest browsers or operating systems?
- Does it work at all breakpoints and in different device orientations?

Examples of Robust:

- Testing keyboard-only navigation.
- Testing with different screen reader technologies.
- Ensuring all of the content and functionality can be accessed, regardless of device size or orientation.