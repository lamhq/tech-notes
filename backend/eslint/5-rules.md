# Rules

## Configuring Rules

- `"off"` or `0` - turn the rule off
- `"warn"` or `1` - turn the rule on as a warning (doesn't affect exit code)
- `"error"` or `2` - turn the rule on as an error (exit code is 1 when triggered)


## Using configuration files

To configure a rule which is defined within a plugin you have to prefix the rule ID with the plugin name and a `/`. 

```json
{
  "plugins":["plugin1"],
  "rules":{
    "eqeqeq":"off",
    "curly":"error",
    "quotes":["error", "double"],
    "plugin1/rule1":"error"
  }
}
```

## Disable for files

To disable rules for a group of files, use the `overrides` key along with a `files` key

```json
{
  "rules": {...},
  "overrides": [
    {
      "files": ["*-test.js","*.spec.js"],
      "rules": {
        "no-unused-expressions": "off"
      }
    }
  ]
}
```
