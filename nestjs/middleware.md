# Middleware

Middleware is a function which is called before the route handler.

## Implementing middleware

**logger.middleware.ts**:

```ts
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

**app.module.ts**:

```ts
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
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
```

Multiple middleware:

```ts
consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);
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

**logger.middleware.ts**:

```ts
export function logger(req, res, next) {
  console.log(`Request...`);
  next();
};
```


## Global middleware

```ts
const app = await NestFactory.create(AppModule);
app.use(logger);
await app.listen(3000);
```