# Getting Started

## Install multiple Python versions on macOS

Install pyenv

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

Install a Python version (example: 3.7.0):

```bash
pyenv install 3.7.0
```

Set global Python version:

```bash
pyenv global 3.7.0
```
