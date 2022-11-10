# Serialization

Serialization is a process that happens before objects are returned in a network response.

This is an appropriate place to provide rules for transforming and sanitizing the data to be returned to the client.

For example, sensitive data like passwords should always be excluded from the response.


## Exclude properties

Let's assume that we want to automatically exclude a password property from a user entity.

```ts
// user.entity.ts
import { Exclude } from 'class-transformer';

export class UserEntity {
  id: number;
  firstName: string;
  lastName: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
```

```ts
// user.controller.ts
import { Controller, Get, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { User } from './user.entity';

@Controller('users')
export class UserController {

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findOne(): UserEntity {
    return new UserEntity({
      id: 1,
      firstName: 'Kamil',
      lastName: 'Mysliwiec',
      password: 'password',
    });
  }
}
```


## Expose properties

Provide alias names for properties:

```ts
// user.entity.ts
import { Expose } from 'class-transformer';

export class UserEntity {
  @Expose({ name: 'fullName' })
  displayName: string;
}
```

Execute a function to calculate a property value:

```ts
export class UserEntity {
  firstName: string;
  lastName: string;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
```


## Transform

Returns the name property of the `RoleEntity` instead of returning the whole object.

```ts
export class UserEntity {
  firstName: string;
  lastName: string;

  @Transform(role => role.name)
  role: RoleEntity;
}
```


## Pass options

Automatically excluding all properties that begin with the `_` prefix.

```ts
// user.controller.ts
@Controller('users')
export class UserController {
  @SerializeOptions({
    excludePrefixes: ['_'],
  })
  @Get()
  findOne(): UserEntity {
    return new UserEntity();
  }
}
```