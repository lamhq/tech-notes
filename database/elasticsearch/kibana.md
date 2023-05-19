# Kibana guides

## Enable user login form in kibana

1. Call start trial API of Elastic Search to switch to trial license (optional)

This step is required if you're running Elastic Search locally for development and SSL can not be used in this situation. So you need to switch to trial license first to by pass SSL verification.

```
curl -XPOST "http://localhost:9200/_license/start_trial?acknowledge=true"
```

2. Enable security features for Elastic Search, edit `elasticsearch.yml`, add this line:

```yml
xpack.security.enabled: true
```

You may need to disable SSL transport if you're running Elastic Search locally:

```yml
xpack.security.transport.ssl.enabled: false
```

3. Update password for built-in users of Elastic Search using the command line tool

```shell
bin/elasticsearch-setup-passwords interactive
```

4. Create a new user for accessing Kibana with role "superadmin" using Create users API

```shell
curl -s -L -X POST 'http://localhost:9200/_security/user/kbnadmin' \
-H 'Content-Type: application/json' \
--data '{
  "password" : "123123",
  "roles" : [ "kibana_admin", "superuser"],
  "full_name" : "Kibana Admin",
  "email" : "kbnadmin@mailinator.com"
}'
```

5. Update Kibana configuration file `kibana.yml` to enable security features

```yml
xpack.security.enabled: true
elasticsearch.hosts: [ "http://localhost:9200" ]
elasticsearch.username: "kbnadmin"
elasticsearch.password: "123123"
```

References:

- [https://www.elastic.co/guide/en/elasticsearch/reference/current/start-trial.html](https://www.elastic.co/guide/en/elasticsearch/reference/current/start-trial.html)
- [https://www.elastic.co/guide/en/elasticsearch/reference/current/get-started-enable-security.html](https://www.elastic.co/guide/en/elasticsearch/reference/current/get-started-enable-security.html)
- [https://www.elastic.co/guide/en/elasticsearch/reference/7.6/built-in-users.html#set-built-in-user-passwords](https://www.elastic.co/guide/en/elasticsearch/reference/7.6/built-in-users.html#set-built-in-user-passwords)
- [https://www.elastic.co/guide/en/elasticsearch/reference/7.6/security-api-put-user.html](https://www.elastic.co/guide/en/elasticsearch/reference/7.6/security-api-put-user.html)