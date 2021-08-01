# Controller

## Creating a controller

```shell
nest g controller posts
```


## Registering controllers with module

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';

@Module({
  controllers: [CatsController],
})
export class AppModule {}
```


## Routing

The route path for a handler is determined by concatenating the (optional) prefix declared for the controller, and any path specified in the request decorator.

```ts
import { Controller, Get, Query, Post, Body, Put, Param, Delete, Headers, Req, 
  HttpCode, Header } from '@nestjs/common';
import { Request } from 'express';

export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}

@Controller('cats')
export class AppController {
  @Post()
  create(@Body() data: CreateCatDto) {
    return data;
  }

  @Get()
  findAll(@Query() query: any, @Headers('authorization') auth: string) : string {
    return query;
  }

  @Get()
  @Header('Cache-Control', 'none')
  findAllCats(@Req() request: Request): string {
    return 'This action returns all cats';
  }

  @Get('ab*cd')
  @HttpCode(204)
  findAll() {
    return 'This route uses a wildcard';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return id;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: CreateCatDto) {
    console.log(id);
    return data;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return id;
  }
}
```


## Redirection

You may want to determine the HTTP status code or the redirect URL dynamically. Do this by returning an object from the route handler method with the shape:

```ts
{
  "url": string,
  "statusCode": number
}
```

```ts
@Get('docs')
@Redirect('https://docs.nestjs.com', 302)
getDocs(@Query('version') version) {
  if (version && version === '5') {
    return { url: 'https://docs.nestjs.com/v5/' };
  }
}
```


## Asynchronicity

```ts
@Get()
async findAll(): Promise<any[]> {
  return [];
}
```
