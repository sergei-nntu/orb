#! /bin/bash

current_dir=""${PWD##*/}
echo "CURRENT_DIRECTORY: $current_dir"

DIR=$(pwd)

cd "${DIR}/web"

npm install
echo "Application will run on port 3000"
npm run start
