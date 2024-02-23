# Commit convention

## Conventional Commits

The format of commit messages follows [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

A commit message consists of the following parts:

1. **Type**: Represents the nature of the changes. Common types include:
   - `feat`: Introduces a new feature.
   - `fix`: Patches a bug.
   - `docs`: Updates documentation.
   - `style`: Improves code style (e.g., formatting).
   - `refactor`: Refactors existing code.
   - `test`: Adds or modifies tests.
   - ...and more.

2. **Scope** (optional): Identifies the specific area or component of your project where the changes were made. It provides additional context.

3. **Description**: A concise and descriptive message summarizing the changes made.

Here are some examples of **Conventional Commit** messages:

- **Feature**:
  ```
  feat(api): Add user authentication
  ```

- **Bug Fix**:
  ```
  fix(ui): Fix alignment issue in login form
  ```

- **Documentation Update**:
  ```
  docs(readme): Update installation instructions
  ```

- **Breaking Change** (indicated by `BREAKING CHANGE` in the footer):
  ```
  feat(auth): Replace deprecated API endpoint
  BREAKING CHANGE: The old endpoint is no longer supported.
  ```


## Tools

[commitlint](https://github.com/conventional-changelog/commitlint) is a tool that checks if your commit messages meet the conventional commit format.
