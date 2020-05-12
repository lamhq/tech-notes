# TypeORM

## Installation

```shell
yarn add typeorm reflect-metadata @types/node mysql
```


## TypeScript configuration

```json
// tsconfig.json
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
```


## Generate a starter project

```shell
npm install typeorm -g
typeorm init --name MyProject --database mysql
```


## TypeORM config file

```json
// ormconfig.json
{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "test",
  "password": "test",
  "database": "test",
  "synchronize": true,
  "logging": false,
  "entities": [
    "src/entity/**/*.ts"
  ],
  "migrations": [
    "src/migration/**/*.ts"
  ],
  "subscribers": [
    "src/subscriber/**/*.ts"
  ]
}
```


