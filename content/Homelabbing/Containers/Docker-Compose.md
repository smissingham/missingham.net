---
tags:
  - docker
---
"Poor Man's Kubernetes"
https://docs.docker.com/compose/

I use docker-compose (or podman-compose) to host software as ephemeral app containers on my home server. 

This allows me to declaratively define software services I want to run, what URL's to host them at, how they interface with each other and save that all into simple code files that allow me to restore it on any machine in the future.