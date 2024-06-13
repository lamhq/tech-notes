# Storing Password

How to store passwords safely in the database?

## Don't

Storing passwords in plain text is not a good idea because anyone with internal access can see them.

Storing password hashes directly is not sufficient because it is pruned to **precomputation attacks** (such as rainbow tables).

*Attackers can generate a large database of potential passwords and their corresponding hash values ahead of time. This database, known as a **rainbow table**, allows attackers to quickly look up the hash value of a stolen password and find a matching entry, which reveals the original password*.


## Do: Salt passwords

To mitigate precomputation attacks, we salt the passwords.

A salt is a unique, randomly generated string that is added to each password as part of the hashing process.

### Storing password

1. A client enters the password.
2. A salt is generated randomly for the user
3. The password can be stored in the database using the following format: `hash(password + salt)`

| email       | salt                 | password                |
|-------------|----------------------|-------------------------|
| example.com | *randomly generated* | *hash(password + salt)* |


### Validating password

1. A client enters the password and email to login.
2. The system fetches the corresponding salt from the database (e.g. by email).
3. The system appends the salt to the password and hashes it.
4. The system compares hashed string and the hash stored in the database. If they are the same, the password is valid.