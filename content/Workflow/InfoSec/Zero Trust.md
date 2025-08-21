---
created: 2025-08-19T14:57
updated: 2025-08-20T00:15
---
There are lots of online definitions available for zero trust, but here's what's important to me.

"Zero Trust" is a mindset. This way of thinking assumes that **no user, device, or network component should be trusted by default.**

The key principles of zero trust are:
# Never Trust, Always Verify
In essence, wherever possible, every access attempt must be authenticated and authorized.

For example, I ensure this in my [[Self Hosting Services|Self Hosted Services]] by requiring authenticated access to Tailscale and an explicitly shared access privilege, on top of existing login credentials built in to any of those systems.
# Least Privileged Access
Users should be given the absolute minimum amount of access privilege they require for their role/task.

It is often tempting to be lazy and give admin permissions and trust that a user will be respectful, and won't open themselves to security breach. This assumption is how malicious actors gain access to protected resources.
# Assume Breach
This to me is the most important philosophy. Always assume your own devices, and the devices of your users have already been breached. With this in mind, you never want to leave protected resources accessible to a system without re-authentication.

For instance, many people commonly set up file encryption to protect their files at rest. This is a great practice, but often times the private key files required to decrypt those resources are left unencrypted, in plain text, either on the host system or in cloud storage. If your system is breached, a bad actor could access these private keys and use them to decrypt or otherwise gain access to your protected resources.

For this reason, I have adopted a practice wherein I encrypt sensitive files using Yubikeys + passwords, and I never write the private key to disk, or copy it to clipboard, or even print it to screen. At most, I keep sensitive private keys in stdio, where they could only be intercepted by a particularly low-level nasty logger with kernel/memory access. 

To see how I do this for my file encryption needs and access credentials like SSH keys, see the following exampe:

[[Encrypted Individual Code Signing Cert With Yubikeys]]