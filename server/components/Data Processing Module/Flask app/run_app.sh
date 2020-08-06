#!/bin/bash 


# color codes for output formatting
GREEN="\033[0;32m"      
NO_COLOR="\033[0m"

CURR_DIR=$(pwd)

echo -e "${GREEN}Removing old dataprocessing container...${NO_COLOR}"
docker rm -f dataprocessing

echo -e "${GREEN}Running the dataprocessing container...${NO_COLOR}"
docker run -d --name dataprocessing -p 5000:5000 dataprocessing
docker logs -f dataprocessing
