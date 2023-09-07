# Email

## How it work

The Email provider sends "magic links" via email that the user can click on to sign in (e.g. Slack).

On initial sign in, a Verification Token is sent to the email address provided. By default this token is valid for 24 hours. If the Verification Token is used within that time, an account is created for the user and they are signed in.

A user account will not be created for the user until the first time they verify their email address. If an email address is already associated with an account, the user will be signed in to that account when they use the link in the email.


If someone provides the email address of an existing account when signing in, an email is sent and they are signed into the account associated with that email address when they follow the link in the email.


## Set up (SMTP)

### Install Nodemailer

```bash
yarn add nodemailer
```

### Define connection string

Create an `.env` file to the root of your project and add the connection string and email address.

```bash
EMAIL_SERVER=smtp://username:password@smtp.example.com:587
EMAIL_FROM=noreply@example.com
```

Now you can add the email provider like this:

```js title="pages/api/auth/[...nextauth].js"
import EmailProvider from "next-auth/providers/email"
...
providers: [
  EmailProvider({
    server: process.env.EMAIL_SERVER,
    from: process.env.EMAIL_FROM,
    // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
  }),
],
...
```

#### Using a configuration object

```bash
EMAIL_SERVER_USER=username
EMAIL_SERVER_PASSWORD=password
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=587
EMAIL_FROM=noreply@example.com
```

Now you can add the provider settings to the NextAuth.js options object in the Email Provider.

```js title="pages/api/auth/[...nextauth].js"
import EmailProvider from "next-auth/providers/email";
...
providers: [
  EmailProvider({
    server: {
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD
      }
    },
    from: process.env.EMAIL_FROM
  }),
],
```


### Setup database adapter

[Setup a database adapter](https://authjs.dev/guides/adapters/creating-a-database-adapter) for storing the Email verification token.

You can now sign in with an email address at `/api/auth/signin`.


## Customizing emails

You can fully customize the sign in email that is sent by passing a custom function as the `sendVerificationRequest` option to `EmailProvider()`.

See [here](https://next-auth.js.org/providers/email#customizing-emails).


## Sending Magic Links To Existing Users

You can send another link than the sign-in link.

```js title="pages/api/auth/[...nextauth].js"
import User from "../../../models/User"; 
import db from "../../../utils/db"; 
...
callbacks: {
  async signIn({ user, account, email }) { 
    await db.connect(); 
    const userExists = await User.findOne({ 
      email: user.email,  //the user object has an email property, which contains the email the user entered.
    });
    if (userExists) {
      return true;   //if the email exists in the User collection, email them a magic login link
    } else {
      return "/register"; 
    }
  },
  ...
``` 