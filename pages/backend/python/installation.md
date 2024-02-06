# Installation

If you use Poetry, skip this guide and proceed to [install Poetry](./pkg-mgm/poetry.md).

## Install multiple Python versions (macOS)

Install pyenv:

```bash
brew install pyenv
```

Add pyenv init to `~/.zshrc` (or equivalent shell configuration file):

```bash
echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n  eval "$(pyenv init -)"\nfi' >> ~/.zshrc
```

Reload shell configuration:

```bash
source ~/.zshrc
```

Install a Python version:

```bash
pyenv install 3.7.0
```

Set global Python version:

```bash
pyenv global 3.7.0
```
