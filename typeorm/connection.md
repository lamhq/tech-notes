# Connection

## Creating a new connection

```ts
import {createConnection, Connection} from "typeorm";

const connection = await createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "test",
  password: "test",
  database: "test"
});
```


## Creating a new connection from the configuration file

```ts
import {createConnection} from "typeorm";

// createConnection method will automatically read connection options
// from your ormconfig file or environment variables
const connection = await createConnection();
```


### Using ormconfig.json

```json
{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "test",
  "password": "test",
  "database": "test"
}
```


### Using environment variables

Create `.env` or `ormconfig.env` in the project root:

```
TYPEORM_CONNECTION=mysql
TYPEORM_HOST=localhost
TYPEORM_USERNAME=root
TYPEORM_PASSWORD=admin
TYPEORM_DATABASE=test
TYPEORM_PORT=3000
TYPEORM_SYNCHRONIZE=true
TYPEORM_LOGGING=true
TYPEORM_ENTITIES=entity/*.js,modules/**/entity/*.js
```

`ormconfig.env` should be used only during development. On production you can set all these values in real ENVIRONMENT VARIABLES.


### Overriding options defined in ormconfig

```ts
// read connection options from ormconfig file (or ENV variables)
const connectionOptions = await getConnectionOptions();

// do something with connectionOptions,
// for example append a custom naming strategy or a custom logger
Object.assign(connectionOptions, { namingStrategy: new MyNamingStrategy() });

// create a connection using modified connection options
const connection = await createConnection(connectionOptions);
```


## Common connection options

- `type`: Database type. Possible values are "mysql", "postgres", "cockroachdb", "mariadb", "sqlite", "cordova", "nativescript", "oracle", "mssql", "mongodb", "sqljs", "react-native".
- `extra`: Extra connection options to be passed to the underlying driver.
- `entities`: Entities to be loaded and used for this connection. Example: `entities: [Post, Category, "entity/*.js", "modules/**/entity/*.js"]`
- `migrations`: Migrations to be loaded and used for this connection. Example: `migrations: [FirstMigration, SecondMigration, "migration/*.js", "modules/**/migration/*.js"]`.
- `migrationsRun`: Indicates if migrations should be auto run on every application launch.
- `logger`: Logger to be used for logging purposes. You can also specify a logger class that implements `Logger` interface
- `dropSchema`: Drops the schema each time connection is being established. Be careful with this option and don't use this in production.
- `synchronize`: Indicates if database schema should be auto created on every application launch. Be careful with this option and don't use this in production
- `cli.entitiesDir`: Directory where entities should be created by default by CLI.
- `cli.migrationsDir`: Directory where migrations should be created by default by CLI.
- `cli.subscribersDir`: Directory where subscribers should be created by default by CLI.