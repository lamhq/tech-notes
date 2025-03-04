# curl basic

## Options
- `-o`: save response to a specific file
- `-O`: save response to a file with automatic file name
- `-L`: follow http redirect
- `-i`: include response header
- `-H`: set custom http headers
- `-d`: request body.
- `-X`: request method.
- `-f`: Fail silently on server errors


```sh
curl http://example.com
curl -o vlc.dmg http://ftp.belnet.be/mirror/videolan/vlc/3.0.4/macosx/vlc-3.0.4.dmg
curl -O http://ftp.belnet.be/mirror/videolan/vlc/3.0.4/macosx/vlc-3.0.4.dmg
curl -i http://example.com
curl -H 'User-Agent: Mozilla/5.0' -H 'Host: www.google.com' http://example.com
curl -d "firstname=boolean&lastname=world" https://httpbin.org/post
curl --data-binary "@path/to/params.txt" example.com
curl -X POST https://httpbin.org/post
```