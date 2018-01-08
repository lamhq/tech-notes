### Install nodejs with nvm

Reference: [https://github.com/creationix/nvm#installation](https://github.com/creationix/nvm#installation)

```
# install nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

# close terminal and start a new one, then verify it
nvm -v

# install nodejs 8.9.4
nvm install 8.9.4
```

### Install nodejs with brew

```
brew install node

# add this in ~/.bashrc
export NODE_PATH='/usr/local/lib/node_modules'
```

### Uninstall nodejs (if installed by brew)

```
brew uninstall node; 
# or `brew uninstall --force node` which removes all versions
brew prune;
rm -f /usr/local/bin/npm /usr/local/lib/dtrace/node.d;
rm -rf ~/.npm;
```
