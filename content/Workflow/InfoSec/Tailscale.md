---
created: 2025-08-19T14:50
updated: 2025-08-19T14:57
---
Tailscale is a Virtual Private Network (VPN) service provider. There is a noteworthy open source backend called [Headscale](https://github.com/juanfont/headscale) which allows you to self-host the tailscale control plane, but for my personal use I much prefer using the real tailscale service. I have never had to worry about privacy, nor cost, at least not yet.

This service architecture allows me to adopt a [[Zero Trust]] mentality as much as possible, where I assume there is always potential for breach of access to self hosted services, and so I provide the least amount of access possible in order to meet requirements.

I use this mostly for safeguarding access to my [[Self Hosting Services | Self Hosted Services]]. Even though those services are each safeguarded with SSL and access credentials, they could in theory be breached if they were publicly accessible and so I only expose them to my "tailnet" (my private Tailscale network)

I am also able to provide ad-hoc access to those services for my friends, by sharing access to resources within my Tailnet to a friend's Tailnet. It just requires them to sign up for a free Tailscale account, and then I can share access to their devices on their Tailnet.