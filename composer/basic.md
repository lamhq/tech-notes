### The `require` Key in `composer.json`

You are simply telling Composer which
packages your project depends on.

__composer.json__

```json
{
    "require": {
        "codeception/base": "1.0.*"
    }
}
```

As you can see, `require` takes an object that maps **package names** (e.g. `codeception/base`) to **version constraints** (e.g. `1.0.*`).

The __package name__ consists of a vendor name (e.g. `codeception`) and the project's name (e.g. `base`).

`1.0.*` means any version in the `1.0` development branch, or any version that is greater than or equal to 1.0 and less than 1.1 (`>=1.0 <1.1`).

### How does Composer download the right files?

When you specify a dependency in
`composer.json`, Composer first takes the name of the package that you have requested and searches for it in any repositories that you have registered using the [`repositories`](04-schema.md#repositories) key.

If you have not registered any extra repositories, or it does not find a package with that name in the
repositories you have specified, it falls back to Packagist

### Installing Dependencies

``` bash
php composer.phar install
```

Commit Your `composer.lock` File to Version Control is important because it will cause anyone who sets up the project to use the exact same versions of the dependencies that you are using

### Updating Dependencies to their Latest Versions

``` bash
php composer.phar update
```

### Autoloading

You can even add your own code to the autoloader by adding an `autoload` field to `composer.json`:

__composer.json__

```json
{
    "autoload": {
        "psr-4": {"Acme\\": "src/"}
    }
}
```

Composer will register a [PSR-4](http://www.php-fig.org/psr/psr-4/) autoloader
for the `Acme` namespace.

You define a mapping from namespaces to directories. The `src` directory would be in your project root, on the same level as `vendor` directory is. An example filename would be `src/Foo.php` containing an `Acme\Foo` class.

### Most needed command

``` bash
composer init
composer require vendor-name/package-name
composer install
composer update
composer remove
composer dump-autoload --optimize
composer run-script
composer self-update
```

### Explanation cheatsheet

[http://composer.json.jolicode.com/](http://composer.json.jolicode.com/)