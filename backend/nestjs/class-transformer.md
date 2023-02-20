# class-transformer

## Installation

```sh
yarn add reflect-metadata class-transformer
```


## Plain to class

```ts
export class User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}
```

```ts
import { plainToClass } from "class-transformer";

// to convert user plain object a single user. also supports arrays
let users = plainToClass(User, userJson);
```

```ts
const defaultUser = new User();
defaultUser.role = 'user';

// mixed user should have the value role = user when no value is set otherwise.
let mixedUser = plainToClassFromExist(defaultUser, user);
```


### Exclude extra properties

Exclude extra properties which are not specified in the class

```ts
import { Expose, plainToClass } from "class-transformer";

class User {
  @Expose() id: number;
  @Expose() firstName: string;
  @Expose() lastName: string;
}

const fromPlainUser = {
  unkownProp: 'hello there',
  firstName: 'Umed',
  lastName: 'Khudoiberdiev',
}

console.log(plainToClass(User, fromPlainUser, { excludeExtraneousValues: true }))

// User {
//   id: undefined,
//   firstName: 'Umed',
//   lastName: 'Khudoiberdiev'
// }
```

### Сonverting date strings into Date objects

```ts
import { Type } from "class-transformer";

export class User {

  id: number;

  email: string;

  password: string;

  @Type(() => Date)
  registrationDate: Date;
}
```


### Working with Nested objects

```ts
import { Type, plainToClass } from "class-transformer";

export class Album {

  id: number;

  name: string;

  @Type(() => Photo)
  photos: Photo[];
}

export class Photo {
  id: number;
  filename: string;
}

let album = plainToClass(Album, albumJson);
// now album is Album object with Photo objects inside
```

Specifying type for nested object:

```json
{
  "id": 1,
  "name": "foo",
  "topPhoto": {
    "id": 9,
    "filename": "cool_wale.jpg",
    "depth": 1245,
    "__type": "underwater"
  }
}
```

```ts
import { Type, plainToClass } from "class-transformer";

export abstract class Photo {
  id: number;
  filename: string;
}

export class Landscape extends Photo {
  panorama: boolean;
}

export class Portrait extends Photo {
  person: Person;
}

export class UnderWater extends Photo {
  depth: number;
}

export class Album {
  id: number;
  name: string;

  @Type(() => Photo, {
    discriminator: {
      property: "__type",
      subTypes: [
        { value: Landscape, name: "landscape" },
        { value: Portrait, name: "portrait" },
        { value: UnderWater, name: "underwater" }
      ]
    }
  })
  topPhoto: Landscape | Portrait | UnderWater;
}

let album = plainToClass(Album, albumJson);
// now album is Album object with a UnderWater object without `__type` property.
```


## Class to plain

```ts
import { classToPlain } from "class-transformer";
let photo = classToPlain(photo);
```

### Skipping specific properties

```ts
import { Exclude } from "class-transformer";

export class User {

  id: number;

  email: string;

  @Exclude()
  password: string;
}
```

### Skipping depend of operation

```ts
import { Exclude } from "class-transformer";

export class User {

  id: number;

  email: string;

  @Exclude({ toPlainOnly: true })
  password: string;
}
```

### Skipping unexposed properties

```ts
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class User {

  @Expose()
  id: number;

  @Expose()
  email: string;

  password: string;
}

import {classToPlain} from "class-transformer";
let photo = classToPlain(photo, { strategy: "excludeAll" });
```

### Skipping prefixed properties

```ts
import {classToPlain} from "class-transformer";
let photo = classToPlain(photo, { excludePrefixes: ["_"] });
```


## Class to class

```ts
import { classToClass } from "class-transformer";
let photo = classToClass(photo);
```


## Class to json

```ts
// serialize
import {serialize} from "class-transformer";
let photo = serialize(photo);

// deserialize
import {deserialize} from "class-transformer";
let photo = deserialize(Photo, photo);

// deserializeArray
import {deserializeArray} from "class-transformer";
let photos = deserializeArray(Photo, photos);
```


## Working with arrays

```ts
import { Type } from "class-transformer";

export class Photo {

  id: number;

  name: string;

  @Type(() => Album)
  albums: Album[];
}
```


## Exposing getters and method return values

```ts
import { Expose } from "class-transformer";

export class User {

  id: number;
  firstName: string;
  lastName: string;
  password: string;

  @Expose()
  get name() {
    return this.firstName + " " + this.lastName;
  }

  @Expose()
  getFullName() {
    return this.firstName + " " + this.lastName;
  }
}
```


## Exposing properties with different names

```ts
import { Expose } from "class-transformer";

export class User {

  @Expose({ name: "uid" })
  id: number;

  firstName: string;

  lastName: string;

  @Expose({ name: "secretKey" })
  password: string;

  @Expose({ name: "fullName" })
  getFullName() {
    return this.firstName + " " + this.lastName;
  }
}
```


## Using groups to control excluded properties

```ts
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class User {

  id: number;

  name: string;

  @Expose({ groups: ["user", "admin"] }) // this means that this data will be exposed only to users and admins
  email: string;

  @Expose({ groups: ["user"] }) // this means that this data will be exposed only to users
  password: string;
}
```

```ts
import {classToPlain} from "class-transformer";
let user1 = classToPlain(user, { groups: ["user"] }); // will contain id, name, email and password
let user2 = classToPlain(user, { groups: ["admin"] }); // will contain id, name and email
```


## Using versioning to control exposed and excluded properties

```ts
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class User {

  id: number;

  name: string;

  @Expose({ since: 0.7, until: 1 }) // this means that this property will be exposed for version starting from 0.7 until 1
  email: string;

  @Expose({ since: 2.1 }) // this means that this property will be exposed for version starting from 2.1
  password: string;
}
```

```ts
import {classToPlain} from "class-transformer";
let user1 = classToPlain(user, { version: 0.5 }); // will contain id and name
let user2 = classToPlain(user, { version: 0.7 }); // will contain id, name and email
let user3 = classToPlain(user, { version: 1 }); // will contain id and name
let user4 = classToPlain(user, { version: 2 }); // will contain id and name
let user5 = classToPlain(user, { version: 2.1 }); // will contain id, name nad password
```


## Additional data transformation

```ts
import { Transform } from "class-transformer";
import * as moment from "moment";
import { Moment } from "moment";

export class Photo {

  id: number;

  @Type(() => Date)
  @Transform(value => moment(value), { toClassOnly: true })
  date: Moment;
}
```

## Transform method's return value

- `@TransformClassToPlain`: Transform the method return with `classToPlain` and expose the properties on the class.
- `@TransformClassToClass`: Transform the method return with `classToClass` and expose the properties on the class.
- `@TransformPlainToClass`: Transform the method return with `plainToClass` and expose the properties on the class.

```ts
class UserController {

  @TransformClassToPlain({ groups: ['user.email'] })
  getUser() {
    const user = new User();
    user.firstName = "Snir";
    user.lastName = "Segal";
    user.password = "imnosuperman";

    return user;
  }
}

const controller = new UserController();
const user = controller.getUser();
```