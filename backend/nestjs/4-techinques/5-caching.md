# Caching

## Installation

```ts
yarn add cache-manager
yarn add -D @types/cache-manager
```


## Registering cache module

```ts
import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [CacheModule.register({
    ttl: 5, // seconds
    max: 10, // maximum number of items in cache
  })],
  controllers: [AppController],
})
export class AppModule {}
```


## Injecting cache manager

```ts
constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
```


## Cache operations

```ts
const value = await this.cacheManager.get('key');

await this.cacheManager.set('key', 'value');

await this.cacheManager.set('key', 'value', { ttl: 1000 });

// disable expiration of the cache
await this.cacheManager.set('key', 'value', { ttl: 0 });

await this.cacheManager.del('key');

await this.cacheManager.reset();
```


## Auto-caching responses

```ts
@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  @Get()
  findAll(): string[] {
    return [];
  }
}
```

Bind `CacheInterceptor` to all endpoints globally:

```ts
import { CacheModule, Module, CacheInterceptor } from '@nestjs/common';
import { AppController } from './app.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [CacheModule.register()],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
```

Global cache overrides in controller action:

```ts
@Controller()
export class AppController {
  @CacheKey('custom_key')
  @CacheTTL(20)
  findAll(): string[] {
    return [];
  }
}
```


## Adjust tracking

Sometimes you might want to set up tracking based on different factors, for example, using HTTP headers. In order to accomplish that, create a subclass of `CacheInterceptor` and override the `trackBy()` method:

```ts
@Injectable()
class HttpCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    return 'key';
  }
}
```


## Different cache stores

```ts
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
```


## Async configuration

```ts
CacheModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    ttl: configService.get('CACHE_TTL'),
  }),
  inject: [ConfigService],
});
```