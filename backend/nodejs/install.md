### Install nodejs with nvm

Reference: [nvm Github](https://github.com/nvm-sh/nvm#install--update-script)

```shell
# install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# close terminal and start a new one, then verify it
nvm -v

# install nodejs 14.18.3
nvm install 14.18.3
```

### Install new nodejs version with nvm

```shell
nvm install 20.10.0
nvm use 20.10.0
nvm alias default 20.10.0
```

## Uninstall an old version

```shell
nvm uninstall 14.17.3
```

## Install yarn

```shell
npm install -g yarn
```