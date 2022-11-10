# Choosing schema language

Both JSON Schema and JSON Type Definition are cross-platform specifications with implementations in multiple programming languages that define the shape of your JSON data.

## JSON Schema

### Pros

- Wide specification adoption.
- Used as part of OpenAPI specification.
- **Support of complex validation scenarios**:
  - untagged unions and boolean logic
  - conditional schemas and dependencies
  - restrictions on the number ranges and the size of strings, arrays and objects
  - semantic validation with formats, patterns and content keywords
  - distribute strict record definitions across multiple schemas (with unevaluatedProperties)
- Can be effectively used for validation of any JavaScript objects and configuration files.

### Cons

- Defines the collection of restrictions on the data, rather than the shape of the data.
- No standard support for tagged unions.
- Complex and error prone for the new users (Ajv has strict mode enabled by default to compensate for it, but it is not cross-platform).
- Some parts of specification are difficult to implement, creating the risk of implementations divergence:
  - reference resolution model
  - unevaluatedProperties/unevaluatedItems
  - dynamic recursive references
- Internet draft status (rather than RFC)


## JSON Type Definition

### Pros

- Aligned with type systems of many languages - can be used to generate type definitions and efficient parsers and serializers to/from these types.
- Very simple, enforcing the best practices for cross-platform JSON API modelling.
- Simple to implement, ensuring consistency across implementations.
- Defines the shape of JSON data via strictly defined schema forms (rather than the collection of restrictions).
- Effective support for tagged unions.
- Designed to protect against user mistakes.
- Supports compilation of schemas to efficient serializers and parsers (no need to validate as a separate step)
- Approved as RFC8927(opens new window)

### Cons

- Limited, compared with JSON Schema - no support for untagged unions*, conditionals, references between different schema files**, etc.
- No meta-schema in the specification*.
- Brand new - limited industry adoption (as of January 2021).
