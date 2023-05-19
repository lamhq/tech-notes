# TypeDI (TypeScript)

## Installation

```shell
yarn add typedi reflect-metadata
```

**tsconfig.json**:
```json
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
```


## Basic usage

```ts
import "reflect-metadata";
import { Container, Inject, Service } from "typedi";

@Service()
class BeanFactory {
  create() {
  }
}

@Service()
class CoffeeMaker {
  // property injection
  // @Inject()
  // beanFactory: BeanFactory;

  // constructor injection
  constructor(private beanFactory: BeanFactory) {}

  make() {
    this.beanFactory.create();
  }
}

let coffeeMaker = Container.get(CoffeeMaker);
coffeeMaker.make();
```


## Named services

```ts
import { Container, Service, Inject } from "typedi";

interface Factory {
  create(): void;
}

@Service("bean.factory")
class BeanFactory implements Factory {
  create() {}
}

@Service("coffee.maker")
class CoffeeMaker {
  constructor(@Inject("bean.factory") beanFactory: BeanFactory) {}

  make() {
    this.beanFactory.create();
  }
}

let coffeeMaker = Container.get<CoffeeMaker>("coffee.maker");
coffeeMaker.make();
```


## Value injection

```ts
import { Container, Service, Inject } from "typedi";

// somewhere in your global app parameters
Container.set("authorization-token", "RVT9rVjSVN");

@Service()
class UserRepository {
  @Inject("authorization-token")
  authorizationToken: string;
}
```


## Interface based services (token)

```ts
import { Container, Service, Inject, Token } from "typedi";

export interface Factory {
  create(): void;
}

export const FactoryService = new Token<Factory>();

@Service(FactoryService)
export class BeanFactory implements Factory {
  create() {}
}

@Service()
export class CoffeeMaker {
  private factory: Factory;

  constructor(@Inject(type => FactoryService) factory: Factory) {
    this.factory = factory;
  }

  make() {
    this.factory.create();
  }
}

let coffeeMaker = Container.get(CoffeeMaker);
coffeeMaker.make();

let factory = Container.get(FactoryService); // factory is instance of Factory
factory.create();
```


## Using factory function to create service

This way, service instance will be created by calling your factory function instead of instantiating a class directly.

```ts
import { Container, Service } from "typedi";

function createCar() {
  return new Car("V8");
}

@Service({ factory: createCar })
class Car {
  constructor(public engineType: string) {}
}

// Getting service from the container.
// Service will be created by calling the specified factory function.
const car = Container.get(Car);

console.log(car.engineType); // > "V8"
```


## Using factory class to create service

This way, service instance will be created by calling given factory service's method factory instead of instantiating a class directly.

```ts
import { Container, Service } from "typedi";

@Service()
class CarFactory {

  constructor(public logger: LoggerService) {}

  create() {
    return new Car("BMW", this.logger);
  }

}

@Service({ factory: [CarFactory, "create"] })
class Car {
  constructor(public model: string, public logger: LoggerInterface) {}
}
```


## Circular references

```ts
// Car.ts
@Service()
export class Car {
  @Inject(type => Engine)
  engine: Engine;
}

// Engine.ts
@Service()
export class Engine {
  @Inject(type => Car)
  car: Car;
}
```


## Inherited injections

```ts
// Car.ts
@Service()
export abstract class Car {
  @Inject()
  engine: Engine;
}

// Engine.ts
@Service()
export class Bus extends Car {
  // you can call this.engine in this class
}
```


## Using multiple containers and scoped containers

If you want your services to behave and store data inside differently, based on some user context (http request for example) - you can use different containers for different contexts

```ts
// QuestionController.ts
@Service()
export class QuestionController {
  constructor(protected questionRepository: QuestionRepository) {}

  save() {
    this.questionRepository.save();
  }
}

// QuestionRepository.ts
@Service()
export class QuestionRepository {
  save() {}
}

// app.ts
const request1 = { param: "question1" };
const controller1 = Container.of(request1).get(QuestionController);
controller1.save("Timber");
Container.reset(request1);

const request2 = { param: "question2" };
const controller2 = Container.of(request2).get(QuestionController);
controller2.save("");
Container.reset(request2);
```

If you want your services to be completely global and not be container-specific, you can mark them as global:

```ts
@Service({ global: true })
export class QuestionUtils { }
```


## Dependency injection for function

```ts
export const PostRepository = Service(() => ({
  getName() {
    return "hello from post repository";
  }
}));

export const PostManager = Service(() => ({
  getId() {
    return "some post id";
  }
}));

export class PostQueryBuilder {
  build() {
    return "SUPER * QUERY";
  }
}

export const PostController = Service([
  PostManager,
  PostRepository,
  PostQueryBuilder
], (manager, repository, queryBuilder) => {
  return {
    id: manager.getId(),
    name: repository.getName(),
    query: queryBuilder.build()
  };
});

const postController = Container.get(PostController);
console.log(postController);
```


## Remove registered services or reset container state

```ts
Container.remove(...)
Container.reset()
```