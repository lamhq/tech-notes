# Configuration

## Installation

```shell
yarn add @nestjs/config
```

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
})
export class AppModule {}
```

`@nestjs/config` relies on [dotenv](https://github.com/motdotla/dotenv). The above code will load and parse a `.env` file from the default location (the project root directory) and store the result in a private structure that you can access through the `ConfigService`.

When a key exists both in the runtime environment as an environment variable and in a .env file, the runtime environment variable takes precedence.

## Expandable variables

With this technique, you can create nested environment variables, where one variable is referred to within the definition of another. For example:

```sh
APP_URL=mywebsite.com
SUPPORT_EMAIL=support@${APP_URL}
```

Enable environment variable expansion using the `expandVariables` option:

```ts
@Module({
  imports: [
    ConfigModule.forRoot({
      // ...
      expandVariables: true,
    }),
  ],
})
export class AppModule {}
```

## Use module globally

By declaring it as a global module, you will not need to import `ConfigModule` in other modules once it's been loaded in the root module.

```ts
ConfigModule.forRoot({
  isGlobal: true,
});
```


## Custom configuration files

For more complex projects, you may utilize custom configuration files to return nested configuration objects.

This allows you to group related configuration settings by function (e.g., database-related settings), and to store related settings in individual files to help manage them independently.

```ts
// config/configuration.ts
export interface IConfiguration {
  port: number;
  database: {
    host: string;
    port: number;
  }
}

export const configFactory = (): IConfiguration => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432
  }
});
```

```ts
// app.module.ts
import { configFactory } from './config/configuration';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [configFactory],
  })],
})
export class AppModule {}
```


## Using the ConfigService

You do not need to import `ConfigModule` when `isGlobal` is set to `true`.

```ts
// feature.module.ts
@Module({
  imports: [ConfigModule],
  // ...
})
```

Using it in the code:

```ts
@Controller('test')
export class AppController {
  constructor(private configService: ConfigService<IConfiguration, true>) {}

  @Post()
  create(@Body() data: any) {
    const port = this.configService.get('port', { infer: true });

    // get a custom configuration value
    const dbHost = this.configService.get('database.host', { infer: true });
  }
}
```


## Validate config's schema

It is standard practice to throw an exception during application startup if required environment variables haven't been provided or if they don't meet certain validation rules.

```shell
yarn add @hapi/joi
yarn add --dev @types/hapi__joi
```

```ts
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(3000),
      }),
      validationOptions: {
        allowUnknown: false,
        abortEarly: true,
      },
    }),
  ],
})
export class AppModule {}
```


## Using in the `main.ts`

```ts
import { ConfigService } from '@nestjs/config';

const configService = app.get(ConfigService<IConfiguration, true>);
const port = configService.get('port', { infer: true });
```