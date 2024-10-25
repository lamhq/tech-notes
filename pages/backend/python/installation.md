# Installation (MacOS)

We'll use Pyenv to easily install and switch between multiple versions of Python.

## Install Pyenv

```bash
brew update
brew install pyenv
```

For linux, use automatic installer:
```shell
curl https://pyenv.run | bash
```


### Set up shell environment (zsh)

Run these commands:

```bash
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
echo '[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(pyenv init -)"' >> ~/.zshrc
```

Reload shell configuration:

```bash
exec "$SHELL"
```


### Upgrading Pyenv

```shell
brew upgrade pyenv
```


### Uninstall Pyenv

```shell
brew uninstall pyenv
```


## Install python

```bash
pyenv install 3.12.2
```

## Switch between Python versions

```bash
pyenv global 3.12.2
```

## Uninstall Python versions

```bash
pyenv uninstall 3.12.2
```
