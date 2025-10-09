---
created: 2025-10-08T13:29
updated: 2025-10-08T13:29
---
# Run MCP Inspector as Docker Container:

```.justfile
docker_inspector:
    docker stop mcpinspector &>/dev/null || true
    docker rm mcpinspector &>/dev/null || true
    docker run \
    --name mcpinspector \
    --rm \
    -p 6274:6274 \
    -p 6277:6277 \
    -e HOST=0.0.0.0 \
    -e DANGEROUSLY_OMIT_AUTH=true \
    -v {{ justfile_directory() }}:/mcpfx \
    ghcr.io/modelcontextprotocol/inspector:latest
```
