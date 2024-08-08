# Strive for Lose Coupling

Strive for loosely coupled designs between objects that interact.

## Tightly Coupled
We say a object is tightly coupled to another object when it is too dependent on that object.

Here's an example:
```ts
class UserRepository {
  save(user: User) {
    // Save user to the database
  }

  // other methods...
}

class UserService {
  private repository = new UserRepository(); // Tight coupling

  saveUser(user: User) {
    this.repository.save(user);
  }
}
```
`UserService` is tightly coupled to `UserRepository` because it directly instantiates `UserRepository`.

This makes it difficult to change the implementation of `UserRepository` without modifying `UserService`, for example:
- Modifying `UserRepository`'s constructor to accept some parameters
- Renaming `UserRepository` class
- Swapping `UserRepository` with a different class


## Loose Coupling

A loosely coupled object doesn't know or care too much about the details of another object.

By not knowing too much about other objects, we can create designs that can handle change better. 

When two objects are loosely coupled, they can interact, but they typically have very little knowledge of each other.

Loosely coupled designs allow us to build flexible OO systems that can handle change because they minimize the interdependency between objects.

For the above example, to achieve loose coupling, you can use dependency injection:

```typescript
interface IUserRepository {
  save(user: User): void;
}

class UserRepository implements IUserRepository {
  save(user: User) {
    // Save user to the database
  }

  // other methods...
}

class UserService {
  constructor(private repository: IUserRepository) {} // Loose coupling

  saveUser(user: User) {
    this.repository.save(user);
  }
}
```

Here, `UserService` depends on an abstraction (`IUserRepository`) rather than a concrete implementation:
- It easier to swap out `UserRepository` with a different implementation if needed.
- We can freely change `UserRepository` without affecting `UserService`, as long as it implements the `IUserRepository` interface