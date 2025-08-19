---
created: 2025-08-18T18:47
updated: 2025-08-18T19:34
---
"Secure Operations", a cli tool for securely managing secrets, with nice compatibility for structured files like yaml, json etc.

//TODO: I owe a full writeup here on how I'm using sops with age + [[Yubikey Setup - PIV]] to encrypt/decrypt files where the private keys have never once been printed to console, saved to disk, or copied to clipboard...

TLDR for now:
- Bought 4 yubikeys for redundancy
- Generate age keys directly on each yubikey
- Configure .sops.yaml to use any/all of the age keys on the redundant yubikeys
- Use any yubikey to directly encrypt the stdout of some sensitive cli output
	- Eg, [[Individual Code Signing Cert, Encrypted with Sops|Here I generated a code signing private key and piped it straight to a sops encrypted file]]
	- Eg [[Yubikey Setup - PIV, Here I sops-decrypt a single code-signing key and pipe it straight to yubikey slots]]
- I also use sops to manage secrets in my nix config, link to come