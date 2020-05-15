# Configuration

## Installation

```shell
yarn add @nestjs/config
```


## Configuration file

```ts
// config/configuration.ts
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432
  }
});
```


## Register ConfigModule

```ts
// app.module.ts
import configuration from './config/configuration';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration],
  })],
})
export class AppModule {}
```


## Using ConfigService

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
  constructor(private configService: ConfigService) {}

  @Post()
  create(@Body() data: any) {
    // get a custom configuration value
    // use "localhost" when "database.host" is not defined
    const dbHost = this.configService.get<string>('database.host', 'localhost');
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


## Using ConfigService in `main.ts`

```ts
const configService = app.get(ConfigService);
const port = configService.get('PORT');
```