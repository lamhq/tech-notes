# Migration

Typically it is unsafe to use `synchronize: true` for schema synchronization on production once you get data in your database


## Setup connection options

```json
{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "test",
  "password": "test",
  "database": "test",
  "entities": ["entity/*.js"],
  "migrationsTableName": "custom_migration_table",
  "migrations": ["migration/*.js"],
  "cli": {
      "migrationsDir": "migration"
  }
}
```


## Creating a new migration

```shell
npm install typeorm -g
typeorm migration:create -n PostRefactoring
```

Sample migration code:

```ts
import {MigrationInterface, QueryRunner} from "typeorm";

export class PostRefactoringTIMESTAMP implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" RENAME COLUMN "title" TO "name"`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" RENAME COLUMN "name" TO "title"`); // reverts things made in "up" method
  }
}
```

## Running and reverting migrations

```shell
# run a migration
typeorm migration:run

# revert the changes
typeorm migration:revert
```

`typeorm migration:create` and `typeorm migration:generate` will create .ts files.

The `migration:run` and `migration:revert` commands only work on `.js` files. Thus the typescript files need to be compiled before running the commands.


## Generating migrations

Automatically generate migration files with schema changes you made in the entity. You don't need to write the queries on your own.

Let's say you have a Post entity with a title column, and you have changed the name title to name. You can run following command:

```shell
typeorm migration:generate -n PostRefactoring
```


## Migration API

https://typeorm.io/#/migrations/using-migration-api-to-write-migrations