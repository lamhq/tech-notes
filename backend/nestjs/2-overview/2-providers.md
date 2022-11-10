# Providers

A provider is simply a class annotated with an `@Injectable()` decorator. 

The main idea of a provider is that it can be injected as dependency.

Many of the basic Nest classes may be treated as a provider – services, repositories, factories, helpers, and so on. 


## Defining providers

```ts
// cats.service.ts
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
```


## Provider registration

Short hand syntax:

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class AppModule {}
```

Complete syntax:

```ts
@Module({
  controllers: [CatsController],
  providers: [
    {
      // service token
      provide: CatsService,
      useClass: CatsService,
    },
  ],
})
export class AppModule {}
```


## Using Provider

```ts
// cats.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
```


## Optional providers

```ts
import { Injectable, Optional, Inject } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
  constructor(@Optional() @Inject('HTTP_OPTIONS') private httpClient: T) {}
}
```


## Property-based injection

The technique we've used so far is called constructor-based injection, as providers are injected via the constructor method.

In some very specific cases, property-based injection might be useful. For instance, if your top-level class depends on either one or multiple providers, passing them all the way up by calling super() in sub-classes from the constructor can be very tedious.

```ts
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
  @Inject('HTTP_OPTIONS')
  private readonly httpClient: T;
}
```


## Value Provider

Use a mock `CatsService` for testing purposes instead of the real class `CatsService`:

```ts
import { CatsService } from './cats.service';

const mockCatsService = {
  /* mock implementation
  ...
  */
};

@Module({
  imports: [CatsModule],
  providers: [
    {
      provide: CatsService,
      useValue: mockCatsService,
    },
  ],
})
export class AppModule {}
```

### Non-class-based provider tokens

Use string token instead of class token:

```ts
import { connection } from './connection';

@Module({
  providers: [
    {
      provide: 'CONNECTION',
      useValue: connection,
    },
  ],
})
export class AppModule {}
```

```ts
@Injectable()
export class CatsRepository {
  constructor(@Inject('CONNECTION') connection: Connection) {}
}
```


## Creating providers dynamically

The actual provider will be supplied by the value returned from a factory function. The factory function can accept (optional) arguments. Provider injection can be done **asynchronously**.

```ts
const connectionFactory = {
  provide: 'CONNECTION',
  useFactory: async (optionsProvider: OptionsProvider) => {
    const connection = await createConnection(optionsProvider);
    return connection;
  },
  inject: [OptionsProvider],
};

@Module({
  providers: [connectionFactory],
})
export class AppModule {}
```


## Alias providers

```ts
@Injectable()
class LoggerService {
  /* implementation details */
}

const loggerAliasProvider = {
  provide: 'AliasedLoggerService',
  useExisting: LoggerService,
};

@Module({
  providers: [LoggerService, loggerAliasProvider],
})
export class AppModule {}
```


## Export Providers

A provider is scoped to its declaring module. To make it visible to other modules, it must be exported. To export a custom provider, we can either use its token or the full provider object.

```ts
const connectionFactory = {
  provide: 'CONNECTION',
  useFactory: (optionsProvider: OptionsProvider) => {
    const options = optionsProvider.get();
    return new DatabaseConnection(options);
  },
  inject: [OptionsProvider],
};

@Module({
  providers: [connectionFactory],
  // export using the token
  exports: ['CONNECTION'],
})
export class AppModule {}
```

```ts
const connectionFactory = {
  provide: 'CONNECTION',
  useFactory: (optionsProvider: OptionsProvider) => {
    const options = optionsProvider.get();
    return new DatabaseConnection(options);
  },
  inject: [OptionsProvider],
};

@Module({
  providers: [connectionFactory],
  // export with the full provider object
  exports: [connectionFactory],
})
export class AppModule {}
```