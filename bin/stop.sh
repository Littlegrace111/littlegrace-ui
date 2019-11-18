#!/bin/bash

# description: Remote Assistant Console Server - stop script

BIN_DIR=$(cd "$(dirname "$0")"; pwd)
BASE_DIR=$(cd $BIN_DIR/../; pwd)
declare PROJECT_NAME='Littlegrace-ui'
# Stop Server
# killall node
echo ${BASE_DIR}
ps aux | grep ${BASE_DIR}/dispatch.js | grep -v grep | awk '{print $2}' | xargs kill -9
ps aux |grep dispatch.js
#ps aux | grep dispatch.js | grep -v grep | awk '{print $2}' | xargs kill -9
#ps aux | grep ${PROJECT_NAME}/start.js | grep -v grep | cut -c 9-15 | xargs kill -9