# Redirection

## Standard Input, Output, and Error

Programs take input from a facility called standard input (stdin).

Programs send their results to a special file called standard output (`stdout`) and their status messages to another file called standard error (`stderr`).

Normally, output goes to the screen and input comes from the keyboard.


## Redirecting

I/O redirection allows us to change where output goes and where input comes from.

The redirection operator `>` redirect standard output to a file.

**Send standard output to file**:

```shell
ls -l /usr/bin > ls-output.txt
```

**Append redirected output to a file**:

```shell
ls -l /usr/bin >> ls-output.txt
```

**Redirect standard error to file**:

```shell
ls -l /bin/usr 2> ls-error.txt
```

**Redirecting both Standard Output And Standard Error To One File**:

The old way:
```shell
ls -l /bin/usr > ls-output.txt 2>&1
```

The new way:
```shell
ls -l /bin/usr &> ls-output.txt
```

**Append the standard output and standard error streams to a single file**:

```shell
ls -l /bin/usr &>> ls-output.txt
```

**Suppress error messages from a command**:

```shell
ls -l /bin/usr 2> /dev/null
```
