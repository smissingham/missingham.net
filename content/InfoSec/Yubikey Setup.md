---
created: 2025-08-17T09:11
updated: 2025-08-17T23:21
---
# Setup PIV with Yubikey CLI Tools
 Note, this is all about using Yubikey for PIV (Personal Identity Verification).
 Yubikey's support many other protocols, which will in future get a space in this doc.
## Getting Started
- Requires [`yubico-piv-tool`](https://developers.yubico.com/yubico-piv-tool/)
	- Available on [Nixpkgs](https://search.nixos.org/packages?show=yubico-piv-tool)
## Resetting the Yubikey
```bash
yubico-piv-tool -a reset
```
## Updating Default Credentials
#### Show the current pin status 
```bash
yubico-piv-tool -a status
```
#### Testing the pin
```bash
yubico-piv-tool -a verify-pin -P 123456
```
- **Default PIV PIN**: `123456`
- **Default PIV PUK**: `12345678`
#### Updating the pin
Note: Can be text, recommended 6-8chars
```bash
yubico-piv-tool -a verify-pin -P 123456 -N 'myNewP!n'
```
#### Updating the puk
This is a reset code if the pin is lost/locked. 
Without setting this, there's no point setting the pin. Max 8 chars again.
```bash
yubico-piv-tool -a change-puk -P '12345678' -N 'myN3wPuk'
```
#### Generate PIV management key
This key is what allows the yubikey device to be reconfigured.
Think of this as the root back door to the device configuration. Keep it on lockdown.
##### Option 1: Random Generation
This option is more secure than the other, but requires safe-keeping of the key as it cannot be reproduced.
```bash
MGMT_KEY=$(openssl rand -hex 24) 
echo $MGMT_KEY
```
##### Option 2: Derived from Password
Less secure, because a password has less entropy than a random key.
More convenient, because the key can be reproduced with the original password.
Keep it on clipboard, you'll need it many times in next steps
```bash
MGMT_KEY=$(echo -n "YourPasswordHere" | openssl dgst -sha256 | cut -d' ' -f2 | head -c 48)
echo $MGMT_KEY
```
#### Apply the new Management Key
```bash
yubico-piv-tool -a set-mgm-key -n "$MGMT_KEY"
```

#### Generate RSA Key Pair in Slot 9a (PIV Auth Slot)
Generates a 4096-bit RSA key pair for PIV authentication. 
```bash
yubico-piv-tool \
  -a generate \
  -s 9a \
  -A RSA4096 \
  -o public_key.pem \
  -k
```
**Outcomes:**
- Private key stored in YubiKey slot 9a (hardware-protected)
- Local file: `public_key.pem` (public key for certificate creation)
- Prompts for management key from prior setup
#### Generate X.509 Identity Certificate for Self Signing
Creates a self-signed X.509 certificate for the RSA key pair. 
This certificate acts as an identity document for the key.
It is required by SOPS or other PIV applications for encryption/decryption operations.
```bash
yubico-piv-tool \
  -a verify-pin \
  -a selfsign-certificate \
  -s 9a \
  -A RSA4096 \
  -P 'YourPin' \
  -S "/CN=Yubikey-5c-SomeUniqueId/" \
  -i public_key.pem \
  -o certificate.pem \
  -k
```
**Outcomes:**
- Certificate stored in YubiKey slot 9a (alongside existing private key)
- Local file: `certificate.pem` (certificate for SOPS configuration)
- Slot 9a now contains both private key and certificate
- Prompts for management key and PIN during execution
#### Save the Certificate to the Yubikey
```bash
yubico-piv-tool \
  -a import-certificate \
  -s 9a \
  -i certificate.pem \
  -k
```

#### Confirm the Certificate is Saved to Yubikey
```bash
yubico-piv-tool -a status \
&& \
yubico-piv-tool -a read-certificate -s 9a
```

#### Set the Yubikey's Touch Policy for this Key
```bash
## TBD
```
#### Keep Generated PEM Files
 `public_key.pem`
	- **What it is:** The public portion of your RSA key pair  
	- **Importance:** Required for any external crypto operations, SSH, TLS, or other tools that need your public key  
	- **Storage:** Keep - many tools expect separate public key files
- `certificate.pem`
	- **What it is:** X.509 certificate containing your public key + identity  
	- **Importance:** Required for certificate-based authentication, SOPS fingerprints, and PKI workflows  
	- **Storage:** Keep - essential for certificate operations and as backup
**Bottom line:** Keep both files. They're small and may be needed for SSH configs, other encryption tools, certificate management, or recreating your setup.
# Optional Extra: Use it with Sops
See [[Configuring Sops Encryption with Yubikeys]]







# UPDATED: Using ykman...

Reset the PIV configuration:
`ykman piv reset`

Set a new management key:
`ykman piv access change-management-key --generate --protect`


## PIV
- 9a - PIV Authentication
	- Algorithm: RSA 4096
	- Purpose: User Authentication
		- SSH login to servers
	- Key Origin: Generated once with software, cloned across yubikeys
- 9c - Digital Signature
	- Algorithm: RSA 4096
	- Purpose: Digital Signing
		- Profession software distribution, requiring serious PIV
	- Generated once with software, cloned across yubikeys
- 9d - Key Management
	- Currently unused
- 9e - Card Authentication
	- Currently unused



age-plugin-yubikey

generates age and stores in retired management key PIV space
https://developers.yubico.com/PIV/Introduction/Certificate_slots.html

SOPS_AGE_KEY_FILE

sops -e -i someFile.txt to encrypt file in place (overwrite)
sops -d someFile.txt to decrypt and print to stdout