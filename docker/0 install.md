## Install docker on Fedora (yum)

- Follow the official [guide](https://docs.docker.com/v17.12/install/linux/docker-ce/centos/)
- If encounted error `Requires: container-selinux >= **`, run the command ([reference](https://stackoverflow.com/questions/45272827/docker-ce-on-rhel-requires-container-selinux-2-9)):

```
subscription-manager repos --enable=rhel-7-server-extras-rpms
```