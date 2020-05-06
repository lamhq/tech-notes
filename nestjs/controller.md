# Controller

## Create a controller

```shell
nest g controller post
```


## Routing

The route path for a handler is determined by concatenating the (optional) prefix declared for the controller, and any path specified in the request decorator.

```ts
import { Controller, Get, Query, Post, Body, Put, Param, Delete, Headers } from '@nestjs/common';

@Controller('test')
export class AppController {
  @Post()
  create(@Body() data: any) {
    return data;
  }

  @Get()
  findAll(@Query() query: any, @Headers('authorization') auth: string) : string {
    console.log(auth);
    return query;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return id;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    console.log(id);
    return data;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return id;
  }
}
```
