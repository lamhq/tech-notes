# Constraints

## Foreign Key Constraints

```sql
ALTER TABLE facts ADD CONSTRAINT fk_facts_1 FOREIGN KEY (fact_type_id) REFERENCES lu_fact_types (fact_type_id)   ON UPDATE CASCADE ON DELETE RESTRICT;

CREATE INDEX fki_facts_1 ON facts (fact_type_id);
```

Unlike for primary key and unique constraints, PostgreSQL doesn’t automatically create an index for foreign key constraints; you should add this yourself to speed up queries.


## Unique Constraints

```sql
ALTER TABLE logs_2011 ADD CONSTRAINT uq UNIQUE (user_name,log_ts);
```

## Check Constraints

unlike primary key, foreign key, and unique key constraints, check constraints inherit from parent tables.

```sql
ALTER TABLE logs ADD CONSTRAINT chk CHECK (user_name = lower(user_name));
```

## Exclusion Constraints

Exclusion constraints allow you to incorporate additional operators to enforce uniqueness that can’t be satisfied by the equality operator.

Suppose you have a fixed number of conference rooms in your office, and groups must book them in advance. See how we’d prevent double-booking:

```sql
CREATE TABLE schedules(id serial primary key, room int, time_slot tstzrange);
ALTER TABLE schedules ADD CONSTRAINT ex_schedules EXCLUDE USING gist (room WITH =, time_slot WITH &&);
```