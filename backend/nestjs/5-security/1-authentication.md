# Authentication

## Installation

```bash
yarn add @nestjs/passport passport passport-local
yarn add -D @types/passport-local
```

## Setup codebase

```bash
nest g module auth
nest g service auth
nest g module users
nest g service users
```

## User API

```ts
// users/users.service.ts
import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
```

```ts
// users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
```


## Authentication API

```ts
// auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async createAccessToken(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
```


## Authenticating users with username and password

Our Passport local strategy has a default name of `'local'`. This is used to disambiguate which strategy to invoke in case we have multiple Passport strategies in our app. We reference that name in the `@UseGuards()` decorator that will be defined later.

The passport local strategy by default expects properties called username and password in the request body.

We can pass an options object in the call to `super()` to customize the behavior of the passport strategy.

For each strategy, Passport will call the verify function using an appropriate strategy-specific set of parameters. For the local-strategy, Passport expects a `validate()` method with the following signature: 

```ts
validate(username: string, password:string): any.
```

If a user is found and the credentials are valid, the user is returned so Passport can complete its tasks (e.g., creating the `user` property on the `Request` object), and the request handling pipeline can continue. If it's not found, we throw an exception and let our exceptions layer handle it.

```ts
// local.strategy.ts
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
```

We need to configure our `AuthModule` to use the strategy we just defined:

```ts
// auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
```

Define a guard to invoke the Passport strategy and kick off credentials validation:

```ts
// auth/local-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
```

With `AuthGuard('local')`, we reference the local strategy defined before.

We attach this guard to a controller route to protect it.

```ts
// auth.controller.ts
import { Controller, Request, Post, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('tokens')
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@CurUser() user) {
    return this.authService.createAccessToken(user);
  }
}
```

After passing the guard that invoke the local strategy, passport automatically creates a user object (based on the value we return from the `validate()` method) and assigns it to the Request object as `req.user`. The `@CurUser()` decorator help us to extract that user object.

```ts
// cur-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const { user } = request;

  return data ? user && user[data] : user;
});
```

In order to test our route, we'll test them using the commonly available cURL library:

```bash
curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
```

## Issuing access tokens

The `AuthService` class has a method `createAccessToken`. It accept an `User` object and return a JWT for use in subsequent calls to protected API endpoints.

```ts
// auth.controller.ts
@Post('tokens')
async login(@CurUser() user) {
  return this.authService.createAccessToken(user);
}
```


## Authenticating users with JWT

```bash
yarn add @nestjs/jwt passport-jwt
yarn add -D @types/passport-jwt
```

We now need to update the `AuthModule` to import the new dependencies and configure the `JwtModule`:

```ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'YOUR SECRET',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```


## Validating access token

```ts
// jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req.cookies['access-token'],
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: 'YOUR_SECRET',
    });
  }

  async validate(payload: any) : Promise<User> {
    const userId = payload.sub;
    return this.userService.findById(userId);
  }
}
```

If `validate()` return `null`, an unauthorized error will be sent to client.

Add the new `JwtStrategy` as a provider in the `AuthModule`:

```ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```


## Protecte route with guard

```ts
// jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

```ts
// user.controller.ts
import { Controller, Get, Request, ClassSerializerInterceptor, UseInterceptors, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('me')
  getCurrent(@Request() req): User {
    return req.user;
  }
}
```


## Changing `user` property

Instead of using property `user` in request object, you can change to other properties, such as `account`

```ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getAuthenticateOptions() {
    return { property: 'account' };
  }
}
```