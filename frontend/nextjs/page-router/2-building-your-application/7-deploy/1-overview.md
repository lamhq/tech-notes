# Deploying

## Build output

`next build` generates an optimized version of your application for production. This standard output includes:

- HTML files for pages using `getStaticProps` or Automatic Static Optimization
- CSS files for global styles or for individually scoped styles
- JavaScript for pre-rendering dynamic content from the Next.js server
- JavaScript for interactivity on the client-side through React

`.next` folder structure:

- `.next/static/chunks/pages` – Each JavaScript file inside this folder relates to the route with the same name. For example, `.next/static/chunks/pages/about.js` would be the JavaScript file loaded when viewing the `/about` route in your application
- `.next/static/media` – Statically imported images from `next/image` are hashed and copied here
- `.next/static/css` – Global CSS files for all pages in your application
- `.next/server/pages` – The HTML and JavaScript entry points prerendered from the server.
- `.next/server/chunks` – Shared JavaScript chunks used in multiple places throughout your application
- `.next/cache` – Output for the build cache and cached images, responses, and pages from the Next.js server.


## Deploy to Vercel

Vercel is the fastest way to deploy your Next.js application with zero configuration.

When deploying to Vercel, the platform automatically detects Next.js, runs `next build`, and optimizes the build output for you.

In addition, Vercel provides features like:

- Automatic performance monitoring with [Next.js Speed Insights](https://vercel.com/analytics?utm_source=next-site&utm_medium=docs&utm_campaign=next-website)
- Automatic HTTPS and SSL certificates
- Automatic CI/CD (through GitHub, GitLab, Bitbucket, etc.)
- Support for Environment Variables
- Support for Custom Domains
- Support for Image Optimization with next/image
- Instant global deployments via git push


## Self-Hosting

You can self-host Next.js with support for all features using Node.js or Docker. You can also do a Static HTML Export.


### Node.js Server

Next.js can be deployed to any hosting provider that supports Node.js.

First, ensure your `package.json` has the `"build"` and `"start"` scripts:

```json filename="package.json"
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

Then, run `npm run build` to build your application. Finally, run `npm run start` to start the Node.js server.


### Docker Image

Next.js can be deployed to any hosting provider that supports Docker containers.

1. Clone the [with-docker](https://github.com/vercel/next.js/tree/canary/examples/with-docker) example
1. Build your container: `docker build -t nextjs-docker .`
1. Run your container: `docker run -p 3000:3000 nextjs-docker`

If you need to use different Environment Variables across multiple environments, check out our [with-docker-multi-env](https://github.com/vercel/next.js/tree/canary/examples/with-docker-multi-env) example.


### Static HTML Export

Follow the directions on our [Static HTML Export documentation](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports).



## Going to Production (checklist)

https://nextjs.org/docs/pages/building-your-application/deploying/production-checklist