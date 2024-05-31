#! /bin/bash

current_dir=""${PWD##*/}
echo "CURRENT_DIRECTORY: $current_dir"
cd ..
DIR=$(pwd)

cd "${DIR}/web"
#sed -i -e 's/production/development/g' .env
#echo "$(<./.env)"

#npm install
#npm run start

sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
sudo apt update
apt-cache policy docker-ce
sudo apt install docker-ce
sudo systemctl status docker

sudo docker build . -t telemetrybalkan/orb
cd ..
cd "${DIR}/docker"
sudo docker build . -t telemetrybalkan/ros
sudo docker compose up -d

echo "PublicIPs - "
sudo curl icanhazip.com

#sudo lsof -i
sudo cat /etc/hosts

cd ..
cd playwright

set +e
Xvfb :0 -screen 0 1024x768x24 +extension GLX +render -noreset >> xsession.log 2>&1 &
export DISPLAY=:0

CI=$1 npx playwright test

exit 0