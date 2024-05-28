#! /bin/bash

current_dir=""${PWD##*/}
echo "CURRENT_DIRECTORY: $current_dir"
cd ..
DIR=$(pwd)

cd "${DIR}/web"
sed -i -e 's/production/development/g' .env
echo "$(<./.env)"

#npm install
#npm run start

docker build . -t telemetrybalkan/orb --no-cache
cd ..
cd "${DIR}/docker"
docker build . -t telemetrybalkan/ros --no-cache
docker compose up -d

#cd ..
#cd playwright
#npx playwright test
exit 0