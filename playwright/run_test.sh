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

docker build . -t telemetrybalkan/orb
cd ..
cd "${DIR}/docker"
docker build . -t telemetrybalkan/ros
docker compose up -d
sudo service docker stop
sudo rm -f /var/lib/docker/network/files/local-kv.db

sudo lsof -i

#cd ..
#cd playwright
#npx playwright test
exit 0