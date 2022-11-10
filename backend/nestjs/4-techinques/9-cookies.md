# Cookies

Enable cookie parsing

## Installation

```sh
yarn add cookie-parser
yarn add -D @types/cookie-parser
```

## Enabling cookie parser

```ts
// main.ts
import * as cookieParser from 'cookie-parser';

// somewhere in your initialization file
app.use(cookieParser());
```

## Accessing cookie

```ts
@Get()
findAll(@Req() request: Request) {
  console.log(request.cookies); // or "request.cookies['cookieKey']"
  // or console.log(request.signedCookies);
}
```

## Accessing cookie with decorator

The `@Cookies()` decorator will extract all cookies, or a named cookie from the req.cookies object and populate the decorated parameter with that value.

```ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Cookies = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.cookies?.[data] : request.cookies;
  },
);
```

```ts
@Get()
findAll(@Cookies('name') name: string) {}
```


## Setting cookies

If you want to inject the response object to only set cookies/headers but still leave the rest to the framework, you must set the `passthrough` option to true in the `@Res({ passthrough: true })` decorator.

```ts
@Get()
findAll(@Res({ passthrough: true }) response: Response) {
  response.cookie('key', 'value')
}
```
