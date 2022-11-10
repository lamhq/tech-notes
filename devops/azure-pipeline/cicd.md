## CI practices

- Automate the build
- Run unit test in the build
- Test in a clone of the production environment
- Ensure that the build process is transparent to everyone
- Automate the deployment but manually triggered

Continuous Delivery (CD) adds the following aspect to the Continuous Integration practices: Any change passing the tests is immediately ready to be deployed to production. This means that the most current version of the product is successfully built, tested, and provided in a shippable format.

By contrast, Continuous Deployment, which is not discussed in this document, means that each change is automatically built, tested, and deployed to production without manual interaction.

- Run test on every pull request is created or updated to `develop`, `master`
- Run test on every changes to `master`, `develop`
- Deploy to test environment every time changes pushed to `master`
- Deploy to production systems is manually triggered.
