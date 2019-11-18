#!/bin/bash

# description: Remote Assistant Console Server - Start script

# get script dir
BIN_DIR=$(cd "$(dirname "$0")"; pwd)
BASE_DIR=$(cd $BIN_DIR/../; pwd)
START_DAY=$(date +"%Y-%m-%d")
declare PROJECT_NAME='Littlegrace-ui'

# Start Server
nohup node $BASE_DIR/dispatch.js &
ps aux | grep dispatch.js
#nohup node $BASE_DIR/start.js &