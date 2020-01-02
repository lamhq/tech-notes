## Install docker on Fedora (yum)

```shell
yum install -y https://download.docker.com/linux/centos/7/x86_64/stable/Packages/docker-ce-cli-19.03.5-3.el7.x86_64.rpm
yum install -y http://mirror.centos.org/centos/7/extras/x86_64/Packages/container-selinux-2.107-3.el7.noarch.rpm
yum install -y https://download.docker.com/linux/centos/7/x86_64/stable/Packages/containerd.io-1.2.6-3.3.el7.x86_64.rpm
yum install -y https://download.docker.com/linux/centos/7/x86_64/stable/Packages/docker-ce-19.03.5-3.el7.x86_64.rpm
systemctl start docker
docker run --rm hello-world
```

**References**
- https://docs.docker.com/v17.12/install/linux/docker-ce/centos/
- https://stackoverflow.com/questions/45272827/docker-ce-on-rhel-requires-container-selinux-2-9
- http://mirror.centos.org/centos/7/extras/x86_64/Packages/
