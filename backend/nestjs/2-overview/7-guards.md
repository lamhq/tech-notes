# Guards

A guard is a class annotated with the `@Injectable()` decorator. Guards should implement the `CanActivate` interface.

Guards determine whether a given request will be handled by the route handler or not, depending on certain conditions (like permissions, roles, ACLs, etc.) present at run-time.

![](https://docs.nestjs.com/assets/Guards_1.png)

## Authorization guard

```ts
// auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
```

## Role-based authentication

```ts
// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!matchRoles(roles, user.roles)) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
```


## Using guards

Like pipes and exception filters, guards can be controller-scoped, method-scoped, or global-scoped.

```ts
// cats.controller.ts
@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {}
```

Set up a global guard:

```ts
const app = await NestFactory.create(AppModule);
app.useGlobalGuards(new RolesGuard());
```

Set up a global guard directly from any module (for enabling dependency injection):

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
```


## Set roles per handler

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


## Response

When a user with insufficient privileges requests an endpoint, Nest automatically returns the following response:

```json
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```

If you want to return a different error response, you should throw your own specific exception. For example:

```ts
throw new UnauthorizedException();
```

Any exception thrown by a guard will be handled by the exceptions layer.