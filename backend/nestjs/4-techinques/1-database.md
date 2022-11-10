# Database (MySQL)

## Installation

```shell
yarn add @nestjs/typeorm typeorm mysql2
```


## TypeORM Integration

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      // entities: [],
      // every entity registered through the `forFeature()` method will be automatically added to the `entities` array of the configuration object.
      autoLoadEntities: true,
      synchronize: true,      
    }),
    UsersModule,
  ],
})
export class AppModule {}
```

After import `TypeOrmModule` into the root `AppModule`, the TypeORM `Connection` and `EntityManager` objects will be available to inject across the entire project.


## Defining entities

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

## Register Entity Repository

```ts
// users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';

@Module({
  // allow injecting UsersRepository into the UsersService
  imports: [TypeOrmModule.forFeature([User])],
  // allow repositories to be used outside of this module
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

## Relations

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

Or use `QueryRunner` (recommended):

```ts
async createMany(users: User[]) {
  const queryRunner = this.connection.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    await queryRunner.manager.save(users[0]);
    await queryRunner.manager.save(users[1]);

    await queryRunner.commitTransaction();
  } catch (err) {
    // since we have errors lets rollback the changes we made
    await queryRunner.rollbackTransaction();
  } finally {
    // you need to release a queryRunner which was manually instantiated
    await queryRunner.release();
  }
}
```

## Subscribers

Listen to specific entity events:

```ts
// user.subscriber.ts
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { User } from './user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  beforeInsert(event: InsertEvent<User>) {
    console.log(`BEFORE USER INSERTED: `, event.entity);
  }
}
```

```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSubscriber } from './user.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UserSubscriber],
  controllers: [UsersController],
})
export class UsersModule {}
```


## Migrations

Follow the guide in the [TypeORM documentation](https://typeorm.io/#/migrations/creating-a-new-migration)


## Multiple databases

Check [here](https://docs.nestjs.com/techniques/database#multiple-databases)


## Testing

Mock entity repositories:

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


## Async configuration

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