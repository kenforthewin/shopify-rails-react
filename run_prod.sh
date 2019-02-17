#!/bin/bash
docker-compose -f docker-compose.yml -f docker-compose.gcp.yml up --build -d
docker network connect nginx_network shopifyorderchannels_app_1
