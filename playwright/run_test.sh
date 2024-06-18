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

#sed -i -e 's/production/development/g' .env
#echo "$(<./.env)"

sudo docker build . -t telemetrybalkan/orb
cd ..
cd "${DIR}/docker"
sudo docker build . -t telemetrybalkan/ros
sudo docker compose up -d

echo "Run Playwright tests"
cd ..
cd playwright

set +e
Xvfb :0 -screen 0 1024x768x24 +extension GLX +render -noreset >> xsession.log 2>&1 &
export DISPLAY=:0

CI=$1 npx playwright test

exit 0