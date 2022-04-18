# Install mailhog

## Install Homebrew

[https://brew.sh/](https://brew.sh/)

Remember to read the instruction in terminal.

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

```sh
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/lam/.zshrc
eval "$(/opt/homebrew/bin/brew shellenv)"
```


## Install MailHog

[https://github.com/mailhog/MailHog#macos](https://github.com/mailhog/MailHog#macos)

```sh
brew update && brew install mailhog
```

Then, start MailHog by running mailhog in the command line.