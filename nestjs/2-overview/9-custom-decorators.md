# Decorator

## Param decorators

- `@Request()`, `@Req()`
- `@Response()`, `@Res()`
- `@Next()`
- `@Session()`
- `@Param(param?: string)`
- `@Body(param?: string)`
- `@Query(param?: string)`
- `@Headers(param?: string)`
- `@Ip()`
- `@HostParam()`


## Defining custom decorators

```ts
// user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user && user[data] : user;
  },
);
```

```ts
@Get()
async findOne(@User() user: UserEntity) {
  console.log(user);
}

@Get()
async findOne(@User('firstName') firstName: string) {
  console.log(`Hello ${firstName}`);
}
```


## Working with pipes

The same syntax with `@Body()`, `@Param()` and `@Query()`

```ts
@Get()
async findOne(
  @User(new ValidationPipe({ validateCustomDecorators: true }))
  user: UserEntity,
) {
  console.log(user);
}
```


## Decorator compositions

```ts
import { applyDecorators } from '@nestjs/common';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized"' }),
  );
}
```

```ts
@Get('users')
@Auth('admin')
findAllUsers() {}
```