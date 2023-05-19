# Delete Duplicated Rows

## Finding duplicate rows

```sql
SELECT
    fruit,
    COUNT( fruit )
FROM
    basket
GROUP BY
    fruit
HAVING
    COUNT( fruit )> 1
ORDER BY
    fruit;
```


## Deleting duplicate rows

### Using `DELETE USING` statement

```sql
DELETE FROM
    basket a
        USING basket b
WHERE
    a.id < b.id
    AND a.fruit = b.fruit;
```


### Using subquery

```sql
DELETE FROM table_name
WHERE id IN
    (SELECT id
    FROM 
        (SELECT id,
         ROW_NUMBER() OVER( PARTITION BY column_1,
         column_2
        ORDER BY  id ) AS row_num
        FROM table_name ) t
        WHERE t.row_num > 1 );
```


### Using an immediate table

```sql
-- step 1
CREATE TABLE basket_temp (LIKE basket);

-- step 2
INSERT INTO basket_temp(fruit, id)
SELECT 
    DISTINCT ON (fruit) fruit,
    id
FROM basket; 

-- step 3
DROP TABLE basket;

-- step 4
ALTER TABLE basket_temp 
RENAME TO basket;
```
