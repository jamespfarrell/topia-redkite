#!/bin/bash
gatsby build

rsync -a --progress ./docker-compose.yml deploy@web-staging.topia.us:/home/deploy/web
rsync -a --progress ./dhparam-2048.pem deploy@web-staging.topia.us:/home/deploy/web
rsync -a --progress ./nginx.staging.conf deploy@web-staging.topia.us:/home/deploy/web
rsync -a --progress ./public deploy@web-staging.topia.us:/home/deploy/web

ssh deploy@web-staging.topia.us 'cd /home/deploy/web && sudo docker-compose down && sudo docker-compose up -d'
