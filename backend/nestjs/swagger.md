# Swagger

## Installation

```sh
yarn add @nestjs/swagger
```


## Bootstrap

```ts
// main.ts
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
```

```ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;

  @ApiPropertyOptional()
  breed: string;

  @ApiProperty({ type: [String] })
  names: string[];

  @ApiProperty({ type: () => Node })
  node: Node;
}
```

The `@ApiProperty()` decorator allows setting various [Schema Object](https://swagger.io/specification/#schemaObject) properties:

```ts
@ApiProperty({
  description: 'The age of a cat',
  example: '2',
  default: 1,
  nullable: false,
  readOnly: true,
  minimum: 1,
})
age: number;
```

```ts
@Controller('test')
export class AppController {
  @ApiBody({ type: [CreateUserDto] })
  @Post()
  createBulk(@Body() usersDto: CreateUserDto[]) {

  }
}
```


## Mapped types

Creating new types using utility functions:

- `PartialType`
- `PickType`
- `OmitType`
- `IntersectionType`


## Enums

With `isArray` set to `true`, the enum can be selected as a multi-select:

```ts
export enum UserRole {
  Admin = 'Admin',
  Moderator = 'Moderator',
  User = 'User',
}

@ApiQuery({ name: 'role', enum: UserRole, enumName: 'UserRole' })
async filterByRole(@Query('role') role: UserRole = UserRole.User) {}
```


## Raw definitions

```ts
@ApiProperty({
  type: 'array',
  items: {
    type: 'array',
    items: {
      type: 'number',
    },
  },
})
coords: number[][];
```

```ts
@ApiBody({
  schema: {
    type: 'array',
    items: {
      type: 'array',
      items: {
        type: 'number',
      },
    },
  },
})
async create(@Body() coords: number[][]) {}
```


## oneOf, anyOf, allOf

```ts
@ApiProperty({
  oneOf: [
    { $ref: getSchemaPath(Cat) },
    { $ref: getSchemaPath(Dog) },
  ],
})
pet: Cat | Dog;
```

Define a polymorphic array:

```ts
type Pet = Cat | Dog;

@ApiProperty({
  type: 'array',
  items: {
    oneOf: [
      { $ref: getSchemaPath(Cat) },
      { $ref: getSchemaPath(Dog) },
    ],
  },
})
pets: Pet[];
```


## Tags

```ts
@ApiTags('cats')
@Controller('cats')
export class CatsController {}
```


## Headers

```ts
@ApiHeader({
  name: 'X-MyHeader',
  description: 'Custom header',
})
@Controller('cats')
export class CatsController {}
```


## Responses

- `@ApiOkResponse()`
- `@ApiCreatedResponse()`
- `@ApiAcceptedResponse()`
- `@ApiNoContentResponse()`
- `@ApiMovedPermanentlyResponse()`
- `@ApiBadRequestResponse()`
- `@ApiUnauthorizedResponse()`
- `@ApiNotFoundResponse()`
- `@ApiForbiddenResponse()`
- `@ApiMethodNotAllowedResponse()`
- `@ApiNotAcceptableResponse()`
- `@ApiRequestTimeoutResponse()`
- `@ApiConflictResponse()`
- `@ApiTooManyRequestsResponse()`
- `@ApiGoneResponse()`
- `@ApiPayloadTooLargeResponse()`
- `@ApiUnsupportedMediaTypeResponse()`
- `@ApiUnprocessableEntityResponse()`
- `@ApiInternalServerErrorResponse()`
- `@ApiNotImplementedResponse()`
- `@ApiBadGatewayResponse()`
- `@ApiServiceUnavailableResponse()`
- `@ApiGatewayTimeoutResponse()`
- `@ApiDefaultResponse()`

```ts
@Post()
@ApiCreatedResponse({
  description: 'The record has been successfully created.',
  type: Cat,
})
@ApiForbiddenResponse({ description: 'Forbidden.'})
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}

@Get()
@ApiQuery({ name: 'limit', type: 'number', example: 10 })
@ApiQuery({ name: 'offset', type: 'number', example: '0' })
@ApiOkResponse({
  description: 'User list.',
  type: [User],
  headers: {
    'x-total-count': {
      description: 'Total records',
      example: '30',
    },
  },
})
@ApiForbiddenResponse({
  description: 'Unauthorized',
})
async findAll(
  @Query('limit', new ParseIntPipe()) limit = 10,
  @Query('offset', new ParseIntPipe()) offset = 0,
  @Request() req: ExpressRequest,
): Promise<User[]> {
  const [items, total] = await this.userService.findAll(limit, offset);
  if (req.res) {
    req.res.set('x-total-count', `${total}`);
  }
  return items;
}
```


## Basic authentication

```ts
const options = new DocumentBuilder().addBasicAuth();
```

```ts
@ApiBasicAuth()
@Controller('cats')
export class CatsController {}
```


## Bearer authentication

```ts
const options = new DocumentBuilder().addBearerAuth();
```

```ts
@ApiBearerAuth()
@Controller('cats')
export class CatsController {}
```


## File upload

```ts
@UseInterceptors(FileInterceptor('file'))
@ApiConsumes('multipart/form-data')
@ApiBody({
  description: 'List of cats',
  type: FileUploadDto,
})
uploadFile(@UploadedFile() file) {}
```

```ts
class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
```

## Decorators

| Decorator                | Level               |
| ------------------------ | ------------------- |
| `@ApiOperation()`        | Method              |
| `@ApiResponse()`         | Method / Controller |
| `@ApiProduces()`         | Method / Controller |
| `@ApiConsumes()`         | Method / Controller |
| `@ApiBearerAuth()`       | Method / Controller |
| `@ApiOAuth2()`           | Method / Controller |
| `@ApiBasicAuth()`        | Method / Controller |
| `@ApiSecurity()`         | Method / Controller |
| `@ApiExtraModels()`      | Method / Controller |
| `@ApiBody()`             | Method              |
| `@ApiParam()`            | Method              |
| `@ApiQuery()`            | Method              |
| `@ApiHeader()`           | Method / Controller |
| `@ApiExcludeEndpoint()`  | Method              |
| `@ApiTags()`             | Method / Controller |
| `@ApiProperty()`         | Model               |
| `@ApiPropertyOptional()` | Model               |
| `@ApiHideProperty()`     | Model               |
| `@ApiExtension()`        | Method              |
