---
created: 2025-08-19T14:41
updated: 2025-08-19T14:50
tags:
  - homelab
  - docker
  - self-hosting
  - containers
---
I prioritise having a declarative, deterministic system configuration wherever possible.
Self hosting software services is probably the first place where this requirement truly manifested. 

I wanted to apply the "Infrastructure As Code" paradigm to my own self hosted services. With that said, I don't have the time to waste on managing my infrastructure with overkill elaborate enterprise tools like Kubernetes or Ansible.

So, for system configuration I use [[Nix]], and for container hosting I use Podman. Podman is a Docker replacement, with a critical (to me) feature that allows me to host "rootless" containers. Essentially, the containers run with restricted user privileges, instead of running as a psuedo-root user with elevated privileges.

I use the Docker Compose format to manage my container hosting configuration declaratively. This way, I can maintain a simple codebase where my services are *declared* as code, and when I do a `docker compose up -d` podman/docker does all the work to bring up new containers, update existing ones and bring down now-defunct services.

[**Here is my self-hosting container services repository, hosted publicly on GitHub**](https://github.com/smissingham/containers)

In the above repository, you can see what services I host for myself, and the traefik reverse proxy setup I use for provisioning SSL certificates and exposing those services over HTTPS.

Worth noting here is the fact that I use [[Tailscale]] as a private VPN network provider, which allows me to connect to my services through a web browser as if they're any normal web service, but they're only accessible to my devices with access to that private network instead of being available on the open web.