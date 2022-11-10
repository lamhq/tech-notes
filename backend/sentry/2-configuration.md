# Configuration

## Basic Options

```ts
Sentry.init({
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
  maxBreadcrumbs: 50,
  debug: true,
});
```

### dsn

The DSN tells the SDK where to send the events. 

If this value is not provided, the SDK will try to read it from the `SENTRY_DSN` environment variable.

If that variable also does not exist, the SDK will just not send any events.


## debug

If debug is enabled SDK will attempt to print out useful debugging information if something goes wrong with sending the event.

The default is always `false`.


## release

Sets the release. 

By default the SDK will try to read this value from the `SENTRY_RELEASE` environment variable

```ts
Sentry.init({
  release: "my-project-name@" + process.env.npm_package_version,
});
```

## environment

Sets the environment. 

By default the SDK will try to read this value from the `SENTRY_ENVIRONMENT` environment variable


## sampleRate

Configures the sample rate for error events, in the range of `0.0` to `1.0`.

The default is `1.0` which means that 100% of error events are sent.


## initialScope

```ts
Sentry.init({
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
  debug: true,
  initialScope: {
    tags: {"my-tag": "my value"},
    user: {id: 42, email: "john.doe@example.com"},
  }
});
```
