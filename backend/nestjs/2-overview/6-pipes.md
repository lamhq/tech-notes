# Pipes

Pipes have two typical use cases:

- **transformation**: transform input data to the desired output
- **validation**: evaluate input data and if valid, simply pass it through unchanged; otherwise, throw an exception when the data is incorrect

A pipe is a class annotated with the `@Injectable()` decorator.

When an exception is thrown in a Pipe, no controller method is subsequently executed.

Nest interposes a pipe just before a controller's method is invoked, and the pipe receives the arguments destined for the method and operates on them.

![](https://docs.nestjs.com/assets/Pipe_1.png)

## Built-in pipes

- `ValidationPipe`
- `ParseIntPipe`
- `ParseFloatPipe`
- `ParseBoolPipe`
- `ParseArrayPipe`
- `ParseUUIDPipe`
- `ParseEnumPipe`
- `DefaultValuePipe`

### Using built-in pipes

```ts
@Get()
async findOne(@Query('id', ParseIntPipe) id: number) {
  return this.catsService.findOne(id);
}
```

## Custom pipes

```ts
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
```

### Object schema validation pipe

```bash
yarn add joi
```

```ts
// validation.pipe.ts
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
```


### Using Pipes

Pipes, similar to exception filters, can be method-scoped, controller-scoped, or global-scoped.

```ts
import { UsePipes, Post } from '@nestjs/common';

@Post()
@UsePipes(new JoiValidationPipe(createCatSchema))
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

Global scoped pipes:

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
```

## Class validator

Validate request data schemae based on class definition.

```bash
yarn add class-validator class-transformer
```

### Defining validation rules using decorators

```ts
// create-cat.dto.ts
import { IsString, IsInt } from 'class-validator';

export class CreateCatDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}
```

### Defining a validation pipe

```ts
// validation.pipe.ts
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
```

### Using validation pipes

A pipe can be param-scoped. Parameter-scoped pipes are useful when the validation logic concerns only one specified parameter.

In the example below, we'll directly tie the pipe instance to the route param `@Body()` decorator:

```ts
// app.module.ts
@Post()
async create(
  @Body(new ValidationPipe()) createCatDto: CreateCatDto,
) {
  this.catsService.create(createCatDto);
}
```

### The built-in ValidationPipe

you don't have to build a generic validation pipe on your own since the `ValidationPipe` is provided by Nest out-of-the-box.


## Transformation Pipes

### Parsing a string into an integer value

```ts
// parse-int.pipe.ts
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}
```

```ts
@Get(':id')
async findOne(@Param('id', new ParseIntPipe()) id) {
  return this.catsService.findOne(id);
}
```

### Validate if param is a UUID.

```ts
@Get(':id')
async findOne(@Param('id', new ParseUUIDPipe()) id) {
  return this.catsService.findOne(id);
}
```

### Select an existing user

Select an existing user entity from the database using an id supplied in the request:

```ts
@Get(':id')
findOne(@Param('id', UserByIdPipe) userEntity: UserEntity) {
  return userEntity;
}
```