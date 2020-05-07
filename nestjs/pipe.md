# Pipes

A pipe is a class annotated with the `@Injectable()` decorator. Pipes should implement the `PipeTransform` interface.

Pipes have two typical use cases:

- **transformation**: transform input data to the desired output
- **validation**: evaluate input data and if valid, simply pass it through unchanged; otherwise, throw an exception when the data is incorrect

When an exception is thrown in a Pipe, no controller method is subsequently executed.


## Define a validation pipe

```shell
npm install --save @hapi/joi
npm install --save-dev @types/hapi__joi
```

**validation.pipe.ts**

```ts
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from '@hapi/joi';

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


## Using Pipe

Pipes, similar to exception filters, can be method-scoped, controller-scoped, or global-scoped.

```ts
import { UsePipes, Post } from '@nestjs/common';

@Post()
@UsePipes(new JoiValidationPipe(createCatSchema))
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```


## Class validator

Validate request data schemae based on class definition.

```shell
npm i --save class-validator class-transformer
```

**create-cat.dto.ts**:

```ts
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

**validation.pipe.ts**

```ts
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

A pipe can be param-scoped. In the example below, we'll directly tie the pipe instance to the route param @Body() decorator:

**cats.controller.ts**

```ts
@Post()
async create(
  @Body(new ValidationPipe()) createCatDto: CreateCatDto,
) {
  this.catsService.create(createCatDto);
}
```

Alternatively, pass the class (not an instance), thus leaving instantiation up to the framework, and enabling dependency injection.

**cats.controller.ts**

```ts
@Post()
@UsePipes(ValidationPipe)
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

This example below set it up as a global-scoped pipe, applied to every route handler across the entire application:

**main.ts**

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
```


## Transformation Pipes

### Parsing a string into an integer value

**parse-int.pipe.ts**:
```ts
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


### Select entity from the database by id

```ts
@Get(':id')
findOne(@Param('id', UserByIdPipe) userEntity: UserEntity) {
  return userEntity;
}
```