# Execution context

Nest provides several **utility classes** that help make it easy to write applications that function across multiple application contexts (e.g., Nest HTTP server-based, microservices and WebSockets application contexts). 

These utilities provide information about the **current execution context** which can be used to build generic guards, filters, and interceptors that can work across a broad set of controllers, methods, and execution contexts.


## `ArgumentsHost` class

The `ArgumentsHost` class provides methods for retrieving the arguments being passed to a handler. It allows choosing the appropriate context (e.g., HTTP, RPC (microservice), or WebSockets) to retrieve the arguments from.

For HTTP server applications, the `host` object encapsulates Express's [`request, response, next]` array, where `request` is the request object, `response` is the response object, and `next` is a function that controls the application's request-response cycle. 

On the other hand, for GraphQL applications, the host object contains the `[root, args, context, info]` array.


## Determining application context

```ts
if (host.getType() === 'http') {
  // do something that is only important in the context of regular HTTP requests (REST)
} else if (host.getType() === 'rpc') {
  // do something that is only important in the context of Microservice requests
} else if (host.getType<GqlContextType>() === 'graphql') {
  // do something that is only important in the context of GraphQL requests
}
```


## Host handler arguments

```ts
/**
 * Switch context to RPC.
 */
switchToRpc(): RpcArgumentsHost;
/**
 * Switch context to HTTP.
 */
switchToHttp(): HttpArgumentsHost;
/**
 * Switch context to WebSockets.
 */
switchToWs(): WsArgumentsHost;
```

```ts
const ctx = host.switchToHttp();
const request = ctx.getRequest<Request>();
const response = ctx.getResponse<Response>();
```

## `ExecutionContext` class

`ExecutionContext` extends `ArgumentsHost`, providing additional details about the current execution process.

Nest provides an instance of `ExecutionContext` in several places:  guards, interceptors. It provides the following methods:

```ts
export interface ExecutionContext extends ArgumentsHost {
  /**
   * Returns the type of the controller class which the current handler belongs to.
   */
  getClass<T>(): Type<T>;
  /**
   * Returns a reference to the handler (method) that will be invoked next in the
   * request pipeline.
   */
  getHandler(): Function;
}
```

```ts
const methodKey = ctx.getHandler().name; // "create"
const className = ctx.getClass().name; // "CatsController"
```


## Reflection and metadata

### Setting metadata

Nest provides the ability to attach custom metadata to route handlers through the `@SetMetadata()` decorator. We can then access this metadata from within our class to make certain decisions.

```ts
// roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
```

```ts
// cats.controller.ts
@Post()
@Roles('admin')
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

### Accessing metadata

```ts
// roles.guard.ts
@Injectable()
export class RolesGuard {
  constructor(private reflector: Reflector) {}
}

const roles = this.reflector.get<string[]>('roles', context.getHandler());
```

### Controller level

Alternatively, you can applying metadata at the controller level, and access it using `context.getClass()`:

```ts
@Roles('admin')
@Controller('cats')
export class CatsController {}
```

```ts
// roles.guard.ts
const roles = this.reflector.get<string[]>('roles', context.getClass());
```

### Multiple levels

Consider the following scenario, where you've supplied `'roles'` metadata at both levels.

```ts
// cats.controller.ts
@Roles('user')
@Controller('cats')
export class CatsController {
  @Post()
  @Roles('admin')
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }
}
```

If your intent is to specify `'user'` as the default role, and override it selectively for certain methods, you would probably use the `getAllAndOverride()` method.

```ts
const roles = this.reflector.getAllAndOverride<string[]>('roles', [
  context.getHandler(),
  context.getClass(),
]);
```

To get metadata for both and merge it (this method merges both arrays and objects), use the `getAllAndMerge()`:

```ts
const roles = this.reflector.getAllAndMerge<string[]>('roles', [
  context.getHandler(),
  context.getClass(),
]);
```