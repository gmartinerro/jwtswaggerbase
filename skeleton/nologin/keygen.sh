#!/bin/bash

# 4096 is for 2030 and beyond...
KEYSIZE=4096
echo 
echo "IMPORTANT: Don't use passphrase!!"
echo 
ssh-keygen -t rsa -b $KEYSIZE -f jwtRS256.key
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
