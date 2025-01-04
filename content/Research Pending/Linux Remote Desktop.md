---
tags:
  - linux
  - remote-access
---
Since switching from the Windows ecosystem, I've sorely missed RDP.
My Linux distribution + desktop environment is pretty bleeding edge, and generally speaking RDP options of Linux are quite immature by comparison.

Below are my notes while I researched and attempted multiple different remote access options.

My system for reference:
![[Pasted image 20250104124628.png]]



___
#### Option 1: [KRDP](https://invent.kde.org/plasma/krdp)
> [!failure] **Outcome: No Go.** Throws errors in authentication, couldn't remedy

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
> [!warning] **Outcome: No Go.** Can't even finish nix-rebuild with it enabled

Looks like it might be possible to get a plasma DE running via xRDP
- [Discourse Example](https://discourse.nixos.org/t/how-to-configure-services-xrdp-defaultwindowmanager-for-remote-desktop/9575)

Even if I got this working, it would be using the X windowing system, not Wayland which would leave me unable to hot load the live user environment, which is my goal. 
I may come back to this option, but for now, trying the next thing.

___
#### Option 3: [Sunshine](https://github.com/LizardByte/Sunshine) + [Moonlight](https://github.com/moonlight-stream/moonlight-qt)
> [!success] **Outcome: Go.** Working Great!!

[Reddit Tutorial Thread](https://www.reddit.com/r/NixOS/comments/1bq2bx4/beginners_guide_to_sunshine_gamedesktop_streaming/)

Sunshine is actually a game streaming service, intended mostly as an alternative to Nvidia GeForce Now but it also natively supports remote-desktop as a use case.

At first, looked very complex to set up and use according to general internet threads, but then I came across a reddit tutorial. The entirety of that tutorial wasn't necessary for me, but then I found the top commentor's nix module and it was just magic. 

All I had to do was add an auto-start target and it now works magically for me. 

Here's my work in a single commit, note that I bundled sunshine with a "gaming" module: 
https://github.com/smissingham/nixos-config/commit/2ec61a5e2a3f4ce2beede67345c5716d1de6a170

___
#### Option 4: [Rustdesk](https://rustdesk.com/)
> [!failure] **Outcome: No Go.** Seems like Wayland + KDE6 not supported

Nixpkgs has two available packages
- `rustdesk` - a gui, with all the needful features to run rustdesk remote
- `rustdesk-server` - a relay server for ID relay, not to be confused with a headless backend 

Rustdesk client throws error on connect:
> [!bug] Login Error. Failed to create capturer.

System logs show the following error, then a massive rust stack trace dump:
![[Pasted image 20250103174037.png]]
___
