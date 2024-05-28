---
tags:
  - software-development
  - docker
  - wsl
  - productivity
  - windows
  - tooling
---
After over a decade as a professional software developer, I still use Windows as my primary operating system. Despite trying many Linux distros, and even an Apple 🫢 Macbook, I consistently return to Windows as my daily driver.

Quick caveat, I love Linux (specifically Ubuntu), just not for a daily work station. 

> [!note] This isn't another debate on what's best, but a list of the things that I use to make Windows excellent for productivity

I'll keep the *why* short, there's enough posts out there debating such. 
For me, it comes down to first class support for most software, primarily
- Microsoft Office
- Video Games

# The List

## Productivity 📑

### [Windows Clipboard History](https://support.microsoft.com/en-au/windows/clipboard-in-windows-c436501e-985d-1c8d-97ea-fe46ddf338c6)

Baked in to Windows. Use `Win + V` instead of `Ctrl + V` to paste and you'll be able to paste from a list of what has been on your clipboard recently.
### [Obsidian](https://obsidian.md/)

I'm using this right now for this digital garden. This my second brain, I take it everywhere with me.
### [PowerToys](https://learn.microsoft.com/en-us/windows/powertoys/)

Specifically, I get the most use out of the [FancyZones Utility](https://learn.microsoft.com/en-us/windows/powertoys/fancyzones) for quick and easy window snapping.
Combine this with the [[#PowerToys]] tool for window organisation for ultimate organisation.

There are a heap of useful tools in the PowerToys kit, I highly recommend checking them all out.
More I use include [Mouse without Borders](https://learn.microsoft.com/en-us/windows/powertoys/mouse-without-borders) and [Power Rename](https://learn.microsoft.com/en-au/windows/powertoys/powerrename)
### [Virtual Desktops](https://support.microsoft.com/en-au/windows/multiple-desktops-in-windows-36f52e38-5b4a-557b-2ff9-e1a60c976434)

This one is baked in to Windows.
I set up one virtual desktop per active workstream. 
Typically, my first Virtutal Desktop (VD) houses email & chat apps, Spotify, and general purpose top level stuff. 
Then, I'll have one VD for every project workstream I'm involved in. 
Use in conjunction with [[#PowerToys]] for ultimate productivity.

>`Ctrl + Win + <-` Quick Switch VD Left
>`Ctrl + Win + ->` Quick Switch VD Right
>`Win + Tab` Like Alt-Tab but for VD's.
## SysAdmin 💽

### [Chocolatey](https://chocolatey.org/install)

A package manager for Windows. Like `brew` for Mac, or `apt-get` for Ubuntu.
A developer/sysadmin dream for quickly installing software from reputable download sources.
### [Docker Desktop](https://www.docker.com/products/docker-desktop/) and [Docker Compose](https://docs.docker.com/compose/)

Containers changed the way developers build software, plain and simple. I have seldom used Virtual Machines since the popularization of Docker. 
### [WSL2](https://learn.microsoft.com/en-us/windows/wsl/about#what-is-wsl-2) + [Ubuntu for Windows](https://ubuntu.com/desktop/wsl)

Linux is awesome, despite being a Windows user there are a lot of reasons to love it. This is currently the best way to bring Linux benefits to Windows. 
There are some known issues, currently [this one is my biggest gripe](https://github.com/microsoft/WSL/issues/4197)
## Dev Tools 🧑‍💻

### [Insomnia](https://insomnia.rest/)

My current tool of choice for HTTP API testing

### [Jetbrains All Products Pack](https://www.jetbrains.com/all/)

I love programming, but I value my time. I value this product pack because I get an incredible developer experience guaranteed across all of the development workflows I use. 

If you're a software polyglot, give this a try. From this pack, I actively use:
- IntelliJ Ultimate
- Webstorm
- Rider
- DataSpell
- RustRover

I have each configured with mostly the same settings, but slight colouring nuance so I instantly *feel* which environment I'm working with based purely on the colour scheme of the IDE. 
I use Settings Sync, built in, to backup my IDE settings to Jetbrains cloud so that the inevitable next time I format Windows I have all my settings right back.

