---
tags:
  - github
  - ssh
  - cli
  - linux
---
- Generate a new SSH key pair using the `ed25519` algorithm, associate it with an email
	- `ssh-keygen -t ed25519 -C "your@email.com"`
- Optional: Set a password in prompt (Enter key to skip)
- Print public key (then copy it to clipboard)
	- `cat ~/.ssh/id_ed25519.pub`
- Paste public key into git remote auth
- Test the SSH connection
	- `ssh -T git@remote.com`

> Important Note:
> You must use git@remote.com origins to use the ssh auth, **not https://**

If you have already cloned a repo using the https:// remote url, then try to `git push origin` you will be asked to authenticate with https. 
You can either change the remote with `git remote set-url origin git@remote.com:username/project.git` or re-clone the repo with ssh auth method to have the remote set automatically