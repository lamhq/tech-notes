# User and Permission

## Create a Sudo User on CentOS

- Log in to your server as the root user.
- Add a new user to your system
- update the new user’s password.
- add the user to the wheel group
- Test sudo access on new user account

```bash
ssh root@server_ip_address
adduser username
passwd username
usermod -aG wheel username
su - username
```