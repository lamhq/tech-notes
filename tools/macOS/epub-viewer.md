# Calibre ebook viewer software

## Font for Calibre

- Open an ebook in E-book viewer, go to Settings (`Cmd + ,`)
- Choose `Fonts`
- Select `Baskerville`


## Styles for Calibre app

- Go to Settings
- Choose `Styles` item
- Paste the following css:

```css
body {
  font-size: 25px;
} 

h1, h2, h3, h4, h5, h6 {
  color: #2B5282;
}

[class*="block_"] {
  margin: 0.5em 0 !important;
}

p {
  text-align: justify !important;
}
```

## Translate highlight text

- Select text, choose `Lookup`
- In the Lookup panel, choose `Add sources`
- Click `Add`
- In the form, set **name** to `Google Translate`
- Set **url** to `https://translate.google.com/#view=home&op=translate&sl=en&tl=vi&text={word}`

Reference [here](https://www.reddit.com/r/languagelearning/comments/iz71f9/comment/g6h4o4m/?utm_source=share&utm_medium=web2x&context=3).