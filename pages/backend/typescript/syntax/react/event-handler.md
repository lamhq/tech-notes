# Event Handlers

## Input Event Handlers

```tsx
// typing on LEFT hand side of =
const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
  console.log(e.currentTarget.value);
}
```


## Form Event Handlers

```tsx
const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
  this.setState({ text: e.currentTarget.value });
};
```

If you don't quite care about the type of the event, you can just use `React.SyntheticEvent`:

```tsx
<form
  ref={formRef}
  onSubmit={(e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value; // typechecks!
    const password = target.password.value; // typechecks!
    // etc...
  }}
>
```

Read more about [event types](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events#list-of-event-types).
