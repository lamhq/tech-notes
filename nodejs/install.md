### Install nodejs with nvm

Reference: [https://github.com/creationix/nvm#installation](https://github.com/creationix/nvm#installation)

```shell
# install nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

# close terminal and start a new one, then verify it
nvm -v

# install nodejs 8.12.0
nvm install 8.12.0
```

### Install new nodejs version with nvm

```shell
nvm install 10.9.0
nvm alias default v10.9.0
```

## Uninstall an old version

```shell
nvm uninstall 8.12.0
```