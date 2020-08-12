# Controller

## Create a controller

```shell
nest g controller posts
```


## Routing

The route path for a handler is determined by concatenating the (optional) prefix declared for the controller, and any path specified in the request decorator.

```ts
import { Controller, Get, Query, Post, Body, Put, Param, Delete, Headers } from '@nestjs/common';

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

```json
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