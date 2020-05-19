# Relation

## One to one

```ts
import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm";
import {Photo} from "./Photo";

@Entity()
export class PhotoMetadata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  height: number;

  @Column("int")
  width: number;

  @OneToOne(type => Photo)
  @JoinColumn()
  photo: Photo;
}
```

`type => Photo` is a function that returns the class of the entity with which we want to make our relationship. The `type` variable itself does not contain anything, we can omit it.

`@JoinColumn` decorator indicates that this side of the relationship will own the relationship. The owning side of a relationship contains a column with a foreign key in the database.

The relation between `PhotoMetadata` and `Photo` is uni-directional. The owner of the relation is `PhotoMetadata`, and `Photo` doesn't know anything about `PhotoMetadata`.


### Bi-directional relation

Relations can be uni-directional and bi-directional. **Uni-directional** are relations with a relation decorator only on one side. **Bi-directional** are relations with decorators on both sides of a relation.

```ts
import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm";
import {Photo} from "./Photo";

@Entity()
export class PhotoMetadata {

  /* ... other columns */

  @OneToOne(type => Photo, photo => photo.metadata)
  @JoinColumn()
  photo: Photo;
}
```

```ts
import {Entity, Column, PrimaryGeneratedColumn, OneToOne} from "typeorm";
import {PhotoMetadata} from "./PhotoMetadata";

@Entity()
export class Photo {

  /* ... other columns */

  @OneToOne(type => PhotoMetadata, photoMetadata => photoMetadata.photo)
  metadata: PhotoMetadata;
}
```

`photo => photo.metadata` is a function that returns the name of the inverse side of the relation. Here we show that the metadata property of the `Photo` class is where we store `PhotoMetadata` in the `Photo` class.


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

```ts
import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(type => Photo, photo => photo.albums)
  @JoinTable()
  photos: Photo[];
}
```

```ts
export class Photo {
  /// ... other columns

  @ManyToMany(type => Album, album => album.photos)
  albums: Album[];
}
```

```ts
let connection = await createConnection(options);

// create a few albums
let album1 = new Album();
album1.name = "Bears";
await connection.manager.save(album1);

let album2 = new Album();
album2.name = "Me";
await connection.manager.save(album2);

// create a few photos
let photo = new Photo();
photo.name = "Me and Bears";
photo.description = "I am near polar bears";
photo.filename = "photo-with-bears.jpg";
photo.albums = [album1, album2];
await connection.manager.save(photo);

// now our photo is saved and albums are attached to it
// now lets load them:
const loadedPhoto = await connection
  .getRepository(Photo)
  .findOne(1, { relations: ["albums"] });
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

## Saving relation

```ts
import {Photo} from "./entity/Photo";
import {PhotoMetadata} from "./entity/PhotoMetadata";

// create a photo
let photo = new Photo();
photo.name = "Me and Bears";
photo.description = "I am near polar bears";
photo.filename = "photo-with-bears.jpg";
photo.isPublished = true;

// create a photo metadata
let metadata = new PhotoMetadata();
metadata.height = 640;
metadata.width = 480;
metadata.compressed = true;
metadata.comment = "cybershoot";
metadata.orientation = "portait";
metadata.photo = photo; // this way we connect them

// get entity repositories
let photoRepository = connection.getRepository(Photo);
let metadataRepository = connection.getRepository(PhotoMetadata);

// first we should save a photo
await photoRepository.save(photo);

// photo is saved. Now we need to save a photo metadata
await metadataRepository.save(metadata);
```

Automatically save related objects:

```ts
export class Photo {
  /// ... other columns

  @OneToOne(
    type => PhotoMetadata,
    metadata => metadata.photo,
    { cascade: true },
  )
  metadata: PhotoMetadata;
}

// create photo object
let photo = new Photo();
photo.name = "Me and Bears";
photo.description = "I am near polar bears";
photo.filename = "photo-with-bears.jpg";
photo.isPublished = true;

// create photo metadata object
let metadata = new PhotoMetadata();
metadata.height = 640;
metadata.width = 480;
metadata.compressed = true;
metadata.comment = "cybershoot";
metadata.orientation = "portait";

photo.metadata = metadata; // this way we connect them

// get repository
let photoRepository = connection.getRepository(Photo);

// saving a photo also save the metadata
await photoRepository.save(photo);
```


## Relation options

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