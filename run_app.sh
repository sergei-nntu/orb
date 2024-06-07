#! /bin/bash

#nohup bash run_orb.sh &

http_code=""

while [ "$http_code" != "200" ]; do
  sleep 5
  http_code=$(curl -o /dev/null -s -w "%{http_code}\n" http://localhost:3000)
  echo "Current HTTP status code: $http_code"
done

echo "Server is up and running with status code 200."

chmod +x run_ros.sh
./run_ros.sh

exit 0
