# Testing

## Create a test database

```sh
psql -d postgres << EOF
DROP DATABASE test_db;
CREATE DATABASE test_db;
GRANT ALL PRIVILEGES ON DATABASE test_db TO albert;
EOF
```


## Import data from CSV

```sh
psql -d test_db << EOF
DROP TABLE IF EXISTS raw_data;
CREATE TABLE raw_data (
    cell_id VARCHAR(255) NOT NULL,
    time_real INT NOT NULL,
    current INT NOT NULL,
    PRIMARY KEY (cell_id, time_real, current)
);
COPY raw_data(cell_id, time_real, current)
FROM '/Users/admin/Desktop/repos/tools/elektra/ds-input.csv'
DELIMITER ',' CSV HEADER;
EOF
```
