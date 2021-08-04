# Mongo

## Installation

```sh
yarn add @nestjs/typeorm typeorm mongodb
```

## Defining entities

```ts
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ObjectIdColumn,
  Column,
} from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity({ name: 'administrators' })
export class Admin {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar?: string;

  @Column()
  displayName?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
```


## TypeORM integration

```ts
// admin.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { Admin } from './admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  providers: [AdminService],
})
export class AdminModule {}
```


## Accessing entity repository

```ts
// admin.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Admin } from './admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: MongoRepository<Admin>
  ) {}

  async findOneByEmail(email: string): Promise<Admin | undefined> {
    return this.adminRepository.findOne({ email });
  }
```
