Installation steps========Node.JS=========
>Release a ec2 server on linux. then connect teh sever
>commands for install
___________________________________________________________________________________
#!/bin/bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install --lts
yum install git -y
___________________________________________________________________________________
node -v  (for confirmation)
git clone https://github.com/Raam043/Node.JS-test.git
cd Node.JS-test
ls
npm i
node server.js
-------------------------
>Open new tab and paste the server public ip :8080/test
-----------------------------------------------

>For connecting into database - new server should be release as MYSQL_HOST ( new IP)
>command to be connection
MYSQL_HOST="3.96.183.112" MYSQL_USER="ramesh" MYSQL_PASSWORD="ramesh123" MYSQL_DATABASE="test"
