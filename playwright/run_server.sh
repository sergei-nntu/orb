#! /bin/bash

current_dir=""${PWD##*/}
echo "CURRENT_DIRECTORY: $current_dir"
cd ..
DIR=$(pwd)

cd "${DIR}/web"

VARIABLES_FILE=".env"

source "$VARIABLES_FILE"

echo "REACT_APP_ENVIRONMENT: $REACT_APP_ENVIRONMENT"

if [ "$REACT_APP_ENVIRONMENT" == "production" ]; then

    sed -i.bak 's/^REACT_APP_ENVIRONMENT=production/REACT_APP_ENVIRONMENT=development/' "$VARIABLES_FILE"
fi

sudo docker build . -t telemetrybalkan/orb
cd ..
cd "${DIR}/docker"
sudo docker build . -t telemetrybalkan/ros
sudo docker compose up -d

sudo ufw disable
sudo ufw status

docker ps
netstat -ln | grep 3000
sudo netstat -tulpn

exit 0