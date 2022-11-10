# HTTP module

## Installation

```sh
yarn add @nestjs/axios
```

## Getting started

```ts
@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [CatsService],
})
export class CatsModule {}
```


```ts
@Injectable()
export class CatsService {
  constructor(private httpService: HttpService) {}

  findAll(): Observable<AxiosResponse<Cat[]>> {
    return this.httpService.get('http://localhost:3000/cats');
  }
}
```