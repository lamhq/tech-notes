# Package Management

Package management is a method of installing and maintaining software on the system.


## Packaging Systems

Different Linux distributions use different packaging systems.

A package intended for one distribution is not compatible with another distribution.

Most distributions fall into one of two camps of packaging technologies:
- **Debian-style (.deb)**: Debian, Ubuntu, Linux Mint, Raspbian
- **Red Hat–style (.rpm)**: Fedora, CentOS, Red Hat Enterprise Linux, OpenSUSE


## Package Files

A package file is a compressed collection of files that comprise the software package.

The package file also includes metadata about the package, such as a text description of the package and its contents.

Many packages contain pre and post-installation scripts that perform configuration tasks before and after the package installation.

Package files are created by a person known as a package maintainer.

The package maintainer gets the software in source code form from the author, compiles it, and creates the package metadata and any necessary installation scripts.

The package maintainer will apply modifications to the original source code to improve the program’s integration with the other parts of the Linux distribution.


## Dependencies

If a package requires a shared resource such as a shared library, it is said to have a dependency.

**Dependency resolution** is a method to ensure that when a package is installed, all of its dependencies are installed, too.


## Finding a Package

Debian:

```sh
apt-get update
apt-cache search <search_string>
```

Red Hat:

```sh
yum search <search_string>
```


## Installing a Package

Debian:

```sh
apt-get update
apt-get install <package_name>
```

Red Hat:

```sh
yum install <package_name>
```

## Installing a Package from a Package File

Debian:

```sh
dpkg -i <package_file>
```

Red Hat:

```sh
rpm -i package_file
```

## Removing a Package

Debian:

```sh
apt-get remove package_name
```

Red Hat:

```sh
yum erase package_name
```

## Updating Packages from a Repository

```sh
apt-get update; apt-get upgrade
```

Red Hat:

```sh
yum update
```

## Listing Installed Packages

Debian:

```sh
dpkg -l
```

Red Hat:

```sh
rpm -qa
```

## Displaying Information About an Installed Package

Debian:

```sh
apt-cache show <package_name>
```

Red Hat:

```sh
yum info <package_name>
```


## About `apt-get update`

- This command **updates the package lists** from the repositories.
- It fetches information about available packages, their versions, and dependencies.
- It's a lightweight operation that ensures you have the latest package information.
- It **does not install or upgrade any packages**.
- It's a good practice to run this command before installing or upgrading packages to ensure you have the latest information about available software.

If you don't run **`apt-get update`, a few things can happen:

- **Outdated Package Information**: this could lead to installing older versions of packages or missing out on newly added packages.
- **Dependency Resolution Issues**: if the package lists are not up-to-date, it may not accurately determine the required dependencies. This can result in incomplete installations or broken dependencies.
