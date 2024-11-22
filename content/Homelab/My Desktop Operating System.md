I've been a computer power-user for decades now, I've used so many operating systems at a depth more than most.

I've extensively used:
- MacOS (yuck)
- Windows Desktop Pro (95, 2000, Windows 7, 8, 10, 11 etc.) ***- my previous daily driver***
- Windows Server (2008, 2010, 2012, 2016 etc.)
- Ubuntu Desktop
- Linux Mint
- Ubuntu Server 
- CentOS

The greatest problem I have with my daily-driver desktop running Windows is that I have to format & reinstall it quarterly.

Why? Because I install so many SDK versions and so much general use software that inevitably it ends up bricking itself or slowing down to an intolerable level of performance.
Or the beloved Windows Update sends down a driver update and I spontaneously start getting the blue screen of death.

I've tried switching to Linux as a daily driver many times. I've long wanted it for the sake of reliability, but always found the driver & configuration setup takes *SO* much time that if it ever breaks by way of an update or new SDK and I have to reinstall, I'm signing up for another 200hrs of reconfiguring it to get back to where I was.

If only there was an operating system where I could fearlessly install as much software as I want, and if anything were to break I could just roll back to the way it was before without any lingering consequences.
Better yet, I'd love to have that desktop configuration declared in a configuration file that I can check in to source control, so that it is a permanently reproducible environment on any new PC that I buy or build in the future.

As it turns out, there is a hot project for exactly this. It brings the *Infrastructure-as-Code* approach from cloud engineering and applies it to a Linux Desktop environment.

I've been using it since August 2024, and it's awesome. It's called 
# [[NixOS]]

## [Here is my config](https://github.com/smissingham-nixos-config)