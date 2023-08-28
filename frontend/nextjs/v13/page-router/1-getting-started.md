# Getting Started

## System Requirements

- [Node.js 16.14](https://nodejs.org/) or later.
- macOS, Windows (including WSL), and Linux are supported.


## Automatic Installation

```bash filename="Terminal"
npx create-next-app@latest
```

## Run the Development Server

1. Run `npm run dev` to start the development server.
2. Visit `http://localhost:3000` to view your application.
3. Edit `app/layout.tsx` (or `pages/index.tsx`) file and save it to see the updated result in your browser.


## Project Structure

|                                                                          |                                    |
| ------------------------- | ---------------------------------- |
| `app`                     | App Router                         |
| `pages`                 | Pages Router                       |
| `public` | Static assets to be served         |
| `src`   | Optional application source folder |

### `pages` Routing Conventions

#### Special Files

|                                                                                                             |                     |                   |
| --------------------------------------------- | ------------------- | ----------------- |
| _app                                          | `.js` `.jsx` `.tsx` | Custom App        |
| _document                                | `.js` `.jsx` `.tsx` | Custom Document   |
| _error | `.js` `.jsx` `.tsx` | Custom Error Page |
| 404                                | `.js` `.jsx` `.tsx` | 404 Error Page    |
| 500                                | `.js` `.jsx` `.tsx` | 500 Error Page    |

#### Routes

|                                                                                                |                     |             |
| ----------------------------------------- | ------------------- | ----------- |
| **Folder convention**             |                     |             |
| index        | `.js` `.jsx` `.tsx` | Home page   |
| folder/index | `.js` `.jsx` `.tsx` | Nested page |
| **File convention**     |                     |             |
| index        | `.js` `.jsx` `.tsx` | Home page   |
| file                      | `.js` `.jsx` `.tsx` | Nested page |
