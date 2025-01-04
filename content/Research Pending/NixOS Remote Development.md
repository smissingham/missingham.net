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


# Technology Notes

### Linux Remote Desktop Options

My top preference would be to have a remote desktop connection to my NixOS host. 
Generally speaking, this looks to be challenging. NixOS + KDE Plasma6 + Wayland + Remote Desktop doesn't have a lot of resounding successful notes online. My notes below.

NixOS Wiki Reference: https://nixos.wiki/wiki/Remote_Desktop
___
#### Option 1: KRDP
> [!failure] No-go. Throws errors in authentication, couldn't remedy

It appears there's a KDE Plasma native RDP service in nix packages: [kdePackages.krdp](https://search.nixos.org/packages?channel=24.11&type=packages&query=kdePackages.krdp)

After installation and setup, I try to connect from Windows but get an error
> [!error] Because of a protocol error, this session will be disconnected.

I see the following in system logs on the host machine
![[Pasted image 20250103164125.png]]

Digging through forums suggests there's a necessary dependency called `freerdp` to be installed. Tried installing both `freerdp` and `freerdp3` but no help there.
More digging suggests it's an issue with the implementation of credential sharing within KRDP. Many people reporting same issue with no fix. 

Next option...

___
#### Option 2: [XRDP](https://nixos.wiki/wiki/Remote_Desktop#RDP)
> [!warning] No go. Can't even finish nix-rebuild with it enabled

Looks like it might be possible to get a plasma DE running via xRDP
- [Discourse Example](https://discourse.nixos.org/t/how-to-configure-services-xrdp-defaultwindowmanager-for-remote-desktop/9575)

Even if I got this working, it would be using the X windowing system, not Wayland which would leave me unable to hot load the live user environment, which is my goal. 
I may come back to this option, but for now, trying the next thing.

___
#### Option 3: [Sunshine](https://github.com/LizardByte/Sunshine) + [Moonlight](https://github.com/moonlight-stream/moonlight-qt)
> [!result] Not yet tried

Looks very complex to set up and use, but is probably highly performant given that it's intended for game streaming
___
#### Option 4: [Rustdesk](https://rustdesk.com/)
> [!failure] No-go. Seems like Wayland + KDE6 not supported

Nixpkgs has two available packages
- `rustdesk` - a gui, with all the needful features to run rustdesk remote
- `rustdesk-server` - a relay server for ID relay, not to be confused with a headless backend 

Rustdesk client throws error on connect:
> [!bug] Login Error. Failed to create capturer.

System logs show the following error, then a massive rust stack trace dump:
![[Pasted image 20250103174037.png]]
___


### Nix Shell Environments

### VS Code Dev Containers

## Fallback: Windows VM with RDP

If all else fails, I can at least for time's sake set up a Windows VM and enable RDP to that.