# Testing

## Installation

```shell
yarn add --dev @nestjs/testing
```


## Unit testing

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

As an application grows, it becomes hard to manually test the end-to-end behavior of each API endpoint. Automated end-to-end tests help us ensure that the overall behavior of the system is correct and meets project requirements.

*HINT: Keep your e2e test files inside the test directory. The testing files should have a `.e2e-spec` suffix.*

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


## Overriding providers

Nest provides methods to override guards, interceptors, filters and pipes with the `overrideGuard()`, `overrideInterceptor()`, `overrideFilter()`, and `overridePipe()` methods respectively.

Each of the override methods returns an object with 3 different methods:

- `useClass`
- `useValue`
- `useFactory`


## Overriding globally registered enhancers

```ts
providers: [
  {
    provide: APP_GUARD,
    useExisting: JwtAuthGuard,
  },
  JwtAuthGuard,
]
```

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