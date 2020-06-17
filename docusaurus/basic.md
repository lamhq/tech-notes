# Basic

## Installing Docusaurus

```sh
npx docusaurus-init
```

## Running the example website

```sh
cd website
yarn start
```


## Updating Your Docusaurus Version

```sh
cd website
yarn outdated docusaurus
yarn upgrade docusaurus --latest
```

## Create Your Basic Site

To create a fully functional site, you only need to do a few steps:

1. Add your documentation to the `/docs` directory as `.md` files, ensuring you have the proper header in each file. One example header would be the following, where `id` is the link name (e.g., `docs/intro.html`) and the `title` is the webpage's title.

```yaml
---
id: intro
title: Getting Started
---
My new content here..
```

2. Add zero or more docs to the `sidebars.json` file so that your documentation is rendered in a sidebar if you choose them to be.
3. Modify the `website/siteConfig.js` file to configure your site
1. Create any custom pages and/or customize the `website/core/Footer.js` file that provides the footer for your site.
1. Place assets, such as images, in the `website/static/` directory.

## Docs Landing Page

If you prefer to have your landing page be straight to your documentation, you can do this through a redirect.

1. Remove the `index.js` file from the `website/pages` directory, if it exists.
1. Add a custom static `index.html` page in the `website/static` directory with the following contents:

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8" />
    <meta
      http-equiv="refresh"
      content="0; url=docs/id-of-doc-to-land-on.html"
    />
    <script type="text/javascript">
      window.location.href = 'docs/id-of-doc-to-land-on.html';
    </script>
    <title>Your Site Title Here</title>
  </head>
  <body>
    If you are not redirected automatically, follow this
    <a href="docs/id-of-doc-to-land-on.html">link</a>.
  </body>
</html>
```

## Publishing your site

```sh
yarn run build
```

Hosting on a Service:
- ZEIT Now (recommended)
- GitHub Pages
- Netlify
- Render