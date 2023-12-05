# Amazon Cognito

## Overview

Cognito provides authentication, authorization, and user management for your web and mobile apps in a single service without the need for custom code. Your users can sign in directly with a username and password they create or through a third party (e.g., Facebook, Amazon, Google, or Apple).


## Features

- It gives you Sign-up and sign-in options for your apps
- Give access for guest users
- Acts as an identity broker between your application and web ID providers, so you don't need to write any custom code
- Synchronizes user data across multiple devices
- Recommended for all mobile applications that call AWS services


## Use cases

- Authentication. Users can sign in using a user pool or a third -party identity provider, such as Facebook.
- Access Server-Side Resources. A signed-in user is given a token that allows them access to resources that you specify.
- Third-Party Authentication. Users can authenticate using identity pools that require an identity provider (IdP) token.
- Access AWS AppSync Resources. Users can be given access to AppSync resources with tokens received from a user or identity pool in Cognito.


## Concepts

- **User pools** are directories of users that provide sign-up and sign-in options for vour application users.
- **Identity pools** allow you to give your users access to other AWS services.

You can use identity pools and user pools either separately or together.


## Workflow

You've got an application on your phone
and you're trying to log in and access the resources that
that application is designed to use.

You're logging into your app
and it's connecting to a **user pool** in Cognito
and you're authenticating and getting tokens.

Once you've got that token,
your device is then going to exchange that token
to an **identity pool**,
and the identity pool is going to go ahead
and give some AWS credentials.

And then you can use those AWS credentials
to access your AWS services.

![](images/cognito-workflow.png)