# Repository & EntityManager

## EntityManager

Using `EntityManager` you can manage (insert, update, delete, load, etc.) any entity.

```ts
const entityManager: EntityManager = connection.manager;
const user = await entityManager.findOne(User, 1);
user.name = "Umed";
await entityManager.save(user);
```


## Repository

Repository is just like `EntityManager` but its operations are limited to a concrete entity.

```ts
import {User} from "./entity/User";

const userRepository = manager.getRepository(User);
const user = await userRepository.findOne(1);
user.name = "Umed";
await userRepository.save(user);
```


## Find Options

```ts
userRepository.find({
  select: ["firstName", "lastName"],
  relations: ["profile", "photos", "videos"],
  where: { firstName: "Timber", lastName: "Saw" },
  order: {
    name: "ASC",
    id: "DESC"
  },
  skip: 5,
  take: 10,
  cache: true,
});

userRepository.find({
  join: {
    alias: "user",
    leftJoinAndSelect: {
      profile: "user.profile",
      photo: "user.photos",
      video: "user.videos"
    }
  }
});

// Querying with OR operator
userRepository.find({
  where: [
    { firstName: "Timber", lastName: "Saw" },
    { firstName: "Stan", lastName: "Lee" }
  ]
});

// Enables locking mechanism for query. Can be used only in findOne method
userRepository.findOne(1, {
  lock: { mode: "optimistic", version: 1 }
})
```

Advanced options:

Not, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Equal, Like, Between, In, IsNull, Any, Raw

Beware with `Raw` operator. It executes pure SQL from supplied expression and should not contain a user input, otherwise it will lead to SQL-injection.

```ts
import {Not} from "typeorm";

const loadedPosts = await connection.getRepository(Post).find({
  title: Like("%out #%"),
  likes: LessThan(10),
  categoryId: IsNull(),
});
```

## Repository APIs

- hasId
- getId
- create: Creates a new instance of User.
- preload: Creates a new entity from plain javascript object. If the entity already exists in the database, then it loads it.
- save: Saves a given entity or array of entities. If the entity already exist in the database, it is updated. If the entity does not exist in the database, it is inserted.
- remove: Removes a given entity or array of entities
- insert: Inserts a new entity, or array of entities.
- update: Partially updates entity by a given update options or entity id.
- delete: Deletes entities by entity id, ids or given conditions:
- softDelete and restore
- count
- increment
- findAndCount: Finds entities that match given find options. Also counts all entities that match given conditions, but ignores pagination settings
- findByIds
- findOne
- findOneOrFail
- query
- clear: Clears all the data from the given table (truncates/drops it).


```ts
// same as const user = new User(); user.firstName = "Timber"; user.lastName = "Saw"
const user = repository.create({
  id: 1,
  firstName: "Timber",
  lastName: "Saw"
});

const user = new User();
repository.merge(user, { firstName: "Timber" }, { lastName: "Saw" });
// same as user.firstName = "Timber"; user.lastName = "Saw";

const partialUser = {
  id: 1,
  firstName: "Rizzrak",
  profile: {
    id: 1
  }
};
// user will contain all missing data
const user = await repository.preload(partialUser);

// save
await repository.save(user);
await repository.save([
  category1,
  category2,
  category3
]);

// remove
await repository.remove(user);

// insert
await manager.insert(User, [{
  firstName: "Foo",
  lastName: "Bar"
}, {
  firstName: "Rizz",
  lastName: "Rak"
}]);

// Delete a entity
await repository.softDelete(1);
// And You can restore it using restore;
await repository.restore(1);

// count
const count = await repository.count({ firstName: "Timber" });

// increment
await manager.increment(User, { firstName: "Timber" }, "age", 3);

// findAndCount
const [timbers, timbersCount] = await repository.findAndCount({ firstName: "Timber" });

// findOne
const user = await repository.findOne(1);
const timber = await repository.findOne({ firstName: "Timber" });
```