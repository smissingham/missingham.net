---
created: 2025-08-18T18:47
updated: 2025-08-19T11:40
---
# What Is SOPS
"Secret Operations" (SOPS) is a cli tool for securely managing secrets, with nice compatibility for structured files like yaml, json etc.
It encrypts only the *values* of configuration files, while leaving the *keys*/names of values *human readable*.
This means you can inspect a sops encrypted file and see what secrets it contains, but you cannot get the values of those secrets.

Sops itself is not the encryption mechanism, its just the provider of the intelligent file-handling piece which encrypts parts of the file and leaves other parts human readable.

Sops is used in conjunction with actual encryption backends, such as **age** (which I use), **PGP/GPG** and others. 
These backends actually do the encryption/decryption, while sops provides the file-handling smarts.
# How I Use SOPS
Firstly, I use sops with the [Age](https://github.com/FiloSottile/age) file encryption backend. For the rest of this document, when I say "sops", know that I'm using it with age.
## General File Encryption
First and foremost, I use sops+age for all general file encryption, even if it's a regular text file and not some config file.
Most online guides show how to encrypt an existing file and put the contents back to a file, but personally I prefer to work directly with *stdio*, this way you can prevent sensitive content ever touching the disk/clipboard.

The below example takes a newly generated private key (sensitive content) and pipes it through stdin to sops, which write the encrypted file to disk.
```bash
openssl genrsa 4096 | sops -e /dev/stdin > private-key.enc
```
- This way, the private key was never printed to console, nor disk/clipboard. 
- At most, it existed in a kernel memory buffer for a brief moment
	- And, could have only been intercepted by a bad actor actively watching this terminal session.
	
To my knowledge, this is likely even more secure than using an encrypted /tmpfs, and if combined with an air-gapped device and no needless terminal plugins, this is about as secure as you can get with sensitive file-contents handling.

It can work in reverse as well, for instance in the below we can decrypt that private key and use it to sign a file. Again, never actually printing the key to console or writing it to disk/clipboard.
```bash
sops -d codesign-key.enc | openssl dgst \
  -sha512 \
  -sign /dev/stdin \
  -out "somefile.txt.sig" \
  "somefile.txt"
```
### Bonus: With Yubikeys
Check out the below link, where I combine this approach with Yubikeys to achieve a redundant set of yubikeys all capable of code-signing with the same private key, which has never once been seen by myself or my computer's disk:
#### [[Encrypted Individual Code Signing Cert With Yubikeys]]
## Nix Secrets
My first use for sops was in managing secrets in my [Nix](https://github.com/smissingham/nix) systems configuration. I wanted to use secrets like OPENAPI_API keys in my nix configuration without exposing them to the nix build process and without them ending up in plain text in the /nix/store/.

To do so, I implemented a [Nix Module](https://github.com/smissingham/nix/blob/main/modules/shared/workflow/sops.nix) where I can toggle-on the use of [[#Sops-nix]], and if present I can use that to reference sops + age encrypted secrets without actually decrypting them until they're needed/used.

I then implemented a [cool home-manager activation](https://github.com/smissingham/nix/blob/55922fc0edfefe6d3fe0b4ccd3368b8109321ee5/modules/shared/home.nix#L52) feature which pulls all of my auto-exported secrets into my terminal session when I start zsh.
Note that this means every zsh session has these secrets in ENV, so a malicious script/application could access them. So, I only do this for secrets where the convenience of always having them outweighs the damage potential if they were to be stolen. 
	For example, my LLM provider api keys are needed by many terminal apps I use, and are all spend-capped anyway.

Here's how I manage secrets that are auto-exported vs the "other" (not auto exported, but still needed somewhere by nix) in my nix profile settings.
```bash
# $NIX_CONFIG_HOME/profiles/myusername/default.nix

# ..... Other Main User Config ..... #
# ..... Sops Related Config ..... #

sops = {
	getPath = getSopsPath;
	ageKeyFileName = "keys.txt";
	secretsFileName = "secrets.yaml";
	secrets = {
	
	  # SECURITY NOTE: These are auto-sourced into user shell env.
	  # Add nothing here that you might not want stolen by a malicious CLI app
	  autoExport = {
		ANTHROPIC_API_KEY = { };
		LITELLM_API_KEY = { };
		LITELLM_API_URL = { };
		MORPH_API_KEY = { };
		OPENROUTER_API_KEY = { };
		OPENROUTER_API_URL = { };
	  };
	
	  # Put secrets here that are needed in nix but not auto-exported to env
	  other = {
	  };
	};
};

# ..... Helper Functions ..... #
isDarwin = { }: builtins.match ".*-darwin" builtins.currentSystem != null;
getHome = { }: "${(if isDarwin { } then "/Users" else "/home")}/${username}";
getNixConfPath = { }: "${(getHome { })}/Documents/Nix";
getProfilePath = { }: "${(getNixConfPath { })}/profiles/${username}";
getSopsPath = { }: "${(getProfilePath { })}/private/sops";
```
### Future Improvements for Nix Sops Secrets
Currently, I use age key files stored on my nix hosts in order to encrypt/decrypt these secrets with sops. I'm ruminating on how I could/should use my [[Redundant Yubikey Setup - PIV]] to protect these secrets, but if I were to make that the only available option I would have to be physically present to run my nix rebuild which isn't always the case for my home server. I'll get this worked out soon, for now I'm happy...
# Resources
## Sops
 https://github.com/getsops/sops
## Sops-nix
 https://github.com/Mic92/sops-nix
## Age
https://github.com/FiloSottile/age