### Putting user info on the context (authentication)

```javascript
const { ApolloServer } = require('apollo-server');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization || '';

    // try to retrieve a user with the token
    const user = getUser(token);

    // optionally block the user
    // we could also check user roles/permissions here
    if (!user) throw new AuthorizationError('you must be logged in');
    
    // add the user to the context
    return { user };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});
```


### Authorization in resolvers

```javascript
// below is a resolver function for field `users`
users: (root, args, context) => {
  if (!context.user || !context.user.roles.includes('admin')) return null;
  return context.models.User.getAll();
}
```


### Authorization in data models
```javascript
context: ({ req }) => {
  // get the user token from the headers
  const token = req.headers.authentication || '';

  // try to retrieve a user with the token
  const user = getUser(token);

  // optionally block the user
  // we could also check user roles/permissions here
  if (!user) throw new AuthorizationError('you must be logged in to query this schema');

  // add the user to the context
  return {
    user,
    models: {
      User: generateUserModel({ user }),
      ...
      }
  };
},

// Any model method in User has access to the same user information that resolvers already had, 
// allowing us to refactor the getAll function to do the permissions check directly 
// rather than having to put it in the resolver:
export const generateUserModel = ({ user }) => ({
  getAll: () => {
    if (!user || !user.roles.includes('admin') return null;
    return fetch('http://myurl.com/users');
  },
  getById: (id) => { /* fetching/transform logic for a single user */ },
  getByGroupId: (id) => { /* fetching/transform logic for a group of users */ },
});
```


### Authorization via Custom Directives

```javascript
const typeDefs = `
  directive @auth(requires: Role = ADMIN) on OBJECT | FIELD_DEFINITION

  enum Role {
    ADMIN
    REVIEWER
    USER
  }

  type User @auth(requires: USER) {
    name: String
    banned: Boolean @auth(requires: ADMIN)
    canPost: Boolean @auth(requires: REVIEWER)
  }
`
```
