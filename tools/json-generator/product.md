# Product data set

## Product with comments

```json
[
  '{{repeat(5, 100)}}',
  {
    id: '{{index()+1}}',
    name: '{{lorem(1)}}',
    guid: '{{guid()}}',
    picture: 'http://placehold.it/32x32',
    tags: [
      '{{repeat(integer(0, 5))}}',
      '{{lorem(1, "word")}}'
    ],
    comments: [
      '{{repeat(integer(0, 5))}}',
      {
        id: '{{index()+1}}',
        user: '{{firstName()}} {{surname()}}',
        content: '{{lorem(1, "paragraphs")}}'
      }
    ]
  }
]
```