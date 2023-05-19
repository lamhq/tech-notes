# Installing MySQL on MacOS

## Download

Download [MySQL Community Server generic binary distributions](https://dev.mysql.com/downloads/mysql/)


## Unpack the Distribution

```shell
cd /Users/lam/Desktop/program
tar zxvf mysql.tar.gz
```


## Update PATH env

Add this line to file **~/.zshrc**

```shell
export PATH="/Users/lam/Desktop/program/mysql/bin:$PATH"
```


## Init data directory

```shell
mysqld --initialize
```


## Start MySQL

```shell
mysqld_safe --default-authentication-plugin=mysql_native_password
```


## Change root account's password

```shell
mysql -u root -p
# Enter default generated password
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';
```


## Create database and user

```sql
CREATE DATABASE t2h;
CREATE USER 't2h'@'localhost' IDENTIFIED WITH mysql_native_password BY 'bangk0k';
GRANT ALL PRIVILEGES ON t2h.* TO 't2h'@'localhost';
```


## Connect to database with new user

```shell
mysql -u t2h -pbangk0k
```

## Execute sql script

```shell
mysql -u [username] -p[password] [datbase name] < file/path.sql
mysql -u t2h -pbangk0k -D opencart < /Users/lam/Desktop/source/opencart/upload/install/opencart.sql
```

## Stop mysql

```shell
mysqladmin -u root -p1234 shutdown
```


## Reference

- [Installing MySQL on Unix/Linux Using Generic Binaries](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/binary-installation.html)
- [Postinstallation Setup and Testing](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/postinstallation.html)