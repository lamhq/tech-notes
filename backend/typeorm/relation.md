# Relation

## One to one

Let's take for example `User` and `Profile` entities. User can have only a single profile, and a single profile is owned by only a single user.

```ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gender: string;

  @Column()
  photo: string;
}
```

```ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Profile } from "./Profile";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(type => Profile)
  @JoinColumn()
  profile: Profile;
}
```

`type => Profile` is a function that returns the class of the entity with which we want to make our relationship. The `type` variable itself does not contain anything, we can omit it.

`@JoinColumn` is required and must be set only on one side of the relation. The side you set `@JoinColumn` on, that side's table will contain a "relation id" and foreign keys to target entity table.

The relation between `Profile` and `User` is uni-directional. The owner of the relation is `User`, and `Profile` doesn't know anything about `User`.


### Saving one-to-one relation

```ts
const profile = new Profile();
profile.gender = "male";
profile.photo = "me.jpg";
await connection.manager.save(profile);

const user = new User();
user.name = 'Joe Smith';
user.profile = profile;
await connection.manager.save(user);
```


### Loading one-to-one relations

```ts
const userRepository = connection.getRepository(User);
const users = await userRepository.find({ relations: ["profile"] });
```

Or using `QueryBuilder` you can join them:

```ts
const users = await connection
  .getRepository(User)
  .createQueryBuilder("user")
  .leftJoinAndSelect("user.profile", "profile")
  .getMany();
```


### Bi-directional relation

Relations can be uni-directional and bi-directional. Uni-directional are relations with a relation decorator only on one side. Bi-directional are relations with decorators on both sides of a relation.

```ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gender: string;

  @Column()
  photo: string;

  @OneToOne(type => User, user => user.profile) // specify inverse side as a second parameter
  user: User;
}
```

```ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Profile } from "./Profile";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(type => Profile, profile => profile.user) // specify inverse side as a second parameter
  @JoinColumn()
  profile: Profile;
}
```

Bi-directional relations allow you to join relations from both sides using `QueryBuilder`:

```ts
const profiles = await connection
  .getRepository(Profile)
  .createQueryBuilder("profile")
  .leftJoinAndSelect("profile.user", "user")
  .getMany();
```


## Many-to-one / one-to-many

```ts
import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from "typeorm";
import {Photo} from "./Photo";

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => Photo, photo => photo.author) // note: we will create author property in the Photo class below
  photos: Photo[];
}
```

```ts
import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import {PhotoMetadata} from "./PhotoMetadata";
import {Author} from "./Author";

@Entity()
export class Photo {
  /* ... other columns */

  @ManyToOne(type => Author, author => author.photos)
  author: Author;
}
```

The class that uses `@ManyToOne` will store the id of the related object.


## Many-to-many

Let's take for example `Question` and `Category` entities. Question can have multiple categories, and each category can have multiple questions.

```ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
```

```ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToMany(type => Category)
  @JoinTable()
  categories: Category[];
}
```

### Saving many-to-many relations

```ts
const category1 = new Category();
category1.name = "animals";
await connection.manager.save(category1);

const category2 = new Category();
category2.name = "zoo";
await connection.manager.save(category2);

const question = new Question();
question.title = "dogs";
question.text = "who let the dogs out?";
question.categories = [category1, category2];
await connection.manager.save(question);
```


### Deleting many-to-many relations

With `cascades` enabled you can delete this relation with only one save call.

```ts
const question = getRepository(Question);
question.categories = question.categories.filter(category => {
  category.id !== categoryToRemove.id
})
await connection.manager.save(question)
```


### Soft Deleting a relationship with cascade

```ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Question {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(type => Category, category => category.questions, {
    cascade: true
  })
  @JoinTable()
  categories: Category[];

}
```

```ts
const category1 = new Category();
category1.name = "animals";

const category2 = new Category();
category2.name = "zoo";

const question = new Question();
question.categories = [category1, category2];
const newQuestion =  await connection.manager.save(question);

await connection.manager.softRemove(newQuestion);
```


### Loading many-to-many relations

```ts
const questionRepository = connection.getRepository(Question);
const questions = await questionRepository.find({ relations: ["categories"] });
```

Or using `QueryBuilder` you can join them:

```ts
const questions = await connection
  .getRepository(Question)
  .createQueryBuilder("question")
  .leftJoinAndSelect("question.categories", "category")
  .getMany();
```


## Loading objects with their relations

```ts
let photoRepository = connection.getRepository(Photo);
let photos = await photoRepository.find({ relations: ["metadata"] });
```

```ts
let photos = await connection
  .getRepository(Photo)
  .createQueryBuilder("photo")
  .innerJoinAndSelect("photo.metadata", "metadata")
  .getMany();
```

```ts
const users = await connection
  .getRepository(User)
  .createQueryBuilder("user")
  .leftJoinAndSelect("user.photos", "photo")
  .getMany();
```

## Relation options

```ts
export class Photo {
  /// ... other columns

  @OneToOne(
    type => PhotoMetadata,
    metadata => metadata.photo, {
      cascade: true,
      // other options ...
    },
  )
  metadata: PhotoMetadata;
}
```

- `eager`: relation will always be loaded with the main entity when using `find*` methods or `QueryBuilder` on this entity
- `onDelete: "RESTRICT"|"CASCADE"|"SET NULL"`: specifies how foreign key should behave when referenced object is deleted
- `nullable`: Indicates whether this relation's column is nullable or not.
- `primary`: Indicates whether this relation's column will be a primary column or not.
- `cascade: boolean | ("insert" | "update")[]` - related object will be inserted and updated in the database when saving the main object.


## @JoinColumn options

- `name`: name of the column will be used as foreign key
- `referencedColumnName`: primary column of the related entity

```ts
@JoinColumn({
  name: "cat_id",
  referencedColumnName: 'uuid',
});
category: Category;

// join multiple columns
@ManyToOne(type => Category)
@JoinColumn([
  { name: "category_id", referencedColumnName: "id" },
  { name: "locale_id", referencedColumnName: "locale_id" }
])
category: Category;
```


## @JoinTable options

```ts
@ManyToMany(type => Category)
@JoinTable({
  name: "question_categories", // table name for the junction table of this relation
  joinColumn: {
    name: "question",
    referencedColumnName: "id"
  },
  inverseJoinColumn: {
    name: "category",
    referencedColumnName: "id"
  }
})
categories: Category[];
```