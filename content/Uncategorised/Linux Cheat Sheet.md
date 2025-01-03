---
tags:
  - cli
  - linux
---
# General

| Alias | Command                      | Description                | Example                      |
| ----- | ---------------------------- | -------------------------- | ---------------------------- |
| clip  | `xclip -selection clipboard` | Copy contents to clipboard | `echo "Hello World" \| clip` |
|       | `journalctl --follow`        | Monitor system logs        | `journalctl --follow`        |

# NixOS Specific

| Alias     | Command                          | Description                                    | Example            |
| --------- | -------------------------------- | ---------------------------------------------- | ------------------ |
| nxrebuild | nixos-rebuild switch             | Rebuild NixOS with latest configuration        | `nxrebuild`        |
| nxshell   | nix-shell -p $1                  | Start a Nix shell with some included package/s | `nxshell neofetch` |
| nxgc      | nix-collect-garbage --delete-old | Cleanup old NixOS generations                  | `nxgc`             |
