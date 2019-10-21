## Write and deploy the callable function

```js
// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
exports.addMessage = functions.https.onCall((data, context) => {
  // Message text passed from the client.
  const text = data.text;
  // Authentication / user information is automatically added to the request.
  const uid = context.auth.uid;
  const name = context.auth.token.name || null;
  const picture = context.auth.token.picture || null;
  const email = context.auth.token.email || null;
});
```


## Deploy functions
```bash
# Deploys all of the functions inside index.js
firebase deploy --only functions

# Deploy only the functions that you've edited
firebase deploy --only functions:addMessage,functions:makeUppercase

# Delete all functions that match the specified name in all regions.
firebase functions:delete myFunction

# Delete a specified function running in a specific region.
firebase functions:delete myFunction --region us-east-1

# Delete more than one function
firebase functions:delete myFunction myOtherFunction

# Delete a specified functions group.
firebase functions:delete groupA

# Bypass the confirmation prompt.
firebase functions:delete myFunction --force
```


## Rename a function

To rename a function, create a new renamed version of the function in `index.js` and then run two separate deployment commands. The first command deploys the newly named function, and the second command removes the previously deployed version


## Change a function's region or regions

If you are changing the specified regions for a function that's handling production traffic, you can prevent event loss by performing these steps in order:

- Rename the function, and change its region or regions as desired.
- Deploy the renamed function, which results in temporarily running the same code in both sets of regions.
- Delete the previous function.


## Change a function's trigger type

It is not possible to change a function's event type by just changing the source code and running `firebase deploy`. To avoid errors, change a function's trigger type by this procedure:

- Modify the source code to include a new function with the desired trigger type.
- Deploy the function, which results in temporarily running both the old and new functions.
- Explicitly delete the old function from production using the Firebase CLI.


## Set the Node.js version

Edit this line in `package.json`:

```json
engines": {"node": "10"}
```


## Set environment configuration for your project
```bash
# After running `functions:config:set`, you must redeploy functions to make the new configuration available.
firebase functions:config:set someservice.key="THE API KEY" someservice.id="THE CLIENT ID"

# Removes the specified keys from the config
firebase functions:config:unset key1 key2

# Clones another project's environment into the currently active project
firebase functions:config:clone --from <fromProject>
```

```js
// Access environment configuration in a function
const functions = require('firebase-functions');
const request = require('request-promise');

exports.userCreated = functions.database.ref('/users/{id}').onWrite(event => {
  let email = event.data.child('email').val();

  return request({
    url: 'https://someservice.com/api/some/call',
    headers: {
      'X-Client-ID': functions.config().someservice.id,
      'Authorization': `Bearer ${functions.config().someservice.key}`
    },
    body: {email: email}
  });
});
```


## Set timeout and memory allocation

You can set these values either in the Google Cloud Console or in the function source code.

```js
const runtimeOpts = {
  timeoutSeconds: 300,
  memory: '1GB'
}

exports.myStorageFunction = functions
  .runWith(runtimeOpts)
  .storage
  .object()
  .onFinalize((object) = > {
    // do some complicated things that take a lot of memory and time
  });
```

