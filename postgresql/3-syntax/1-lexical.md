# Lexical Structure

**SQL input** consists of a sequence of commands. 

A **command** is composed of a sequence of tokens, terminated by a semicolon (`;`).

A **token** can be a key word, an identifier, a quoted identifier, a literal (or constant), or a special character symbol.

Tokens are normally separated by whitespace (space, tab, newline).

An example for valid SQL input:

```sql
SELECT * FROM MY_TABLE;
UPDATE MY_TABLE SET A = 5;
INSERT INTO MY_TABLE VALUES (3, 'hi there');
```

**Comments** can occur in SQL input. They are not tokens, they are effectively equivalent to whitespace.


## Identifiers and Key Words

Tokens such as `SELECT`, `UPDATE`, or `VALUES` are examples of **key words** (words that have a fixed meaning in the SQL language)

The tokens `MY_TABLE` and `A` are examples of identifiers. They identify names of tables, columns, or other database objects, depending on the command they are used in. Therefore they are sometimes simply called **names**. 

SQL identifiers and key words must begin with a letter (a-z) or an underscore (_).

Key words and unquoted identifiers are case insensitive. Therefore:

```sql
UPDATE MY_TABLE SET A = 5;

-- can equivalently be written as:
uPDaTE my_TabLE SeT a = 5;
```

A **convention** often used is to write key words in upper case and names in lower case, e.g.:

```sql
UPDATE my_table SET a = 5;
```

### Delimited identifier

A **delimited identifier** (or quoted identifier) is always an identifier, never a key word:

```sql
UPDATE "my_table" SET "a" = 5;
```

Quoting an identifier also makes it case-sensitive, whereas unquoted names are always folded to lower case:
- the identifiers `FOO`, `foo`, and `"foo"` are considered the same
- but `"Foo"` and `"FOO"` are different from these three and each other

If you want to write portable applications you are advised to always quote a particular name or never quote it


### Escaped Unicode characters

This variant starts with `U&` immediately before the opening double quote.

Inside the quotes, Unicode characters can be specified in escaped form by writing a backslash followed by the four-digit hexadecimal code point number (or alternatively a backslash followed by a plus sign followed by a six-digit hexadecimal code point number)

For example, the identifier "data" could be written as:

```
U&"d\0061t\+000061"
```

If a different escape character than backslash is desired, it can be specified using the `UESCAPE` clause after the string, for example:

```
U&"d!0061t!+000061" UESCAPE '!'
```

The escape character can be any single character other than a hexadecimal digit, the plus sign, a single quote, a double quote, or a whitespace character. 

To include the escape character in the identifier literally, write it twice.


## Constants

### String Constants

A string constant in SQL is an arbitrary sequence of characters bounded by **single quotes** (`'`).

To include a single-quote character within a string constant, write two adjacent single quotes, e.g., `'Dianne''s horse'`

Two string constants that are only separated by whitespace with at least one **newline** are concatenated, and effectively treated as if the string had been written as one constant.

```sql
SELECT 'foo'
'bar';

-- is equivalent to:
SELECT 'foobar';
```


### String Constants With C-Style Escapes

An escape string constant is specified by writing the letter `E` just before the opening single quote, e.g., `E'foo'`. 

Within an escape string, a backslash character (`\`) begins a C-like backslash escape sequence

[Table 4.1. Backslash Escape Sequences](https://www.postgresql.org/docs/current/sql-syntax-lexical.html#SQL-BACKSLASH-TABLE)

To include a backslash character, write two backslashes (`\\`).

A single quote can be included in an escape string by writing `\'`, in addition to the normal way of `''`.


### String Constants With Unicode Escapes

For example, the string `'data'` could be written as:

```
U&'d\0061t\+000061'
```

If a different escape character than backslash is desired, it can be specified using the UESCAPE clause after the string, for example:

```
U&'d!0061t!+000061' UESCAPE '!'
```

The escape character can be any single character other than a hexadecimal digit, the plus sign, a single quote, a double quote, or a whitespace character.


### Dollar-Quoted String Constants

PostgreSQL provides a way called "dollar quoting", to write string constants. 

A dollar-quoted string constant consists of:

- a dollar sign (`$`), an optional "tag" of zero or more characters, another dollar sign
- an arbitrary sequence of characters that makes up the string content
- dollar sign, the same tag that began this dollar quote, and a dollar sign.

For example, here are two different ways to specify the string *"Dianne's horse"* using dollar quoting:

```
$$Dianne's horse$$
$SomeTag$Dianne's horse$SomeTag$
```

Inside the dollar-quoted string, no characters inside a dollar-quoted string are ever escaped (single quotes, backslashes, are dollar signs, unless they are part of a sequence matching the opening tag). The string content is always written literally.

It is possible to nest dollar-quoted string constants by choosing different tags at each nesting level. This is most commonly used in writing function definitions. For example:

```sql
$function$
BEGIN
    RETURN ($1 ~ $q$[\t\r\n\v\\]$q$);
END;
$function$
```

The tag follows the same rules as an unquoted identifier. Tags are case sensitive, so $tag$String content$tag$ is correct, but $TAG$String content$tag$ is not.


### Bit-String Constants

e.g., `B'1001'`


### Numeric Constants

```
42
3.5
4.
.001
5e2
1.925e-3
```

When necessary, you can force a numeric value to be interpreted as a specific data type by casting it. For example, you can force a numeric value to be treated as type real (float4) by writing:

```
REAL '1.23'  -- string style
1.23::REAL   -- PostgreSQL (historical) style
```

### Constants Of Other Types

A constant of an arbitrary type can be entered using any one of the following notations:

```
type 'string'
'string'::type
CAST ( 'string' AS type )
```


## Operators

An operator name is a sequence of characters from the following list:

```
+ - * / < > = ~ ! @ # % ^ & | ` ?
```


## Special Characters

- A dollar sign (`$`) followed by **digits** is used to represent a positional parameter in the body of a function definition or a prepared statement.
- Parentheses (`()`) have their usual meaning to group expressions and enforce precedence.
- Brackets (`[]`) are used to select the elements of an array.
- Commas (`,`) are used in some syntactical constructs to separate the elements of a list.
- The semicolon (`;`) terminates an SQL command.
- The colon (`:`) is used to select “slices” from arrays.
- The asterisk (`*`) is used in some contexts to denote all the fields of a table row or composite value.
- The period (`.`) is used in numeric constants, and to separate schema, table, and column names.


## Comments

```
-- This is a standard SQL comment
```
