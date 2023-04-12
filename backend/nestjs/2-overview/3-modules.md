# Modules

A module is a class annotated with a `@Module()` decorator.

![](https://docs.nestjs.com/assets/Modules_1.png)

## Creating a module

```ts
nest g module cats
```


## Register module

The `@Module()` decorator takes a single object whose properties describe the module:

- `providers`: the providers that will be instantiated by the Nest injector and that may be shared at least across this module
- `exports`: the subset of providers that are provided by this module and should be available in other modules which import this module
- `controllers`: the set of controllers defined in this module which have to be instantiated
- `imports`: the list of imported modules that export the providers which are required in this module


```ts
import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule {}
```

## Module re-exporting

Modules can export their internal providers. In addition, they can re-export modules that they import.

```ts
@Module({
  imports: [CommonModule],
  exports: [CommonModule],
})
export class CoreModule {}
```

## Inject providers to module class

A module class can inject providers as well (e.g., for configuration purposes):

```ts
// cats.module.ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {
  constructor(private catsService: CatsService) {}
}
```

## Global modules

When you want to provide a set of providers which should be available everywhere out-of-the-box (e.g., helpers, database connections, etc.), make the module **global** with the `@Global()` decorator.

```ts
import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```


## Dynamic module

Dynamic modules give us the ability to pass parameters into the module being imported so we can change its behavior.


### Declaring dynamic modules

The static `register()` method return an object that has the `DynamicModule` interface (synchronously or asynchronously).

```ts
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({})
export class ConfigModule {
  static register(options): DynamicModule {
    return {
      // global: true,
      module: ConfigModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
      // imports: []
    };
  }
}
```

A dynamic module is nothing more than a module created at run-time, with the same exact properties as a static module, plus one additional property called `module`. The `module` property serves as the name of the module, and should be the same as the class name of the module.

### Accessing module configuration

Our `ConfigModule` is providing `ConfigService`. `ConfigService` in turn depends on the `options` object that is only supplied at run-time. 

Our remaining task is to somehow inject the `options` object from the `register()` step into our `ConfigService`.

What we need to do is define our `options` object as a provider. This will make it injectable into the `ConfigService`.

```ts
// config.service.ts
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Injectable, Inject } from '@nestjs/common';
import { EnvConfig } from './interfaces';

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(@Inject('CONFIG_OPTIONS') private options) {
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;
    const envFile = path.resolve(__dirname, '../../', options.folder, filePath);
    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
```

### Using dynamic module

The `@Module()` decorator's imports property can take not only a module class name (e.g., `imports: [UsersModule]`), but also a function returning a dynamic module (e.g., `imports: [ConfigModule.register(...)]`).

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule.register({ folder: './config' })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```


### Export imported dynamic module

```ts
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [DatabaseModule.forRoot([User])],
  exports: [DatabaseModule],
})
export class AppModule {}
```


### Other example

One example use case of dynamic module is when we want to import a provider from another module, but the provider can only be initiated with some options that only available at runtime.

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule.register({ folder: './config' })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```


```ts
// config.module.ts
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({})
export class ConfigModule {
  static register(options): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
```

```ts
// config.service.ts
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Injectable, Inject } from '@nestjs/common';
import { EnvConfig } from './interfaces';

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(@Inject('CONFIG_OPTIONS') private options) {
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;
    const envFile = path.resolve(__dirname, '../../', options.folder, filePath);
    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
```