# Conventional Commits

Convention for commit messages. The commit message should be structured as follows:

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```


## Type

- `fix`: a commit of the type `fix` patches a bug in your codebase
- `feat`: a commit of the type `feat` introduces a new feature to the codebase
- `improvement`: improve a current implementation without adding a new feature or fixing a bug.
- `refactor`: a code change that neither fixes a bug nor adds a feature
- `ci`: changes to our CI configuration files and scripts
- `docs`: documentation only changes
- `perf`: a code change that improves performance
- `test`: adding missing tests or correcting existing tests


## Scope

A scope may be provided after a type. A scope must consist of a noun describing a section of the codebase surrounded by parenthesis, e.g., `fix(parser):`


## Description

A description must immediately follow the space after the type/scope prefix. The description is a short summary of the code changes, e.g., `fix: array parsing issue when multiple spaces were contained in string`.


## Body

A longer commit body may be provided after the short description, providing additional contextual information about the code changes. The body must begin one blank line after the description.

A commit that has the text `BREAKING CHANGE:` at the beginning of its optional body or footer section introduces a breaking API change.

Breaking changes MUST be indicated at the very beginning of the body section, or at the beginning of a line in the footer section. A breaking change MUST consist of the uppercase text BREAKING CHANGE, followed by a colon and a space.

A description MUST be provided after the `BREAKING CHANGE:`, describing what has changed about the API, e.g., `BREAKING CHANGE: environment variables now take precedence over config files.`

## Footer

A footer of one or more lines MAY be provided one blank line after the body.

The footer MUST contain meta-information about the commit, e.g., related pull-requests, reviewers, breaking changes, with one piece of meta-information per-line.

The footer should contain a [closing reference to an issue](https://help.github.com/en/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword) if any.


## Example

```
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files

Closes #10
```

```
feat(lang): add polish language

Fixes octo-org/octo-repo#100
```

```
docs: correct spelling of CHANGELOG

Resolves #10, resolves #123, resolves octo-org/octo-repo#100
```


## FAQ

### Why Use Conventional Commits

- Automatically generating CHANGELOGs.
- Automatically determining a semantic version bump (based on the types of commits landed).
- Triggering build and publish processes.
- Making it easier for people to contribute to your projects, by allowing them to explore a more structured commit history.


### How does this relate to SemVer?

`fix` type commits should be translated to `PATCH` releases.

`feat` type commits should be translated to `MINOR` releases.

Commits with `BREAKING CHANGE` in the commits, regardless of type, should be translated to `MAJOR` releases.


### Do all my contributors need to use the conventional commit specification?

No! If you use a squash based workflow on Git lead maintainers can clean up the commit messages as they’re merged—adding no workload to casual committers.

A common workflow for this is to have your git system automatically squash commits from a pull request and present a form for the lead maintainer to enter the proper git commit message for the merge.