# Codebase setup checklist

- Ensure that your codebase has a linter configured with some code standards to check the code style.
- Make sure that commit messages follow the conventional commit format. The format is checked automatically on commit.
- Implement a check to prevent committing to the main branch.
- Install a test runner (Jest).
- Include unit tests and consider including integration tests or e2e tests.
- Integrate dotenv. Avoid hardcoding environment-specific values in the code.
