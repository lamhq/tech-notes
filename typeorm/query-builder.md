# Query Builder

```ts
let photos = await connection
  .getRepository(Photo)
  .createQueryBuilder("photo") // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
  .innerJoinAndSelect("photo.metadata", "metadata")
  .leftJoinAndSelect("photo.albums", "album")
  .where("photo.isPublished = true")
  .andWhere("(photo.name = :photoName OR photo.name = :bearName)")
  .orderBy("photo.id", "DESC")
  .skip(5)
  .take(10)
  .setParameters({ photoName: "My", bearName: "Mishka" })
  .getMany();
```