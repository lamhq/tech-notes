# Injection scopes

## Provider scope

- `DEFAULT`: A single instance of the provider is shared across the entire application.
- `REQUEST`: A new instance of the provider is created exclusively for each incoming request. The instance is garbage-collected after the request has completed processing.
- `TRANSIENT`: Transient providers are not shared across consumers. Each consumer that injects a transient provider will receive a new, dedicated instance.


## Specifying scope

```ts
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class CatsService {}
```

For custom providers:

```ts
{
  provide: 'CACHE_MANAGER',
  useClass: CacheManager,
  scope: Scope.TRANSIENT,
}
```

## Controller scope

```ts
@Controller({
  path: 'cats',
  scope: Scope.REQUEST,
})
export class CatsController {}
```

## Scope hierarchy

A controller that depends on a request-scoped provider will, itself, be request-scoped.


## Accessing Request Object

```ts
import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class CatsService {
  constructor(@Inject(REQUEST) private request: Request) {}
}
```

## Performance

Using request-scoped providers will have an impact on application performance. Nest has to create an instance of your class on each request, it will slow down your average response time and overall benchmarking result. 

Unless a provider must be request-scoped, it is strongly recommended that you use the default singleton scope.