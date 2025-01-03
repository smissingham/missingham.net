---
tags:
  - how-to
  - docker
---
Here's an example [docker-compose](Docker-Compose.md) configuration for running two containers:
- [Ollama](https://ollama.com/): Open source runtime for running LLM's on your own hardware
- [OpenWebUI](https://docs.openwebui.com/): "Self-hosted AI interface designed to operate entirely offline"


``` yaml
  ollama:
    image: ollama/ollama
    container_name: ollama
    volumes:
      - ./appdata/webservices/ollama:/root/.ollama
    ports:
      - "11434:11434"

    # NixOS specific syntax to get GPU support working.
    # For standard syntax, see: https://docs.docker.com/compose/how-tos/gpu-support/
    deploy:
      resources:
        reservations:
          devices:
              - driver: cdi
                device_ids:
                  - nvidia.com/gpu=all

  open-webui:
      image: ghcr.io/open-webui/open-webui:main
      container_name: open-webui
      volumes:
        - ./appdata/webservices/open-webui:/app/backend/data
      depends_on:
        - ollama
      ports:
        - 3000:8080
      environment:
        - 'OLLAMA_BASE_URL=http://ollama:11434'
      restart: unless-stopped
```
