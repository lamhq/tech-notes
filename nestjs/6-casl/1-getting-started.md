# Getting Started

## What is CASL?

CASL (pronounced /ˈkæsəl/, like castle) is an isomorphic authorization JavaScript library which restricts what resources a given client is allowed to access. 

## Concepts

CASL operates on the abilities level, that is what a user can actually do in the application. An ability itself depends on the 4 parameters (last 3 are optional):

### User Action

Describes what user can actually do in the app. E.g., `create`, `update`, `read`, `delete`, ...


### Subject

The subject (or subject type) which you want to check user action on. Usually this is a business (or domain) entity. E.g., `Subscription`, `Article`, `User`, ...


### Fields

Restrict user action only to matched subject's fields. E.g., to allow moderator to update status field of an `Article` and disallow to update `description` or `title`


### Conditions

Criteria which restricts user action only to matched subjects. E.g., to allow user to manage own `Article`


## Defining an ability

```js
import { defineAbility } from '@casl/ability';

export default defineAbility((can, cannot) => {
  can('manage', 'all');
  cannot('delete', 'User');
});
```

`manage` and `all` are special keywords in CASL. `manage` represents any action and `all` represents any subject


## Checking permissions

```js
import ability from './defineAbility.js';

ability.can('read', 'Post') // true
ability.can('read', 'User') // true
ability.can('update', 'User') // true
ability.can('delete', 'User') // false
ability.cannot('delete', 'User') // true
```


## Conditions

Restrict action on own resources. Let's first consider requirements for permissions of a blog website. In such blog, user:

- can read any `Article`
- can update own `Article`'s
- can create a `Comment` for any `Article`
- can update own `Comment`

Let's translate this to CASL:

```ts
// defineAbility.ts
import { defineAbility } from '@casl/ability';

export default (user) => defineAbility((can) => {
  can('read', 'Article');

  if (user.isLoggedIn) {
    can('update', 'Article', { authorId: user.id });
    can('create', 'Comment');
    can('update', 'Comment', { authorId: user.id });
  }
});
```

Now let's check them!

```ts
import defineAbilityFor from './defineAbility';
import { Article } from './entities';

const user = { id: 1, isLoggedIn: true };
const ownArticle = new Article({ authorId: user.id });
const anotherArticle = new Article({ authorId: 2 });
const ability = defineAbilityFor(user);

ability.can('read', 'Article') // true
ability.can('read', anotherArticle) // true, user can read any article
ability.can('update', 'Article') // true
ability.can('update', ownArticle) // true
ability.can('update', anotherArticle) // false, we can't update articles which were not written by us
```

With `Article` is defined as:

```ts
// entities.ts
class Entity {
  constructor(attrs) {
    Object.assign(this, attrs);
  }
}

export class Article extends Entity {}
```

In our example, the condition object checks that `authorId` in `Article` instance equals to `id` of passed `user`. Conditions may have several fields, in that case all fields should match `AND` logic.

But conditions are not restricted to simple equality checks! Instances can match objects using [MongoDB query language](http://docs.mongodb.org/manual/reference/operator/query/).


## Fields

Sometimes you may need to restrict which fields a user can access. 

For example, let's allow only moderators to publish `Article`

```ts
import { defineAbility } from '@casl/ability';

export default (user) => defineAbility((can) => {
  can('read', 'Article');
  can('update', 'Article', ['title', 'description'], { authorId: user.id })

  if (user.isModerator) {
    can('update', 'Article', ['published'])
  }
});
```

Here we defined that any user can update `title` and `description` fields of their own `Articles` and only moderators can update `published` field. If fields are not specified, a user is allowed to access any field.

```ts
import defineAbilityFor from './defineAbility';
import { Article } from './entities';

const moderator = { id: 2, isModerator: true };
const ownArticle = new Article({ authorId: moderator.id });
const foreignArticle = new Article({ authorId: 10 });
const ability = defineAbilityFor(moderator);

ability.can('read', 'Article') // true
ability.can('update', 'Article', 'published') // true
ability.can('update', ownArticle, 'published') // true
ability.can('update', foreignArticle, 'title') // false
```


## Inverted rules

Let's give a user a permission to do anything but not delete:

```ts
import { defineAbility } from '@casl/ability';

const ability = defineAbility((can, cannot) => {
  can('manage', 'all');
  cannot('delete', 'all');
});

ability.can('read', 'Post'); // true
ability.can('delete', 'Post'); // false
```

`cannot` declarations should follow after `can`, otherwise they will be overridden by `can`:

```ts
const user = { id: 1 };
const ability = defineAbility((can, cannot) => {
  cannot('read', 'all', { private: true });
  can('read', 'all', { authorId: user.id });
});

ability.can('read', { private: true }); // false
ability.can('read', { authorId: user.id }); // true
ability.can('read', { authorId: user.id, private: true }); // true!
```

**Always remember to put inverted rules after the direct one!**


## Error message

Add explanation to inverted rules

```ts
import { defineAbility } from '@casl/ability';

export default defineAbility((can, cannot) => {
  can('read', 'all');
  cannot('read', 'all', { private: true })
    .because('You are not allowed to read private information');
});
```

```ts
import { ForbiddenError } from '@casl/ability';
import ability from './defineAbility';

try {
  ForbiddenError.from(ability).throwUnlessCan('read', { private: true })
} catch (error) {
  if (error instanceof ForbiddenError) {
    console.log(error.message); // You are not allowed to read private information
  }

  throw error
}
```


## Update rules

Sometimes, we need to update Ability instance's rules (e.g., on login or logout).

```ts
import ability from './defineAbility';

ability.update([]); // forbids everything
ability.update([ // switch to readonly mode
  { action: 'read', subject: 'all' }
]);
```

Also we can use `AbilityBuilder` to create rules:

```ts
import { Ability, AbilityBuilder } from '@casl/ability';

const ability = new Ability();

const { can, rules } = new AbilityBuilder();
can('read', 'all');

ability.update(rules);
```

To track when rules are updated, we can subscribe to `update` (before ability is updated) or `updated` (after ability is updated) events of `Ability` instance:

```ts
const unsubscribe = ability.on('update', ({ rules, target }) => {
  // `rules` is an array passed to `update` method
  // `target` is an Ability instance that triggered event
})

unsubscribe() // removes subscription
```