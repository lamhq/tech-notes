# OAuth

## OAuth Workflow

The OAuth flow generally has 6 parts:

1. The application requests authorization to access service resources from the user
2. If the user authorized the request, the application receives an authorization grant
3. The application requests an access token from the authorization server (API) by presenting authentication of its own identity, and the authorization grant
4. If the application identity is authenticated and the authorization grant is valid, the authorization server (API) issues an access token to the application. Authorization is complete.
5. The application requests the resource from the resource server (API) and presents the access token for authentication
6. If the access token is valid, the resource server (API) serves the resource to the application


## How to setup OAuth with NextAuth

1. Create a `.env` file at the root of your project and add the client ID and client secret. For Twitter this would be:
    ```
    TWITTER_ID=YOUR_TWITTER_CLIENT_ID
    TWITTER_SECRET=YOUR_TWITTER_CLIENT_SECRET
    ```
1. Add the provider settings to the NextAuth.js options object.
    ```js title="pages/api/auth/[...nextauth].js"
    import TwitterProvider from "next-auth/providers/twitter"
    ...
    providers: [
      TwitterProvider({
        clientId: process.env.TWITTER_ID,
        clientSecret: process.env.TWITTER_SECRET
      })
    ],
    ...
    ```
1. Once a provider has been setup, you can sign in at the following URL: `[origin]/api/auth/signin`. This is an auto-generated page with all the configured providers.
![](https://next-auth.js.org/img/signin.png)
