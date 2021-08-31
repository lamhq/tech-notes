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


## Register Entity Repository

```ts
// admin.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { Admin } from './admin.entity';

@Module({
  // allow injecting AdminRepository into the AdminService
  imports: [TypeOrmModule.forFeature([Admin])],
  providers: [AdminService],
})
export class AdminModule {}
```


## Using Entity Repository

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

  async addAdmin(dto: CreateAdminDto): Promise<Admin> {
    const saved = await this.adminRepository.save(adminDto);
    return saved;
  }    

  async findAll(query: AdminQuery): Promise<Admin[]> {
    const stages = [];
    stages.push({ $skip: query.offset });
    stages.push({ $limit: query.limit });    
    return this.adminRepository.aggregateEntity(stages).toArray();
  }    
```
