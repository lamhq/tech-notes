# Navigation

You can customize [nav](https://rspress.dev/api/config/config-theme#nav) and [sidebar](https://rspress.dev/api/config/config-theme#sidebar) through `themeConfig` property in the config file


## Navbar

To customize the Navbar, modify the `_meta.json` in the root directory (typically the `docs` directory)

```json filename="_meta.json"
[
  {
    "text": "Guide",
    "link": "/guides/introduction",
    "activeMatch": "^/guides/"
  }
]
```

## Sidebar

To customize the Sidebar (on the left side of the page), modify the `_meta.json` in the subdirectory of the document root directory

Basic items with label extracted from the h1 title in the document:
```json filename="_meta.json"
[
  "page1",
  "page2",
  "page3"
]
```

File navigation item:

```ts
{
  type: 'file';
  name: string; // file name
  label?: string;
  tag?: string;
  overviewHeaders?: number[];
  context?: string;
}
```

Directory navigation item:

```ts
{
  type: 'dir';
  name: string;
  label?: string;
  collapsible?: boolean;
  collapsed?: boolean;
  tag?: string;
  overviewHeaders?: number[];
  context?: string;
}
```

Divider:

```ts
{
  type: 'divider';
  dashed?: boolean;
}
```

Section header:

```ts
{
  type: 'section-header';
  label: string;
  tag?: string;
}
```

Custom link:

```ts
{
  type: 'custom-link';
  label: string;
  link: string;
  context?: string;
};
```


Add icon before title:
```json filename="_meta.json"
{
  "type": "file",
  "name": "introduction",
  "label": "Introduction",
  "tag": "<svg width=\"1em\" height=\"1em\" viewBox=\"0 0 32 32\"><path fill=\"currentColor\" d=\"M4 6h24v2H4zm0 18h24v2H4zm0-12h24v2H4zm0 6h24v2H4z\"/></svg>"
}
```
