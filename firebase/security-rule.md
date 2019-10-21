```js
rules_version = '2';
service <<name>> {
  // Match the resource path.
  match <<path>> {
    // Allow the request if the following conditions are true.
    allow <<methods>> : if <<condition>>
  }
}
```

Rules are applied as `OR` statements, not `AND` statements. Consequently, if multiple rules match a path, and any of the matched conditions grants access, Rules grant access to the data at that path. 

The basic elements of a rule in Cloud Firestore and Cloud Storage are as follows:

- The `service` declaration: Declares the Firebase product the rules apply to. `cloud.firestore`, `firebase.storage`.
- The `match` block: Defines a path in the database or storage bucket the rules apply to.
- The `allow` statement: Provides conditions for granting access, differentiated by methods. The supported methods include: `get`, `list`, `create`, `update`, `delete`, and the convenience methods `read` and `write`.
- Optional function declarations: Provide the ability to combine and wrap conditions for use across multiple rules.

## Examples

As the example below shows, the path declarations supports the following variables:

- Single-segment wildcard: A wildcard variable is declared in a path by wrapping a variable in curly braces: `{variable}`. This variable is accessible within the `match` statement as a `string`.
- Recursive wildcard: The recursive, or multi-segment, wildcard matches multiple path segments at or below a path. This wildcard matches all paths below the location you set it to. You can declare it by adding the `=**` string at the end of your segment variable: `{variable=**}`. This variable is accessible within the match statement as a `path` object.

```js
// Given request.path == /example/hello/nested/path the following
// declarations indicate whether they are a partial or complete match and
// the value of any variables visible within the scope.
service firebase.storage {
  // Partial match.
  match /example/{singleSegment} {   // `singleSegment` == 'hello'
    allow write;                     // Write rule not evaluated.
    // Complete match.
    match /nested/path {             // `singleSegment` visible in scope.
      allow read;                    // Read rule is evaluated.
    }
  }
  // Complete match.
  match /example/{multiSegment=**} { // `multiSegment` == /hello/nested/path
    allow read;                      // Read rule is evaluated.
  }
}
```

Consider the following example, where any user can read or delete any of their own files. A more granular rule only allows writes if the user requesting the write owns the file and the file is a PNG. A user can delete any files at the subpath — even if they're not PNGs — because the earlier rule allows it.

```js
service firebase.storage {
  // Allow the requestor to read or delete any resource on a path under the
  // user directory.
  match /users/{userId}/{anyUserFile=**} {
    allow read, delete: if request.auth.uid == userId;
  }

  // Allow the requestor to create or update their own images.
  // When 'request.method' == 'delete' this rule and the one matching
  // any path under the user directory would both match and the `delete`
  // would be permitted.

  match /users/{userId}/images/{imageId} {
    // Whether to permit the request depends on the logical OR of all
    // matched rules. This means that even if this rule did not explicitly
    // allow the 'delete' the earlier rule would have.
    allow write: if request.auth.uid == userId && imageId.matches('*.png');
  }
}
```

### Matching subcollections

```js
service cloud.firestore {
  match /databases/{database}/documents {
    match /cities/{city} {
      allow read, write: if <condition>;

        // Explicitly define rules for the 'landmarks' subcollection
        match /landmarks/{landmark} {
          allow read, write: if <condition>;
        }
    }
  }
}
```

### Recursive wildcards

```js
service cloud.firestore {
  match /databases/{database}/documents {
    // Matches any document in the cities collection as well 
    // as any document in a subcollection.
    match /cities/{document=**} {
      allow read, write: if <condition>;
    }
  }
}
```

### Content-owner only access

```js
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow only authenticated content owners access
    match /some_collection/{document} {
      allow read, write: if request.auth.uid == request.resource.data.author_uid
    }
  }
}
```

### Role-based access

```js
service cloud.firestore {
  match /databases/{database}/documents {
    // Assign roles to all users and refine access based on user roles
    match /some_collection/{document} {
     allow read: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "Reader"
     allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "Writer"

     // Note: Checking for roles in your database using `get` (as in the code
     // above) or `exists` carry standard charges for read operations.
    }
  }
}
```

### Closed access

The Firebase Admin SDKs and Cloud Functions can still access your database. Use these rules when you intend to use Cloud Firestore or Realtime Database as a server-only backend in conjunction with the Firebase Admin SDK. While it is secure, you should test that your app's clients can properly retrieve data.

```js
// Deny read/write access to all users under any conditions
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## Request object reference

- [Firestore Rules Reference](https://firebase.google.com/docs/reference/rules/rules.firestore.Request)
- [Cloud Storage Rules Reference](https://firebase.google.com/docs/reference/security/storage)