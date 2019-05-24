#!/bin/bash
gatsby build

rsync -a --progress ./docker-compose.prod.yml deploy@topia.us:/home/deploy/web/docker-compose.yml
rsync -a --progress ./dhparam-2048.pem deploy@topia.us:/home/deploy/web
rsync -a --progress ./nginx.prod.conf deploy@topia.us:/home/deploy/web/nginx.conf
rsync -a --progress ./public deploy@topia.us:/home/deploy/web

ssh deploy@topia.us 'cd /home/deploy/web && sudo docker-compose down && sudo docker-compose up -d'
