### Install nodejs with nvm

Reference: [https://github.com/creationix/nvm#installation](https://github.com/creationix/nvm#installation)

```shell
# install nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

# close terminal and start a new one, then verify it
nvm -v

# install nodejs 14.18.3
nvm install 14.18.3
```

### Install new nodejs version with nvm

```shell
nvm install 18.18.1
nvm use 18.18.1
nvm alias default 18.18.1
```

## Uninstall an old version

```shell
nvm uninstall 14.17.3
```

## Install yarn

```shell
npm install -g yarn
```