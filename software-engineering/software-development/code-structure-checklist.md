- Validation/transformation of DTO must be performed in Pipe, not controller

## Code structure

- Source code must be organized in modules
- Each module should contain codes of a group of features
- A modules must contains entities of the same feature
- A services must contains codes that perform read/write operations on one entity
- To access data from different modules, a module must import services from them
- No circular dependency between modules
- API must have e2e test with response schema validation
- API app must have at least 2 instances running
- Use event-subscriber pattern to extend processing logic
- Use pull request template
- Use semantic versioning with alpha, beta release
- Use queue pattern for concurrent / expensive tasks