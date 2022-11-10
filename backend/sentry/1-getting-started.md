# Sentry for Node.js

## Install

```sh
# Using yarn
yarn add @sentry/node @sentry/tracing

# Using npm
npm install --save @sentry/node @sentry/tracing
```

## Configure

Configuration should happen as early as possible in your application's lifecycle.

```ts
import * as Sentry from "@sentry/node";

// Importing @sentry/tracing patches the global hub for tracing to work.
import * as Tracing from "@sentry/tracing";

Sentry.init({
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});
```


## Verify

```ts
const transaction = Sentry.startTransaction({
  op: "test",
  name: "My First Test Transaction",
});

setTimeout(() => {
  try {
    foo();
  } catch (e) {
    Sentry.captureException(e);
  } finally {
    transaction.finish();
  }
}, 99);
```


## For Express framework

Sentry should be initialized as early in your app as possible:

```ts
import express from "express";
import * as Sentry from "@sentry/node";

// or using CommonJS
// const express = require('express');
// const Sentry = require('@sentry/node');

const app = express();

Sentry.init({ dsn: "https://251baec1d78d4edca442c555ed6da304@o1090039.ingest.sentry.io/6105739" });

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// All controllers should live here
app.get("/", function rootHandler(req, res) {
  res.end("Hello world!");
});

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

app.listen(3000);
```

You can verify the Sentry integration by creating a route that will throw an error:

```ts
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
```

If you use TypeScript, you need to cast our handlers to express specific types:

```ts
// from
const express = require('express');
// to
import * as express from 'express';


// from
app.use(Sentry.Handlers.requestHandler());
// to
app.use(Sentry.Handlers.requestHandler() as express.RequestHandler);


// from
app.use(Sentry.Handlers.errorHandler());
// to
app.use(Sentry.Handlers.errorHandler() as express.ErrorRequestHandler);
```

### Monitor Performance

```ts
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const express = require("express");
const app = express();

Sentry.init({
  dsn: "https://251baec1d78d4edca442c555ed6da304@o1090039.ingest.sentry.io/6105739",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({
      // to trace all requests to the default router
      app,
      // alternatively, you can specify the routes you want to trace:
      // router: someRouter,
    }),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// the rest of your app

app.use(Sentry.Handlers.errorHandler());
app.listen(3000);
```