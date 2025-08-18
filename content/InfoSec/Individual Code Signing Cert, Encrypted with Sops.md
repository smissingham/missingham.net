---
created: 2025-08-17T08:02
updated: 2025-08-18T12:25
---
# Getting Started
- Requires `openssl` package to be installed
- Requires a valid `sops` encryption setup already working
- Assumes yubikey + sops configuration & shell helpers in place from [[Yubikey Setup]]
# Generate Private Key & CSR
## Navigate to a directory where keys will be stored
```bash
mkdir -p ~/.certs/individual
cd ~/.certs/individual
```
## Set Sops Config to Use Yubikeys
In my case, the below alias runs a script that sets all related sops config vars to use a custom yubikey sops/age configuration instead of the env default. 
All subsequent sops commands will be affected until terminal restart
```bash
yk-sops
```
## Generate Private Key and CSR
#### Generate private key straight into sops encrypted file
Going straight to encrypted sops file keeps the private key from ever touching disk/clipboard
```bash
openssl genrsa 4096 | sops -e code-signing-key.pem.enc
```
#### Unlock yubikey pin by decrypting the file once
Next steps don't work well with unlocking the yubikey pin, do it once here and as long as the policy doesn't need pin every time we're fine.
Note, yubikey touch "always" policy still works, it's just the pin that has issues in following steps
```bash
sops -d code-signing-key.pem.enc >/dev/null 
```
#### Optional: Push private key to yubikey
Decrypts the file and pipes it over stdout.
Again, the private key never touches disk.
```bash
# Now we can decrypt it and send straight to ykman
sops -d code-signing-key.pem.enc | ykman piv keys import 9c /dev/stdin
```
#### Generate Certificate Signing Request (CSR) using private key
```bash
openssl req -new -key code-signing-key.pem -out code-signing.csr
```
#### Verify the CSR generated successfully
```bash
openssl req -in code-signing.csr -text -noout | grep "Public-Key"
```

## Optionally Encrypt the Private Key with Sops
```bash
sop
```

# Order Signing Cert from Certificate Authority (CA)
