# Middleware

Middleware is a function which is called before the route handler.

![](https://docs.nestjs.com/assets/Middlewares_1.png)

Middleware functions can perform the following tasks:
- execute any code.
- make changes to the request and the response objects.
- end the request-response cycle.
- call the next middleware function in the stack.
- if the current middleware function does not end the request-response cycle, it must call `next()` to pass control to the next middleware function. Otherwise, the request will be left hanging.

## Implementing middleware

Nest middleware fully supports Dependency Injection through the constructor.

```ts
// logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log('Request...');
    next();
  }
}
```


## Applying middleware

```ts
// app.module.ts
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .forRoutes(CatsController);
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
```

Multiple middlewares:

```ts
consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);
```

## Route wildcards

```ts
forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });
```

## Excluding routes

```ts
consumer
  .apply(LoggerMiddleware)
  .exclude(
    { path: 'cats', method: RequestMethod.GET },
    { path: 'cats', method: RequestMethod.POST },
    'cats/(.*)',
  )
  .forRoutes(CatsController);
```


## Functional middleware

```ts
// logger.middleware.ts
export function logger(req, res, next) {
  console.log(`Request...`);
  next();
};
```

```ts
// app.module.ts
consumer
  .apply(logger)
  .forRoutes(CatsController);
```


## Global middleware

```ts
const app = await NestFactory.create(AppModule);
app.use(logger);
await app.listen(3000);
```