# Entity

## Basic

Define an entity:

```ts
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  isActive: boolean;
}
```

Register entities:

```ts
import {createConnection, Connection} from "typeorm";
import {User} from "./entity/User";

const connection: Connection = await createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "test",
  password: "test",
  database: "test",
  entities: [User, "entity/*.js"]
});
```


## Columns

### Primary columns

- `@PrimaryColumn()`
- `@PrimaryGeneratedColumn()`
- `@PrimaryGeneratedColumn("uuid")`

### Composite primary columns

```ts
import {Entity, PrimaryColumn} from "typeorm";

@Entity()
export class User {
  @PrimaryColumn()
  firstName: string;

  @PrimaryColumn()
  lastName: string;
}
```

### Special columns

- `@CreateDateColumn`
- `@UpdateDateColumn`
- `@VersionColumn`


### enum column type

```ts
export enum UserRole {
  ADMIN = "admin",
  EDITOR = "editor",
  GHOST = "ghost"
}

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.GHOST
  })
  role: UserRole
}
```


### set column type

```ts
export enum UserRole {
  ADMIN = "admin",
  EDITOR = "editor",
  GHOST = "ghost"
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "set",
    enum: UserRole,
    default: [UserRole.GHOST, UserRole.EDITOR]
  })
  roles: UserRole[]
}
```

### Column types

```ts
@Column("int")
@Column({ type: "int" })
@Column("varchar", {
  name: 'title',
  length: 200,
  nullable: false,
  default: '',
  unique: false,
})
title: string;
```

**Column types for mysql / mariadb:**

bit, int, integer, tinyint, smallint, mediumint, bigint, float, double, double precision, dec, decimal, numeric, fixed, bool, boolean, date, datetime, timestamp, time, year, char, nchar, national char, varchar, nvarchar, national varchar, text, tinytext, mediumtext, blob, longtext, tinyblob, mediumblob, longblob, enum, set, json, binary, varbinary, geometry, point, linestring, polygon, multipoint, multilinestring, multipolygon, geometrycollection

**Column types for sqlite / cordova / react-native / expo:**

int, int2, int8, integer, tinyint, smallint, mediumint, bigint, decimal, numeric, float, double, real, double precision, datetime, varying character, character, native character, varchar, nchar, nvarchar2, unsigned big int, boolean, blob, text, clob, date


### Column options

- `type`: Column type. One of the type listed above.
- `name`: Column name in the database table.
- `length`: Column type's length.
- `nullable`: Makes column `NULL` or `NOT NULL` in the database
- `default`: Adds database-level column's DEFAULT value
- `unique`: Marks column as unique column (creates unique constraint).
- `comment`: Database's column comment.
- `precision`: The precision for a decimal (exact numeric) column (applies only for decimal column)
- `scale`: The scale for a decimal (exact numeric) column (applies only for decimal column), which represents the number of digits to the right of the decimal point.
- `unsigned`: Puts `UNSIGNED` attribute on to a numeric column. Used only in MySQL.


## Entity inheritance

```ts
export abstract class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;
}

@Entity()
export class Photo extends Content {
  @Column()
  size: string;
}

@Entity()
export class Question extends Content {
  @Column()
  answersCount: number;
}

@Entity()
export class Post extends Content {
  @Column()
  viewCount: number;
}
```