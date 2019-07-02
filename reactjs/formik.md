# Formik

## basic
```js
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});

const CustomInputComponent = ({
  field,
  form: { touched, errors },
  ...props
}) => (
  <div>
    <input type="text" {...field} {...props} />
  </div>
);

export const ValidationSchemaExample = () => (
  <div>
    <h1>Signup</h1>
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field name="firstName" />
          <ErrorMessage name="firstName" component="div" />

          <Field name="lastName" />
          <ErrorMessage name="lastName" component={CustomInputComponent} />

          <Field name="email" type="email" />
          <ErrorMessage name="email" component="div" />
          
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);
```


## Nested Object
```js
import React from 'react';
import { Formik, Form, Field } from 'formik';

export const NestedExample = () => (
  <div>
    <h1>Social Profiles</h1>
    <Formik
      initialValues={{
        social: {
          facebook: '',
          twitter: '',
        },
      }}
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
      }}
    >
      <Field name="social.facebook" />
      <Field name="social.twitter" />
      <button type="submit">Submit</button>
    </Formik>
  </div>
);
```

## Array
```js
import React from 'react';
import { Formik, Form, Field } from 'formik';

export const BasicArrayExample = () => (
  <div>
    <h1>Friends</h1>
    <Formik
      initialValues={{
        friends: ['jared', 'ian'],
      }}
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
      }}
    >
      <Field name="friends[0]" />
      <Field name="friends[1]" />
      <button type="submit">Submit</button>
    </Formik>
  </div>
);
```

## Array of Objects
```js
// to do
```