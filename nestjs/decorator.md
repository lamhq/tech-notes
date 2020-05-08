# Decorator

## Define custom decorator

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


## Decorator composition

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