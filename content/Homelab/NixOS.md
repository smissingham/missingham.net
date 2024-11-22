https://nixos.org/

NixOS is a Linux distribution.

It is built on top of the `nix` package manager.

Unlike other common Linux distros, it does not have a `apt` or `yum` type package manager to install software. 

Instead, `nix` allows you to install software either via a declarative configuration file or in a temporary shell environment.

# My NixOS Config

This is my daily driver operating system configuration: 

https://github.com/smissingham/nixos-config

## General Notes on My Config

### I use KDE Plasma 6 for my Desktop Environment

I've tried GNOME, I hated how rudimentary it was. KDE Plasma as their tag suggests is simple when you see it but powerful when you need it.

Most important of all, it has by far the best Desktop Window tiling support, right out of the box. 
All of the Virtual-desktop and Window snapping shortcuts match the excellent Windows shortcuts, so my keyboard macros work out of the box.

## Proton Drive Sync Client

I'm switching to Proton Drive, away from Google Drive. Proton Drive does not have client support for Linux, however it does support rclone.