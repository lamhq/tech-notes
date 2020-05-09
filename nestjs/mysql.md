# Database (MySQL)

## Installation

```shell
yarn add @nestjs/typeorm typeorm mysql
```


## Define entity

```ts
// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Photo } from '../photos/photo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(type => Photo, photo => photo.user)
  photos: Photo[];
}
```

## Integrate TypeORM

```json
// ormconfig.json
{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "root",
  "database": "test",
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": true
}
```

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
  ],
})
export class AppModule {}
```

After import `TypeOrmModule` into the root `AppModule`, the TypeORM `Connection` and `EntityManager` objects will be available to inject across the entire project.


## Register Entity Repository

```ts
// users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  // allow repository to be used outside of the module
  exports: [TypeOrmModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
```


## Using Entity Repository

```ts
// users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
```


## Transactions

```ts
// users.service.ts
@Injectable()
export class UsersService {
  constructor(private connection: Connection) {}

  async createMany(users: User[]) {
    await this.connection.transaction(async manager => {
      await manager.save(users[0]);
      await manager.save(users[1]);
    });
  }
}
```


## Migrations

Follow the guide in the [TypeORM documentation](https://typeorm.io/#/migrations/creating-a-new-migration)


## Testing

Mock repositories:

```ts
import { getRepositoryToken } from '@nestjs/typeorm';

@Module({
  providers: [
    UsersService,
    {
      provide: getRepositoryToken(User),
      useValue: mockRepository,
    },
  ],
})
export class UsersModule {}
```


## Custom repository

Define custom repository:

```ts
// author.repository.ts
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Author)
export class AuthorRepository extends Repository<Author> {}
```

Register repository:

```ts
@Module({
  imports: [TypeOrmModule.forFeature([AuthorRepository])],
  controller: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
```

Using repository:

```ts
// author.service.ts
@Injectable()
export class AuthorService {
  constructor(private authorRepository: AuthorRepository) {}
}
```


## Async TypeORM initialization

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('HOST'),
        port: configService.get<number>('PORT'),
        username: configService.get<string>('USERNAME'),
        password: configService.get<string>('PASSWORD'),
        database: configService.get<string>('DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    });
    UsersModule,
  ],
})
export class AppModule {}
```