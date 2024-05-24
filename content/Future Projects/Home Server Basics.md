---
tags:
  - wip
  - how-to
  - docker
  - homelab
---
- Bind mount performance
- Must run docker commands from within wsl shell

Samples
## .env
```env
ROOT_DOMAIN=XXXXXXX
ADMIN_EMAIL=XXXXXXX

DIR_CONFIGS=~/containers
DIR_MEDIA=~/media

PUID=1000
PGID=1000

TZ=Australia/Brisbane
```

### docker-compose.common.yml
```yaml
name: infra-common

volumes:
  letsencrypt:
  
networks:
  traefik-public:
    external: true
    name: traefik-public
  internal:
    name: internal

services:
  traefik:
    container_name: traefik
    image: traefik:v2.11
    restart: unless-stopped
    environment:
      - TZ=${TZ}
      - PUID=${PUID}
      - PGID=${PGID}
    networks:
      - traefik-public
    command:
      #- "--log.level=DEBUG"
      #- "--api.dashboard=true"
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.websecure.address=:443"
      - "--certificatesresolvers.myresolver.acme.tlschallenge=true"
      - "--certificatesresolvers.myresolver.acme.email=${ADMIN_EMAIL}"
      - "--certificatesresolvers.myresolver.acme.storage=/letsencrypt/acme.json"
    ports:
      - "443:443"
      #- "8080:8080"
    volumes:
      #- "${DIR_CONFIGS}/traefik/letsencrypt:/letsencrypt"
      - letsencrypt:/letsencrypt
      - "/var/run/docker.sock:/var/run/docker.sock:ro"
```


How to run open source software services on your home computer for analytics, data storage, web 
hosting and more.