# Circular dependency

Circular dependencies can arise in Nest between modules and between providers. Circular dependencies should be avoided where possible.


## Forward reference

A forward reference allows Nest to reference classes which aren't yet defined using the `forwardRef()` utility function.

```ts
// cats.service.ts
@Injectable()
export class CatsService {
  constructor(
    @Inject(forwardRef(() => CommonService))
    private commonService: CommonService,
  ) {}
}
```

```ts
// common.service.ts
@Injectable()
export class CommonService {
  constructor(
    @Inject(forwardRef(() => CatsService))
    private catsService: CatsService,
  ) {}
}
```


## ModuleRef

Check [here](https://docs.nestjs.com/fundamentals/module-ref).


## Module forward reference

```ts
// common.module.ts
@Module({
  imports: [forwardRef(() => CatsModule)],
})
export class CommonModule {}
```