# Continuous Integration

To run Cypress in Continuous Integration:

1. Install Cypress
```bash
npm install cypress --save-dev
```
2. Run cypress
```bash
cypress run
```

## Boot your server

Typically you will need to boot a local server prior to running Cypress. It can be done using:

### `wait-on` module

Using the [wait-on](https://github.com/jeffbski/wait-on) module, you can block
the `cypress run` command from executing until your server has booted.

```shell
npm start & wait-on http://localhost:8080
```

```shell
cypress run
```

### **`start-server-and-test` module**

If the server takes a very long time to start, we recommend trying the
[start-server-and-test](https://github.com/bahmutov/start-server-and-test)
module.

```shell
npm install --save-dev start-server-and-test
```

In your `package.json` scripts, pass the command to boot your server, the url
your server is hosted on and your Cypress test command.

```json
{
  ...
  "scripts": {
    "start": "my-server -p 3030",
    "cy:run": "cypress run",
    "test": "start-server-and-test start http://localhost:3030 cy:run"
  }
}
```

In the example above, the `cy:run` command will only be executed when the URL `http://localhost:3030` responds with an HTTP status code of 200. The server will also shut down when the tests complete.

## Official Cypress Docker Images

We have created an official [cypress/base](https://hub.docker.com/r/cypress/base/) container with all of the required dependencies installed. 

A typical Dockerfile would look like this:

```dockerfile
FROM cypress/base
RUN npm install
RUN npx cypress run
```

## Github Actions