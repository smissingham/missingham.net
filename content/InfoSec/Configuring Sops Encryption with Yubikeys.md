---
created: 2025-08-17T10:41
updated: 2025-08-17T11:28
---
Assuming you have already configured Yubikeys according to [[Yubikey Setup]]

#### Confirm Yubikey is Present
```bash
yubico-piv-tool -a list-readers
# or
yubico-piv-tool -a status
```
#### Create a .sops.yaml
```yaml
creation_rules:
	- path_regex: \.(yaml|yml|key|pem|txt|env)$
	piv: "yubikey:serial=YourYubikeySerial"
```

