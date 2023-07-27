# Next.js Project Structure

## Top-level files

- `next.config.js`: Configuration file for Next.js
- `middleware.ts`: Next.js request middleware
- `instrumentation.ts`: OpenTelemetry and Instrumentation
- `.env`: Environment variables
- `.env.local`: Local environment variables
- `.env.production`: Production environment variables
- `.env.development`: Development environment variables
- `.next-env.d.ts`: TypeScript declaration file for Next.js


## Top-level folders

- `app`: App Router
- `pages`: Pages Router
- `public`: Static assets to be served
- `src`: Optional application source folder


## `app` Routing Conventions

### Routing Files

|                                                                                 |                     |                              |
| --------------------------------------------- | ------------------- | ---------------------------- |
| `layout`                     | `.js` `.jsx` `.tsx` | Layout                       |
| `page`                         | `.js` `.jsx` `.tsx` | Page                         |
| `loading`                   | `.js` `.jsx` `.tsx` | Loading UI                   |
| `not-found`               | `.js` `.jsx` `.tsx` | Not found UI                 |
| `error`                       | `.js` `.jsx` `.tsx` | Error UI                     |
| `global-error` | `.js` `.jsx` `.tsx` | Global error UI              |
| `route`                       | `.js` `.ts`         | API endpoint                 |
| `template`                 | `.js` `.jsx` `.tsx` | Re-rendered layout           |
| `default`                   | `.js` `.jsx` `.tsx` | Parallel route fallback page |


### Nested Routes

|                                                                              |                      |
| ------------------------------------------------ | -------------------- |
| `folder`       | Route segment        |
| `folder/folder` | Nested route segment |

See more [here](https://nextjs.org/docs/getting-started/project-structure#app-routing-conventions).