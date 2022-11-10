# Basic

## Create entity class

```ts
import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column("text")
  description: string;

  @Column()
  filename: string;

  @Column("double")
  views: number;

  @Column()
  isPublished: boolean;
}
```


## Creating a connection

```ts
import {createConnection} from "typeorm";

const connection = await createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "admin",
  database: "test",
  entities: [
    __dirname + "/entity/*.js"
  ],
  synchronize: true,
}).then(connection => {
  // here you can start to work with your entities
}).catch(error => console.log(error));
```


## CRUD

```ts
import {createConnection} from "typeorm";
import {Photo} from "./entity/Photo";

createConnection(/*...*/).then(async connection => {
  let photoRepository = connection.getRepository(Photo);

  // add
  let photo = new Photo();
  photo.name = "Me and Bears";
  photo.description = "I am near polar bears";
  photo.filename = "photo-with-bears.jpg";
  photo.views = 1;
  photo.isPublished = true;
  await photoRepository.save(photo);
  console.log("Photo has been saved");

  // find
  let firstPhoto = await photoRepository.findOne(1);
  console.log("First photo from the db: ", firstPhoto);

  let allViewedPhotos = await photoRepository.find({ views: 1 });
  console.log("All viewed photos: ", allViewedPhotos);

  // update
  let photoToUpdate = await photoRepository.findOne(1);
  photoToUpdate.name = "Me, my friends and polar bears";
  await photoRepository.save(photoToUpdate);

  // delete
  let photoToRemove = await photoRepository.findOne(1);
  await photoRepository.remove(photoToRemove);
}).catch(error => console.log(error));
```
