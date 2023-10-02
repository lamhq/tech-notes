# Forms

## Required fields

It is recommended to add the `required` and `aria-required="true"` to the form control to indicate that the field is required.

```html
<label for="email">Your email address <span class="mandatory">*</span></label>
<input id="email" name="email" required aria-required="true" placeholder="Email" required="">
```

## Labels

Visual labels are text near a form control that describe what information belongs in a given form field or a group of fields.

Each label must be programmatically associated with the form control or group of controls.

Labels are not necessarily the `<label>` element.

Missing labels will make a form inaccessible for many users.


### `<label>` tag

The `<label>` tag defines a label for several elements, like `<input>`, `<select>` and `<textarea>`.

```html
<label for="customerType">Who are you buying for today?</label>
<select name="customerType" id="customerType">
```

Screen-reader will read out loud the label when the user focus on the input element.

It also help users who have difficulty clicking on very small regions (such as radio buttons or checkboxes).

*When the user clicks the text within the `<label>` element, it toggles the radio button or checkbox.*


### `aria-label` attribute

Fields without visual labels still needs a label (e.g. search form). If you can not use a `<label>`, one option is to use a `aria-label`.

```html
<input placeholder="Enter search term" aria-label="Enter search term">
```


### `<legend>`

Groups of form controls, like checkboxes and radio buttons use label made with `<fieldset>` and `<legend>`.

```html
<fieldset>
  <legend>Your date of birth</legend>
  <label for="dobDay">Day</label>
  <select id="dobDay">…</select>
  <label for="dobMonth">Month</label>
  <select id="dobMonth">…</select>
  <label for="dobYear">Year</label>
  <input id="dobYear" type="text" placeholder="YYYY">
</fieldset>
```


## Autocomplete attribute

The autocomplete attribute helps the browser autofill the fields in web form.

This is convenient for everybody. This is very helpful for user with motor impairments or cognitive disabilities.

Autocomplete can be used on `<input>`, `<textarea>`, `<select>` and `<form>` elements.

Here're [the complete list of Input Purposes for `autocomplete` attribute](https://www.w3.org/TR/WCAG21/#input-purposes).

```html
<input id="email" autocomplete="email" name="email" aria-required="true" placeholder="Email" required>

<select id="dobDay" autocomplete="bday-day" aria-required="true" required>

<select id="dobMonth" autocomplete="bday-month" aria-required="true" required>

<input id="dobYear" autocomplete="bday-year" placeholder="YYYY" aria-required="true" required>
```


## Errors

An accessible form needs error messages that is perceivable and understandable for people:

- who is color blind.
- who is blind or low vision.
- with limited cognitive abilities.

An accessible error message is

- written in text.
- close to the element that has failed.
- informative, helping the user.
- associated to the failed element in the code.

In addition, is is helpful to move the focus to the form control that has failed.

### Written in text

The error message is written in text, in addition to a warning icon and red border.

### Close together

Design elements near each other are perceived as related, while elements spaced apart are perceived as belonging to separate groups.

The errors are close to the failing fields. In combination with a big margin between the fields, it is easy to understand where the error messages belongs.

![](https://www.w3schools.com/accessibility/img_ee_error-proximity.png)


### Informative

The more informative, precise, the better.

The system needs more error messages for different situations.

Ask the users if they understand what is wrong. If not, write the error more precise.

Good:
> Your first name must have at least two letters and no unusual characters

Better:
> Your first name must have only letters, not numbers.


### Associated with the form control

The error has the **role alert**. It would make a screen reader read out the content, even though it is not in focus.

The error message is assosiated with the field using **aria-describedby** attribute. The value is the ID of the error message.

`aria-invalid="true"` is added on the invalid form control to tell screen readers that the form control has failed.

```html
<input
  name="firstName"
  id="firstNameInput"
  type="text"
  pattern="[^.]*?"
  aria-describedby="firstName-length-error" aria-invalid="true"/>

<p id="firstName-length-error" role="alert">Your first name must have at least two letters and no unusual characters</p>
```

### Move focus to the failed form control

The focus was moved to the invalid first field.

The error is removed when the user starts typing.

![](https://www.w3schools.com/accessibility/img_ee_error-focus.png)