---
created: 2025-08-17T08:02
updated: 2025-08-19T11:34
---
# Resources
- https://crates.io/crates/age-plugin-yubikey/0.3.3
- https://github.com/getsops/sops
- https://developers.yubico.com/PIV/Introduction/Certificate_slots.html
# Objective
I want to use my redundant [[Redundant Yubikey Setup - PIV|Yubikey Setup]] to digitally sign code files. Below is a list of what I managed.

Note that with my yubikey setup, I can sops+age encrypt/decrypt any file with any of the four yubikey devices.

- Must Haves:
	- ✅ Able to directly sign files using Yubikey, where the private key never leaves the Yubikey hardware device
	- ✅ Same code-signing key available for use across redundant set of hardware keys, for redundancy
- Nice to Haves
	- ✅ Use private key directly to sign files, without yubikey
		- ✅ Private key MUST stay encrypted throughout this process
		- ✅ Private key, and cert stay on yubikey device, should I ever need to sign from a device I don't own (unlikely though)
	- ✅ Pave foundation for ancillary Yubikey PIV slots for other uses
		- SSH identity validation
		- Git commit signing 
- Sacrifices
	- In order for multiple Yubikeys to share the same signing key/cert pair, minor sacrifices had to be made
		- The private key used for signing was generated using my terminal
			- This is less secure than generating it directly on the yubikey and keeping it there (but then they can't share)
		- I kept the private key encrypted every time I touched it in terminal
			- I exclusively handled it via stdio, never to disk or clipboard or temp-filesystems
			- I try only to use the yubikeys for signing, avoiding touching the on-disk encrypted private key wherever possible
		- I want to back up the signing cert. I have it saved to a cloud location I won't specify.
		- It costs a hefty sum to have a signing certificate validated by a certificate authority, it would suck to lose it.
		- I wipe/reset my devices often, so  I need to be able to restore it
		- I need to use it on my laptop, or my desktop, because I write/build software on both
# Getting Started
- Requires `openssl` package to be installed
- Requires a valid `sops` encryption setup already working
- Assumes yubikey + sops configuration & shell helpers in place from [[Redundant Yubikey Setup - PIV]]
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
## Generate Encrypted Private Key
#### Generate private key straight into sops encrypted file
Going straight to encrypted sops file keeps the private key from ever touching disk/clipboard
```bash
openssl genrsa 4096 | sops -e /dev/stdin > codesign-key.enc
```
#### Unlock yubikey pin by decrypting the file once
Next steps don't work well with unlocking the yubikey pin, do it once here and as long as the policy doesn't need pin every time we're fine.
Note, yubikey touch "always" policy still works, it's just the pin that has issues in following steps
```bash
sops -d codesign-key.enc >/dev/null 
```
## Generate Certificate Signing Request (CSR)
Following commands assume there is a local config file like so:
```bash
# ./codesign-req.csr

[req]
prompt = no
distinguished_name = req_distinguished_name
req_extensions = v3_req

[req_distinguished_name]
C = US
ST = Illinois
L = Chicago
O = Sean Missingham
OU = Software Development
CN = Sean Missingham
emailAddress = sean@missingham.com

[v3_req]
keyUsage = digitalSignature
extendedKeyUsage = codeSigning
```
#### Generate Certificate Signing Request (CSR)
If this asks for the yubikey pin, cancel and rerun the above before retrying
```bash
sops -d codesign-key.enc | openssl req -new \
  -key /dev/stdin \
  -config codesign-req.conf \
  -out codesign-req.csr
```
#### Verify the CSR generated successfully
```bash
openssl req -in codesign-req.csr -text -noout
```

# Optional: Generate Self Signed Cert 
Might be useful to sign before the CA cert is acquired. 
To generate a self signed certificate, follow this instruction then jump to "saving the cert", noting the different out file name.
## Generate the Signing Cert
```bash
sops -d codesign-key.enc | openssl x509 -req \
  -in codesign-req.csr \
  -signkey /dev/stdin \
  -out codesign-self.crt \
  -days 365
```
## Generate the Public Key from Signing Cert
```bash
openssl x509 \
  -in codesign-self.crt \
  -pubkey \
  -noout \
  >codesign-self.pub
```
## Optional: Print the pubkey from Yubikey to crosscheck
```bash
ykman piv keys export 9c -
```
# Order Signing Cert from Certificate Authority (CA)
https://www.sectigo.com/ssl-certificates-tls/code-signing
## Submit to CA
- Fill in CA signing info as was configured in local csr req conf.
- Be ready to provide proof of address and identity
## Save back signed cert
- Save the signed cert file and public key to same directory as other codesign-* artifacts
- For consistency with below commands, use following names if desired
	- `codesign-ca.crt` - The CA signing certificate
	- `codesign-ca.pub` - The public key provided alongside CA cert
# Optional: Save Key & Cert to Yubikey Slot 9c
## Push private key to yubikey signing slot 9c
Decrypts the file and pipes it over stdout.
Again, the private key never touches disk.
```bash
# Now we can decrypt it and send straight to ykman
sops -d codesign-key.enc | ykman piv keys import 9c /dev/stdin
```
## Push signed certificate to slot 9c
```bash
ykman piv certificates import 9c codesign-ca.crt
```
# Signing
## Signing with the Yubikey slot 9c (Preferred)
Signing this way keeps the private key securely contained on the yubikey instead of decrypting it into stdio or a local file
```bash
yubico-piv-tool \
  -a verify-pin \
  --sign \
  -s 9c \
  -H SHA512 \
  -A RSA4096 \
  -i somefile.txt \
  -o somefile.sig
```
## Signing with the encrypted file
```bash
sops -d codesign-key.enc | openssl dgst \
  -sha512 \
  -sign /dev/stdin \
  -out "somfile.txt.sig" \
  "somefile.txt"
```
## Validate Signed File
```bash
openssl dgst \
  -sha512 \
  -verify \
  codesign-ca.pub \
  -signature "somefile.txt.sig" \
  "somefile.txt"
```
# Other Extras
## Generate PubKey from Yubikey
Assuming the yubikey already has cert and private key, you can generate the pubkey from there
```bash
openssl dgst \
  -sha512 \
  -verify pubkey.pem \
  -signature somefile.sig \
  -binary somefile.txt
```