# Lazy-loading modules

By default, modules are eagerly loaded, it may become a bottleneck for apps/workers running in the serverless environment, where the startup latency ("cold start") is crucial.

Lazy loading can help decrease bootstrap time by loading only modules required by the specific serverless function invocation.


## Loading modules

First, obtain a reference to the LazyModuleLoader provider:

```ts
// cats.service.ts
@Injectable()
export class CatsService {
  constructor(private lazyModuleLoader: LazyModuleLoader) {}
}
```

Then, layzy load the module and access its providers:

```ts
const { LazyModule } = await import('./lazy.module');
const moduleRef = await this.lazyModuleLoader.load(() => LazyModule);

const { LazyService } = await import('./lazy.service');
const lazyService = moduleRef.get(LazyService);
```

## Common use-cases

Most commonly, you will see lazy loaded modules in situations when your worker/cron job/lambda & serverless function/webhook must trigger different services (different logic) based on the input arguments (route path/date/query parameters, etc.). 

On the other hand, lazy-loading modules may not make too much sense for monolithic applications, where the startup time is rather irrelevant.