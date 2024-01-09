# Amazon Cognito

## Overview

Cognito is a service that provides authentication, authorization, and user management for your web and mobile apps without the need for custom code.

Your users can sign in directly with a username and password they create or through a third party (e.g., Facebook, Amazon, Google, or Apple).


## Features

- Gives you Sign-up and sign-in options for your apps
- Give access for guest users
- Acts as an identity broker between your application and web ID providers, so you don't need to write any custom code
- Synchronizes user data across multiple devices
- Recommended for all mobile applications that call AWS services


## Use cases

**Authentication**. Users can sign in using a user pool or a third -party identity provider, such as Facebook.

**Access Server-Side Resources**. A signed-in user is given a token that allows them access to resources that you specify.

**Third-Party Authentication**. Users can authenticate using identity pools that require an identity provider (IdP) token.

**Access AWS AppSync Resources**. Users can be given access to AppSync resources with tokens received from a user or identity pool in Cognito.


## User Pools

User pools are directories of users that provide sign-up and sign-in options for your application users.

With a user pool, users can sign in to a web or mobile app through Amazon Cognito.

Users can also sign in through social identity providers like Google, Facebook, Amazon, or Apple, and through SAML identity providers.

Whether your users sign in directly or through a third party, all members of the user pool have a directory profile that you can access through a Software Development Kit (SDK)

![](https://digitalcloud.training/wp-content/uploads/2022/01/amazon-api-gateway-cognito-user-pool.jpeg)

User pools provide:
- Sign-up and sign-in services.
- A built-in, customizable web UI to sign in users.
- Social sign-in with Facebook, Google, Login with Amazon, and Sign in with Apple, as well as sign-in with SAML identity providers from your user pool.
- User directory management and user profiles.
- Security features such as multi-factor authentication (MFA).


## Identity pools

Identity pools allow you to give your users access to other AWS services.

You can use identity pools and user pools either separately or together.


## Workflow

You've got an application and you're trying to log in and access the resources
that application is designed to use.

You're logging into your app
and it **connects to a user pool** in Cognito
for **authenticating and getting tokens**.

Your device **exchange that token
to an identity pool** for AWS credentials.

You use AWS credentials
to access your AWS services.

![](https://docs.aws.amazon.com/images/cognito/latest/developerguide/images/scenario-cup-cib.png)