# Testing

## Installation

```shell
yarn add --dev @nestjs/testing
```


## Unit testing

The `Test` class has a `createTestingModule()` method that takes a module metadata object as its argument. This method returns a `TestingModule` instance.

### Override providers

Once a module is created using `Test.createTestingModule`, Nest provides methods to override guards, interceptors, filters and pipes with `theoverrideGuard()`, `overrideInterceptor()`, `overrideFilter()`, and `overridePipe()` methods respectively.

Each of the override methods returns an object with 3 different methods that mirror those described for custom providers:

- `useClass`
- `useValue`
- `useFactory`

Each of the override method types, in turn, returns the `TestingModule` instance, and can thus be chained with other methods in the [fluent style](https://en.wikipedia.org/wiki/Fluent_interface).


### Retrieve providers from test module

The `compile` method of that instance bootstraps a module with its dependencies, and returns a module that is ready for testing.

Once the module is compiled you can retrieve any **static** instance it declares (controllers and providers) using the `get()` method.

The `resolve()` method of compiled module can resolve scoped providers (transient or request-scoped).

The compiled module has several useful methods, as described in the following table:

- `createNestApplication()`
- `get()`
- `resolve()`
- `select()`: Navigates through the module's dependency graph; can be used to retrieve a specific instance from the selected module

```ts
// cats.controller.spec.ts
import { Test } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [CatsController],
        providers: [CatsService],
      }).compile();

    catsService = moduleRef.get<CatsService>(CatsService);
    catsController = moduleRef.get<CatsController>(CatsController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = ['test'];
      jest.spyOn(catsService, 'findAll').mockImplementation(() => result);

      expect(await catsController.findAll()).toBe(result);
    });
  });
});
```


## End-to-end testing

In addition to the `compile()` method we used earlier, we now use the `createNestApplication()` method to instantiate a full Nest runtime environment. We save a reference to the running app in our app variable so we can use it to simulate HTTP requests.


```ts
// cats.e2e-spec.ts
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { CatsModule } from '../../src/cats/cats.module';
import { CatsService } from '../../src/cats/cats.service';
import { INestApplication } from '@nestjs/common';

describe('Cats', () => {
  let app: INestApplication;
  let catsService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CatsModule],
    })
      .overrideProvider(CatsService)
      .useValue(catsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET cats`, () => {
    return request(app.getHttpServer())
      .get('/cats')
      .expect(200)
      .expect({
        data: catsService.findAll(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
```

In this example:

- we now use the `createNestApplication()` method to instantiate a full Nest runtime environment.
- we use `overrideProvider()` to provide an alternate implementation of the `CatsService` which simply returns a hard-coded value.
- we supply an instance that will override the object with `useValue`.
- we route HTTP requests to our running Nest app by wrapping HTTP Server in the `request()` function.


## Overriding globally registered enhancers

If you have a globally registered guard (or pipe, interceptor, or filter) as below:

```ts
providers: [
  {
    provide: APP_GUARD,
    useExisting: JwtAuthGuard,
  },
  JwtAuthGuard,
]
```

You need to take a few more steps to override that enhancer, first by changing the registration like this:

```ts
providers: [
  {
    provide: APP_GUARD,
    useExisting: JwtAuthGuard,
  },
  JwtAuthGuard,
],
```

Now the `JwtAuthGuard` is visible to Nest as a regular provider that can be overridden when creating the `TestingModule`:

```ts
const moduleRef = await Test.createTestingModule({
  imports: [AppModule],
})
  .overrideProvider(JwtAuthGuard)
  .useClass(MockAuthGuard)
  .compile();
```


## Testing request-scoped instances

Request-scoped providers are created uniquely for each incoming request.

To retrieve a dynamically instantiated class, we need to generate a context identifier beforehand and force Nest to use this particular ID to create a sub-tree for all incoming requests.

```ts
const contextId = ContextIdFactory.create();
jest
  .spyOn(ContextIdFactory, 'getByRequest')
  .mockImplementation(() => contextId);
```

```ts
catsService = await moduleRef.resolve(CatsService, contextId);
```