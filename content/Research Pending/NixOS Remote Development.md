---
tags: wip
---
> [!warning] This document is a pending research item

I like to do remote software development from my under-powered Microsoft Surface laptop, utilising the significant hardware from my home server. 

Now that I've switched to NixOS for my home server OS, I need to figure out my remote development workflow.

These are the notes for my investigation of what that might come to look like.


# Requirements

## Must Have
- Secure remote access
- Debugging tools (not just a text editor like *vim*)
## Should Have

## Nice to Have
- Notebook support for visualisations
## Won't Have
- Windows Remote Desktop 😭

# Technology Notes

### Linux Remote Desktop Options+
My top preference would be to have a remote desktop connection to my NixOS host. 
Generally speaking, this looks to be challenging. NixOS + KDE Plasma6 + Wayland + Remote Desktop doesn't have a lot of resounding successful notes online. My notes below.

NixOS Wiki Reference: https://nixos.wiki/wiki/Remote_Desktop
#### Option 1: KRDP

It appears there's a KDE Plasma native RDP service in nix packages: [kdePackages.krdp](https://search.nixos.org/packages?channel=24.11&type=packages&query=kdePackages.krdp)
#### Option 2: XRDP

Looks like it might be possible to get a plasma DE running via xRDP
- [Discourse Example](https://discourse.nixos.org/t/how-to-configure-services-xrdp-defaultwindowmanager-for-remote-desktop/9575)
- [Wiki Reference](https://nixos.wiki/wiki/Remote_Desktop#RDP)


### Nix Shell Environments

### VS Code Dev Containers

## Fallback: Windows VM with RDP

If all else fails, I can at least for time's sake set up a Windows VM and enable RDP to that.