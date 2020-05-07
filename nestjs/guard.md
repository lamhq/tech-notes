# Guards

A guard is a class annotated with the `@Injectable()` decorator. Guards should implement the `CanActivate` interface.

Guards have a single responsibility. They determine whether a given request will be handled by the route handler or not, depending on certain conditions (like permissions, roles, ACLs, etc.) present at run-time.


## Define guard

**roles.guard.ts**:
```ts
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


## Using guard

Like pipes and exception filters, guards can be controller-scoped, method-scoped, or global-scoped.

```ts
@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {}
```

Set up a global guard directly from any module:

```ts
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


## Set permissions for handler

**roles.decorator.ts**:
```ts
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
```

**cats.controller.ts**:
```ts
@Post()
@Roles('admin')
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```