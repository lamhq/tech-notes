# Introduction

## Version

This document is for NextAuth version 4. With Next.js page router.


## About NextAuth.js

NextAuth.js is a complete open-source authentication solution for [Next.js](http://nextjs.org/) applications.

It is designed from the ground up to support Next.js

- Designed to work with any OAuth service, it supports OAuth 1.0, 1.0A, 2.0 and OpenID Connect
- Supports email / passwordless authentication
- Supports stateless authentication with any backend
- Supports both JSON Web Tokens and database sessions
- NextAuth.js can be used with or without a database.


## Secure by default

- Promotes the use of passwordless sign-in mechanisms
- Designed to be secure by default and encourage best practices for safeguarding user data
- Uses Cross-Site Request Forgery Tokens on POST routes (sign in, sign out)
- Default cookie policy aims for the most restrictive policy appropriate for each cookie
- When JSON Web Tokens are enabled, they are encrypted by default (JWE) with A256GCM
- Auto-generates symmetric signing and encryption keys for developer convenience
- Features tab/window syncing and keepalive messages to support short-lived sessions
- Attempts to implement the latest guidance published by [Open Web Application Security Project](https://owasp.org/)
