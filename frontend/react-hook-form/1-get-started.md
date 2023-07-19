# Get Started

Version: **7.9.0**

## Installation

```sh
yarn add react-hook-form
```

## Example

```tsx
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  example: string,
  exampleRequired: string,
};

export default function App() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  console.log(watch("example")) // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue="test" {...register("example")} />
      
      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("exampleRequired", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}
      
      <input type="submit" />
    </form>
  );
}
```

## Register fields

```ts
register: (Ref, RegisterOptions?) 
  => ({ onChange, onBlur, name, ref })
```

```tsx

<input {...register("firstName")} />
<select {...register("gender")}>
  <option value="female">female</option>
  <option value="male">male</option>
  <option value="other">other</option>
</select>
```

## Apply validation

List of validation rules supported:

- required
- min
- max
- minLength
- maxLength
- pattern
- validate

```tsx
<input {...register("firstName", { required: true, maxLength: 20 })} />
<input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
<input type="number" {...register("age", { min: 18, max: 99 })} />
```

You can read more detail on each rule in the [register section](https://react-hook-form.com/api#register).


## Integrating with UI libraries

```tsx
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';

const schema = yup.object().shape({
  firstName: yup.string().required('Please fill out this field.'),
});


interface IFormInput {
  firstName: string;
}

const App = () => {
  const { control, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = data => {
    console.log(data)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => (
          <TextField
            label="First name"
            required
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            {...field}
          />
        )}
      />    
      <LoadingButton
        loading={isSubmitting}
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        fullWidth
      >
        SIGN IN
      </LoadingButton>
    </form>
  );
};
```

## Handle errors

```tsx
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInputs {
  firstName: string
  lastName: string
}

const onSubmit: SubmitHandler<IFormInputs> = data => console.log(data);

export default function App() {
  const { register, formState: { errors }, handleSubmit } = useForm<IFormInputs>();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName", { required: true })} />
      {errors.firstName && "First name is required"}
      <input {...register("lastName", { required: true })} />
      {errors.lastName && "Last name is required"}
      <input type="submit" />
    </form>
  );
}
```

## Schema Validation

```sh
yarn add @hookform/resolvers yup
```

```tsx
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

interface IFormInputs {
  firstName: string
  age: number
}

const schema = yup.object().shape({
  firstName: yup.string().required(),
  age: yup.number().positive().integer().required(),
});

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data: IFormInputs) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
      <p>{errors.firstName?.message}</p>
        
      <input {...register("age")} />
      <p>{errors.age?.message}</p>
      
      <input type="submit" />
    </form>
  );
}
```