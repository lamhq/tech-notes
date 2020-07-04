# React Hook Form


## Conditional rendering

```tsx
import React from 'react';
import { useForm } from 'react-hook-form';

function Demo() {
  const { register, handleSubmit, errors, formState, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      newsletter: false,
      firstName: '',
      lastName: '',
      email: '',
    },
  });
  const onSubmit = data => console.log(data);
  const newsletter = watch('newsletter');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="firstName" ref={register({ required: true, maxLength: 20 })} placeholder="first name" />
      {errors.firstName && <span>This field is required</span>}

      <input name="lastName" ref={register({ required: true, pattern: /^[A-Za-z]+$/i })} placeholder="last name" />
      {errors.lastName && <span>This field is wrong</span>}

      <label>
        <input type="checkbox" name="newsletter" ref={register} /> Receive newsletter email
      </label>

      {newsletter && (
        <>
          <input name="email" ref={register({ required: true })} placeholder="email" />
          {errors.email && <span>This field is required</span>}
        </>
      )}

      <button type="submit" disabled={!formState.isValid}>
        Submit
      </button>
    </form>
  );
};
```


## Work with UI library

For components that don't expose `ref`

```ts
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';

export default { title: 'Atoms|Abc' };

export const Demo = () => {
  const { handleSubmit, errors, formState, control } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller name="email" as={TextField} label="Email" control={control} rules={{ required: true }} />
      {errors.email && <span>This field is required</span>}

      <button type="submit" disabled={!formState.isValid}>
        Submit
      </button>
    </form>
  );
};
```