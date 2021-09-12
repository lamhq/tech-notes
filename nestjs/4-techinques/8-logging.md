# Logger

Logging functionality is provided via the `Logger` class in the `@nestjs/common` package.

## Disable logging

To disable logging, set the `logger` property to `false` in the `NestFactory.create()` method.

```ts
const app = await NestFactory.create(AppModule, {
  logger: false,
});
await app.listen(3000);
```


## Enable specific logging levels

set the `logger` property to an array of strings specifying the log levels to display:

```ts
const app = await NestFactory.create(AppModule, {
  logger: ['error', 'warn'],
});
await app.listen(3000);
```


## Disable color

The logger service uses module `cli-color`, setting environment variable `NO_COLOR` disables the output of color codes.

```sh
export NO_COLOR=1
```


## Accessing logging service

```ts
import { Logger, Injectable } from '@nestjs/common';

@Injectable()
class MyService {
  private readonly logger = new Logger('context name');

  doSomething() {
    this.logger.log('Doing something...');
  }
}
```

## Define custom logger

```ts
import { LoggerService } from '@nestjs/common';

export class MyLogger implements LoggerService {
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {}

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {}

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {}

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]) {}

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]) {}
}
```


## Extending built-in logger

```ts
// my-logger.service.ts
import { ConsoleLogger } from '@nestjs/common';

export class MyLogger extends ConsoleLogger {
  error(message: any, stack?: string, context?: string) {
    // add your tailored logic here
    super.error.apply(this, arguments);
  }
}
```


## Using custom logger

Create a `LoggerModule` as shown below, and provide `MyLogger` service from that module.

```ts
import { Module } from '@nestjs/common';
import { MyLogger } from './my-logger.service';

@Module({
  providers: [MyLogger],
  exports: [MyLogger],
})
export class LoggerModule {}
```

Because application instantiation `(NestFactory.create()`) happens outside the context of any module, it doesn't participate in the normal Dependency Injection phase of initialization. So we must ensure that at least one application module imports the `LoggerModule` to trigger Nest to instantiate a singleton instance of our `MyLogger` class.

We can then instruct Nest to use the same singleton instance of `MyLogger` with the following construction:

```ts
const app = await NestFactory.create(ApplicationModule, {
  // make sure all logs will be buffered until a custom logger is attached 
  bufferLogs: true,
});
app.useLogger(app.get(MyLogger));
await app.listen(3000);
```

Next, import the `LoggerModule` into your feature module. 

```ts
import { Injectable } from '@nestjs/common';
import { MyLogger } from './my-logger.service';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  constructor(private myLogger: MyLogger) {
    // Due to transient scope, CatsService has its own unique instance of MyLogger,
    // so setting context here will not affect other instances in other services
    this.myLogger.setContext('CatsService');
  }

  findAll(): Cat[] {
    // You can call all the default methods
    this.myLogger.warn('About to return cats!');
    // And your custom methods
    this.myLogger.customLog();
    return this.cats;
  }
}
```