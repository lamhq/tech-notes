# Validation

## Registering ValidationPipe

The `ValidationPipe` provides a convenient approach to enforce validation rules for all incoming client payloads, where the specific rules are declared with simple annotations in local class/DTO declarations in each module.

Options:

- `skipMissingProperties`: skip validation of properties that are missing in the validating object.
- `whitelist`: strip properties that do not use any validation decorators.
- `forbidNonWhitelisted`: throw an exception of any properties that do not use any validation decorators.

```ts
// main.ts
async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.useGlobalPipes(new ValidationPipe({
    skipMissingProperties: true,
    transform: true,
  }));
  await app.listen(3000);
}
bootstrap();
```


## Validating request body

```ts
// post.controller.ts
@Post()
create(@Body() createUserDto: CreateUserDto) {
  return 'This action adds a new user';
}
```

```ts
// create-user.dto.ts
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
```


## Validating request params

```ts
// user.controller.ts
@Get(':id')
findOne(@Param() params: FindOneParams) {
  return 'This action returns a user';
}
```

```ts
import { IsNumberString } from 'class-validator';

export class FindOneParams {
  @IsNumberString()
  id: number;
}
```

Validate array:

```ts
@Post()
createBulk(
  @Body(new ParseArrayPipe({ items: CreateUserDto }))
  createUserDtos: CreateUserDto[],
) {
  return 'This action adds new users';
}
```

```ts
// GET /?ids=1,2,3
@Get()
findByIds(
  @Query('id', new ParseArrayPipe({ items: Number, separator: ',' }))
  ids: number[],
) {
  return 'This action returns users by ids';
}
```

## Transform request params

- Set `transform` option to true (implicit)
- `ParseIntPipe`, `ParseBoolPipe` (explicit)

```ts
// user.controller.ts
@Get(':id')
findOne(
  @Param('id', ParseIntPipe) id: number,
  @Query('sort', ParseBoolPipe) sort: boolean,
) {
  console.log(typeof id === 'number'); // true
  console.log(typeof sort === 'boolean'); // true
  return 'This action returns a user';
}
```