


#yum install vim, gnome #other utilities needed on the VM?
yum install -y docker

docker pull wnameless/oracle-xe-11g

#or dockerize with subcomponents
docker build -t "tw-project" . #min 2 subcomps - oracleXE11g, node.js
docker run -p 8081:8081 -d "tw-project"

docker start "tw-project"
docker exec "tw-project" -d npm install -g pm2
#docker init script
#docker.target - and enabled through systemd (meaning, the target runs at startup, when run, it runs the init script for the containers)

