---
template: BlogPost
path: /how-to-generate-a-public-key-from-a-private-key
date: 2020-04-11T06:15:50.738Z
title: 'How to Generate a Public Key from a Private Key'
thumbnail: /assets/pexels-pixabay-39389.jpg
metaDescription: df sdf df
---

Recently, I needed to find the corresponding public key from a private key (`.pem`) to give a Linux user access to a server. I used the below code to generate the public key.

```
ssh-keygen -y -f privatekey > publickey
```

This code generates an OpenSSL key, which wasn't what I needed in that specific case, but might also come in handy.

```
openssl rsa -in privatekey -pubout > publickey
```