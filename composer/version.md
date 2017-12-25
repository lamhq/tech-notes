### Version Range

Examples:

* `>=1.0`
* `>=1.0 <2.0`
* `>=1.0 <1.1 || >=1.2`

### Hyphenated Version Range ( - )

- `1.0 - 2.0` is equivalent to `>=1.0.0 <2.1` (the `2.0` becomes `2.0.*`).
- `1.0.0 - 2.1.0` is equivalent to `>=1.0.0 <=2.1.0`.

### Wildcard Version Range (.*)

- `1.0.*` is the equivalent of `>=1.0 <1.1`.

### Tilde Version Range (~)

- `~1.2` is equivalent to `>=1.2 <2.0.0`
- `~1.2.3` is equivalent to `>=1.2.3 <1.3.0`

### Caret Version Range (^)

- `^1.2.3` is equivalent to `>=1.2.3 <2.0.0`
- `^0.3.2` is equivalent to `>=0.3.2 <0.4.0`

### Testing Version Constraints
[https://semver.mwl.be/](https://semver.mwl.be/)