# Supabase

## Version
This document was created in March 2024.


## Overview

A Backend-as-a-Service (BaaS) platforms that offer developers a range of tools to build web and mobile applications without managing the server-side infrastructure.

Supabase is open-source (alternative to Firebase). Maket it easy to run Supabase services locally with Docker and Supabase CLI.

All services store metadata in Postgres.

Pros:
- Shorter learning curve than Firebase

Cons:
- TBC

## Services
- **Database**: A full-feature Postgres database for every project with a wide range of extensions
- **Auth**: Supports various authentication methods: email, password, passwordless, OAuth, mobile logins, custom SMTP server
- **Storage**: Provides file storage solutions with features like resumable uploads and image transformations
- **Edge Functions**: Enables globally distributed TypeScript functions run on [Deno](https://deno.land/).
- **Realtime**: Listen to database changes, store and sync user states across clients, broadcast data to clients subscribed to a channel, and more.
- **AI & Vectors**: Use Supabase to store and search embedding vectors.

Additionals:
- **APIs**: Automatically generates RESTful and GraphQL APIs from your database without writing any code
- **Dashboard**: open source Dashboard for managing your database and services.


## Pricing

### Free plan

Project are paused after 1 week of inactivity. Max 2 active projects.

Good for personal projects. Not for team.

**Database**:
- Dedicated Postgres Database
- 500 MB database space
- 2 Core shared CPU + 1 GB RAM
- Paused after 1 week of inactivity 😕
- 5 GB bandwidth

**Edge function**:
- 500,000 invocations/month
- 50 MB max script size
- 10 functions 😕
- No time limit 🥰

**Auth**:
- 50,000 monthly active users
- Custom SMTP server
- Has Supabase branding from emails 😕

**Storage**:
- max file upload size 50 MB
- 1 GB file storage


### Other plans

- Pro $25/month
- Team $599/month
- Enterprise: contact

Additional usage costs are also billed at the end of the month.