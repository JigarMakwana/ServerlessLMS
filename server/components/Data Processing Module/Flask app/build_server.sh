#!/bin/bash 


# color codes for output formatting
GREEN="\033[0;32m"      
NO_COLOR="\033[0m"

CURR_DIR=$(pwd)

echo -e "${GREEN}Removing old dataprocessing container...${NO_COLOR}"
docker rm -f dataprocessing
echo -e "${GREEN}Removing old dataprocessing images...${NO_COLOR}"
docker rmi -f dataprocessing

echo -e "${GREEN}Preparing files for building dataprocessing image...${NO_COLOR}"
cd "$CURR_DIR"
cp "$CURR_DIR/docker_files/dataprocessing.dockerfile" "$CURR_DIR/dataprocessing/"
cp "$CURR_DIR/app.py" "$CURR_DIR/dataprocessing/"
cp "$CURR_DIR/requirements.txt" "$CURR_DIR/dataprocessing/"
cd "$CURR_DIR/dataprocessing"

echo -e "${GREEN}Building dataprocessing image...${NO_COLOR}"
docker build -t dataprocessing:latest -f ./dataprocessing.dockerfile .
cd ..
rm "$CURR_DIR/dataprocessing/dataprocessing.dockerfile"

echo -e "${GREEN}Running the dataprocessing container...${NO_COLOR}"
docker run -d --name dataprocessing -p 5000:5000 dataprocessing -e ACCESS_KEY_ID='ASIAX2ASTWWGYR2VAPNH' -e ACCESS_SECRET_KEY='Fa3CpefKZFeh98zlb+iKP5CxFQ4dYGqiCfSEw4f/' -e AWS_SESSION_TOKEN='FwoGZXIvYXdzEB0aDJu/NrXtHXSwBpnOWCK+AaJQ9TiqIY3nveejxVzJKVsVgs6j6hv9/C1S+fRHiTl7C/gTuqf2EOtKT+gSqHssZ3e8AF3LyuaKHFcjRR6XPD0k9ajvCfG3xtOSf5UN6/vaw/gN2iQ5f6XcZzFuw2cIazx1Sm+5p42vb2/9Y5B35wbX38fx1d+j0P/rbdzkdKkjWLp0i/Oi9ScWkbvyVKBPLgJyv9W4Df8RWb85uI9B25AiyB67KGkYUQ6FeRPT3h0aJnCdKx/93cQnMxIEucco3K33+AUyLTulvlF9WmzR0XjGAmnYx4ANHtME6SYpSxDTMxhbs6nqTOegrtsZWt/d/2fl/w=='