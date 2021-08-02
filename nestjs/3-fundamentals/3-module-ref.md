# Module reference

Nest provides the `ModuleRef` class to obtain a reference to any provider using its injection token as a lookup key.

The `ModuleRef` class also provides a way to dynamically instantiate both static and scoped providers. 


## Retrieving instances

The `ModuleRef.get()` method retrieves a provider, controller, or injectable (e.g., guard, interceptor, etc.) that exists (has been instantiated) in the **current** module using its injection token/class name.

```ts
// cats.service.ts
@Injectable()
export class CatsService implements OnModuleInit {
  private service: Service;
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.service = this.moduleRef.get(Service);
  }
}
```

You can't retrieve scoped providers (transient or request-scoped) with the `get()` method.

To retrieve a provider from the global context (for example, if the provider has been injected in a different module), pass the `{ strict: false }` option.

```ts
this.moduleRef.get(Service, { strict: false });
```

## Resolving scoped providers

To dynamically resolve a scoped provider (transient or request-scoped), use the `resolve()` method, passing the provider's injection token as an argument.

```ts
// cats.service.ts
@Injectable()
export class CatsService implements OnModuleInit {
  private transientService: TransientService;
  constructor(private moduleRef: ModuleRef) {}

  async onModuleInit() {
    this.transientService = await this.moduleRef.resolve(TransientService);
  }
}
```

### Retrieve single instance across multiple `resolve`

The `resolve()` method returns a unique instance of the provider, from its own DI container sub-tree. Each sub-tree has a unique context identifier. Thus, if you call this method more than once and compare instance references, you will see that they are not equal.

To generate a single instance across multiple `resolve()` calls, and ensure they share the same generated DI container sub-tree, you can pass a context identifier to the `resolve()` method.

```ts
// cats.service.ts
@Injectable()
export class CatsService implements OnModuleInit {
  constructor(private moduleRef: ModuleRef) {}

  async onModuleInit() {
    const contextId = ContextIdFactory.create();
    const transientServices = await Promise.all([
      this.moduleRef.resolve(TransientService, contextId),
      this.moduleRef.resolve(TransientService, contextId),
    ]);
    console.log(transientServices[0] === transientServices[1]); // true
  }
}
```

## Registering REQUEST provider