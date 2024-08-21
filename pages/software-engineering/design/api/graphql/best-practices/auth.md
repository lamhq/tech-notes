# Authorization

Authorization is a type of business logic that describes whether a given user/session/context has permission to perform an action or see a piece of data.

Enforcing this kind of behavior **should happen in the business logic layer**.

Here's an example:

```javascript
//Authorization logic lives inside postRepository
var postRepository = require('postRepository');

var postType = new GraphQLObjectType({
  name: ‘Post',
  fields: {
    body: {
      type: GraphQLString,
      resolve: (post, args, context, { rootValue }) => {
        return postRepository.getBody(context.user, post);
      }
    }
  }
});
```

In the example above, we see that the business logic layer requires the caller to provide a `user` object. If you are using GraphQL.js, the `User` object should be populated on the context argument or rootValue in the fourth argument of the resolver.

We recommend passing a fully-hydrated User object instead of an opaque token or API key to your business logic layer. This way, we can handle the distinct concerns of authentication and authorization in different stages of the request processing pipeline.