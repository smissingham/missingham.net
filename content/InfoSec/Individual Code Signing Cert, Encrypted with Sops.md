---
created: 2025-08-17T08:02
updated: 2025-08-17T08:44
---
# Getting Started
- Requires `openssl` package to be installed
- Requires a valid `sops` encryption setup already working
# Generate Private Key & CSR
## Navigate to a directory where keys will be stored
```bash
mkdir -p ~/.certs/individual
cd ~/.certs/individual
```
## Generate Private Key and CSR
#### Generate private key straight into sops encrypted file
```bash
openssl genrsa 4096 | sops -e /dev/stdin > code-signing-private-key.pem.enc
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
