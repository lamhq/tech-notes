# Installation (MacOS)

We'll use Pyenv to easily install and switch between multiple versions of Python.

## Install Pyenv

```sh
brew update
brew install pyenv
```

For linux, use automatic installer:
```sh
curl https://pyenv.run | bash
```


### Set up shell environment (zsh)

Run these commands:

```sh
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
echo '[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(pyenv init -)"' >> ~/.zshrc
```

Reload shell configuration:

```sh
exec "$SHELL"
```


### Upgrading Pyenv

```sh
brew upgrade pyenv
```


### Uninstall Pyenv

```sh
brew uninstall pyenv
```


## Install python

```sh
pyenv install 3.12.2
```

## Switch between Python versions

```sh
pyenv global 3.12.2
```

## Uninstall Python versions

```sh
pyenv uninstall 3.12.2
```
