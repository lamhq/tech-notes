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