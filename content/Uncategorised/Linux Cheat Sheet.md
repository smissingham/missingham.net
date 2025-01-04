---
tags:
  - cli
  - linux
---
# General

| Alias | Command                              | Description                                                     | Example                            |
| ----- | ------------------------------------ | --------------------------------------------------------------- | ---------------------------------- |
| clip  | `xclip -selection clipboard`         | Copy contents to clipboard                                      | `echo "Hello World" \| clip`       |
|       | `journalctl -f -T $EXCLUDEAPP`       | Monitor system logs, optionally exclude noisy apps like browser | `journalctl -f -T floorp`          |
|       | `netstat -ltnp \| grep $PORTNUM`     | Find service listening on port                                  | `netstat -ltnp \| grep 48010`      |
|       |                                      |                                                                 |                                    |
|       | `systemctl --user $COMMAND $SERVICE` | Interact with user level system services                        | `systemctl --user status sunshine` |
|       | `systemctl --user --type=target  `   | List available user level service targets                       |                                    |

# NixOS Specific

| Alias | Command                          | Description                                    | Example            |
| ----- | -------------------------------- | ---------------------------------------------- | ------------------ |
| nxrb  | nixos-rebuild switch             | Rebuild NixOS with latest configuration        | `nxrebuild`        |
| nxsh  | nix-shell -p $1                  | Start a Nix shell with some included package/s | `nxshell neofetch` |
| nxgc  | nix-collect-garbage --delete-old | Cleanup old NixOS generations                  | `nxgc`             |
