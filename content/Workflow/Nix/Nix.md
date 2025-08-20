---
created: 2024-12-28T11:04
updated: 2025-08-19T15:59
---
# Overview
"Nix" can mean a lot of things. It's essentially an ecosystem of associated tools. Here's the digest:
## Nix
- **Nix** itself is a programming language focused exclusively on systems configuration.
- It is very terse, and poorly documented, but it solves its focus purpose **very** well.
## Nix Modules
- **Nix "Modules"** are simply bundles of nix code, which can be imported and used by other nix configurations.
- Many of the below Nix services/tools are nix modules.
- Think of these as nothing more than an importable set of helper functions
## Nix Packages
- **Nix Packages** (*nixpkgs*) is a repository of software, built and distributed using the Nix language.
- It is an alternative to other well known repositories such as Arch's AUR, or Mac Homebrew
- Nix packages is currently the single largest repository of software in existence, by a significant amount
## Nix OS
- **Nix OS** is a linux distribution, built on top of the Nix Packages repository
- It uses the Nix language to **declaratively** define system configuration
	- NixOS does not permit *imperative* configuration like other OS'. 
		- This can be frustrating at times, but it pays in spades if you value reproducibility and confidence of current state.
## Nix Darwin
- **Nix Darwin** is a Nix module, which allows configuration of MacOS systems using the Nix language and package repository
- It enables Mac users to install packages from Nixpkgs instead of Homebrew or the Mac App Store
- Nix darwin works well as a Homebrew configuration tool, allowing you to declaratively configure software installed from the homebrew repository
	- This is useful because many mac apps are either unavailable on nixpkgs, or are stale compared to the more up-to-date homebrew options
## Nix Home Manager
- **Home Manager** is a Nix module which enables deep configuration of user home environments with Nix.
- It can be used without Nix Darwin or Nix OS, you don't *have* to use those for system configuration if you just want to manage your home config with nix
	- Realistically, this is not common. You'll most often find Home Manager used in conjunction with Nix Darwin or Nix OS
- This module is where you manage just about anything that installs into or configures your **user** space.
	- You can install applications into user space instead of system space (available only to that user, not the whole system)
	- You can set user-activation settings, so that on login of a particular user, settings are loaded and applied
		- For example, a user terminal application loads with colour preferences and ENV vars loaded according to that user's preferences
## Nix Flakes
- **Nix Flakes** are an *experimental* feature of the nix language / ecosystem. Realistically, they're pervasive and all-but official at this point.
- Essentially, they allow people to create full self contained bundles of nix configuration, which can be reused on any nix system.
	- For example, you could bundle a NeoVim configuration along with required software packages needed to support that config as I did below.
- Nix flakes are most often used for creating a cross-platform wholistic nix system configuration, comprising assets for NixOS, Darwin, Home Manager etc. and making it portable enough to govern many nix system configs.
## Nix Dev Shells
- **Nix Dev Shells** are a feature of Nix Flakes. They allow you to define a bundle of packages which when run, will run in a temporary shell.
- This enables a nix system to work on any project, with any software dependencies, without installing those packages directly onto the host.
	- This means you can be a polyglot developer working on many projects, each using many versions of binaries like node, python, rust etc. and never worry about version conflicts with your currently installed SDK. Each project gets its own local SDK configuration
- These are particularly powerful when combined with **direnv**, which can automatically start your nix shell when you open a directory containing a nix shell
## Bonus: Nixpacks
- **Nixpacks** is less commonly known, but is becoming more popular as a way to create docker images using Nix under the hood
- This enables developers to create OCI compliant container images, but do so with the Nix language and nixpkgs software repository
	- This means you get all of the benefits of a declarative software packaging process, and trusted software packages that are more protected from supply chain attacks, but still leverage the maturity of massive container runtimes like docker/podman/kubernetes
	- Personally, I haven't used this yet but next time I have to build a docker image I intend to try it out, I love the concept
# My Usage
Just about all of my nix configuration mentioned below, I keep in a git repository:
	[Sean Missingham's Nix Configuration](https://github.com/smissingham/nix)
## Home Desktop
My home desktop runs on NixOS. I use this desktop as a semi-daily driver, for the following:
	-[[Self Hosting Services| Self Hosting Services]]
	- Software Development
	- General Daily Use
	- Video games (yes, seriously)
		- Thanks to Valve Proton, Linux gaming for just about every major game without anticheat works flawlessly
		- It's actually the best Linux distro I've ever used for gaming because I can declaratively pin drivers

I jump around between window managers / desktop environments,
Most often I use KDE Plasma because it has best compatibility with games on Wayland. 
I use Hyprland occasionally, but most of my real work happens on my Macbook where I use aerospace so I don't value a tiling WM on my desktop as much as I value good support for video/graphics.
## Macbook
I use Nix Darwin to manage my Macbook system configuration.
- All of my MacOS settings are declaratively managed with Nix. 
	- I do my best to never manually change a setting, this keeps my mac setup 100% known and reproducible
- All of my tech tool configurations (mostly for software dev) live in my git repo, so I get an identical experience on Mac as on Linux, and anywhere else.
## Dev Flakes
I have a growing library of templates which let me run temporary development shells using nix. 

This saves me from installing SDK's and runtimes directly on the host, and lets me run specific versions of those dev dependencies unique to every project.

See more of those here: https://github.com/smissingham/nix/tree/main/flakes/templates

I also have my personal NeoVim configuration wrapped into a Nix Flake
- This allows me to run my personalised software dev environment on any Nix system with all software/package dependencies included.
- I don't use NixVim, that was too hard. I use Lazy.nvim, the well beloved NeoVim plugin manager
	- This way, my NeoVim is like any other common distribution, but I bundle it together with software packages using nix
# Resources
- Nix OS (Linux operating system, built on the Nix package manager and the immutability philosophy)
	- https://nixos.org/
- Nix Darwin (System configuration for MacOS, using Nix)
	- https://github.com/nix-darwin/
- Home Manager (A Nix module, focused on providing configuration utilities for user space)
	- https://nix-community.github.io/home-manager/
- Nix Packages (Searchable database of nix packages)
	- https://search.nixos.org/packages
- MyNixOS (Better searchable database, includes darwin & home manager, don't be fooled by the name)
	- https://mynixos.com/
- Nix Flake Templates - a community set of dev flakes
	- https://github.com/NixOS/templates