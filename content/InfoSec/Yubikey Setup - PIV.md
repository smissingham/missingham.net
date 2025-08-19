---
created: 2025-08-17T09:11
updated: 2025-08-18T18:47
---
This page is exclusively about my use case with PIV (Personal Identity Verification)
Yubikey's do a lot more than this (PIV, FIDO/U2F, OATH and more.)
I'll likely do write-ups on those soon.
# My Objectives 
I set out to set up a redundant set of yubikeys for two primary, and some bonus purposes:
- Primary:
	- Use as private key storage for [[Sops]] encrypt/decrypt
	- Use for signing software with proof id ID
- Secondary:
	- Git & other signing
	- SSH authentication

Yubikey supports all of these things via the PIV protocol.
Note, yubikey's store PIV key/cert pairs in "slots", which are documented [here]( https://developers.yubico.com/PIV/Introduction/Certificate_slots.html)
# Resources
- [[Individual Code Signing Cert, Encrypted with Sops]]
- https://crates.io/crates/age-plugin-yubikey/0.3.3
- https://github.com/getsops/sops
- https://developers.yubico.com/PIV/Introduction/Certificate_slots.html
# Bash Scripts
## YK Helpers
Full of yubikey related shorthand helpers. Source this into env to use it
```bash
PRIVATE_DIR="/path/to/dir/containing/private/files"
YK_SOPS_DIR="/path/to/dir/containing/yubikey/sops/configs"

yk-getserials() {
  ykman list | sed "s/.* //"
}

yk-getageids() {
  local serials=$(yk-getserials)
  while IFS= read -r serial; do
    find "$YK_SOPS_DIR/agekeys" -name "*${serial}*" -exec cat {} \;
  done <<<"$serials"
}

# Unsets & Overrides existing sops env vars to use yubikey for current session
# All sops/age config will use these until terminal exit
yk-sops() {
  # Unset existing sops config env vars
  unset SOPS_CONFIG
  unset SOPS_EDITOR
  unset SOPS_AGE_KEY
  unset SOPS_AGE_KEY_FILE

  # Override sops config yaml file location
  SOPS_CONFIG="$YK_SOPS_DIR/.sops.yaml"
  export SOPS_CONFIG

  # Capture the age key info from the plugged in yubikey
  SOPS_AGE_KEY="$(yk-getageids)" &>/dev/null
  export SOPS_AGE_KEY

  # Set the editor to use regular vim for added safety from neovim plugins
  export SOPS_EDITOR=vim
}

YK_SIG_SLOT="9c"
SIG_FILES_DIR="$PRIVATE_DIR/files"
SIG_CRT_CA="$SIG_FILES_DIR/codesign-self.crt"
SIG_KEY_PUB="$SIG_FILES_DIR/codesign-self.pub"
SIG_KEY_ENC="$SIG_FILES_DIR/codesign-key.enc"

yk-push-signing() {
  # push signing certificate
  echo "Clearing $YK_SIG_SLOT certificate from yubikey..."
  ykman piv certificates delete $YK_SIG_SLOT

  echo "Copying $YK_SIG_SLOT certificate to yubikey..."
  ykman piv certificates import $YK_SIG_SLOT "$SIG_CRT_CA"

  # decrypt once to /dev/null to trigger yk pin prompt which disagrees with next step
  sops -d "$SIG_KEY_ENC" >/dev/null

  # push private key
  echo "Copying private key to yubikey..."
  sops -d "$SIG_KEY_ENC" |
    ykman piv keys import $YK_SIG_SLOT /dev/stdin
}

yk-sign() {
  SIGN_FILE="$1"

  echo "Signing file with yubikey..."
  yubico-piv-tool \
    -a verify-pin \
    --sign \
    -s $YK_SIG_SLOT \
    -H SHA512 \
    -A RSA4096 \
    -i "$SIGN_FILE" \
    -o "$SIGN_FILE.yk.sig"

  echo
  echo "Validating yubikey file signature"
  openssl dgst \
    -sha512 \
    -verify \
    "$SIG_KEY_PUB" \
    -signature "$SIGN_FILE.yk.sig" \
    "$SIGN_FILE"
}
```
## Yubikey PIV Setup
A run-once script that helps reset/configure the plugged in yubikey with age/sops
```bash
#!/bin/bash
# Print Info to Screen
ykman --version && echo
ykman list && echo
ykman info && echo
ykman piv info && echo

SERIAL=$(yk-getserials | tail -1)

# Offer full factory reset of Yubikey PIV
read -p "Factory Reset Yubikey PIV Config? (y/N): " -n 1 -r
echo
[[ $REPLY =~ ^[Yy]$ ]] && ykman piv reset && echo "Reset complete"
echo

# Offer credential resetting
read -p "Set new credentials? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "Updating Management key (PIN: 123456 if default)"
  #ykman piv access change-management-key --generate --protect
  ykman piv access change-management-key -a TDES --protect
  echo

  echo "Updating PIN (Current: 123456 if default)"
  ykman piv access change-pin
  echo

  echo "Updating PUK (Current: 12345678 if default)"
  ykman piv access change-puk
  echo
fi

# Configure retired slot 1 to hold age identity for sops encryption
read -p "Generate ECCP256 Age Key in Spare Slot (82)? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  age-plugin-yubikey \
    --generate \
    --serial $SERIAL \
    --slot 1 \
    --name SOPS_ENCRYPTION \
    --pin-policy once \
    --touch-policy always

  mkdir agekeys
  age-plugin-yubikey \
    -i \
    --serial $SERIAL \
    --slot 1 \
    >"agekeys/key_info_$SERIAL.txt"

  cat agekeys/* >age_keys.txt
fi

# ## NOT USING BELOW SLOTS CURRENTLY ##
# SLOTS=(9a 9c 9d)
# PURPOSES=("PIV Auth" "Digital Signature" "Key Management")
# ALGOS=(RSA4096 RSA4096 ECCP256)
#
# for i in "${!SLOTS[@]}"; do
#   SLOT=${SLOTS[$i]}
#   PURPOSE=${PURPOSES[$i]}
#   ALGO=${ALGOS[$i]}
#
#   read -p "Generate key & cert for $PURPOSE, slot $SLOT? (y/N):" -n 1 -r
#   echo
#   if [[ $REPLY =~ ^[Yy]$ ]]; then
#     PUBKEY="pubkey-$SERIAL-$SLOT.pem"
#     echo "Generating Keypair with algorithm $ALGO"
#     ykman piv keys generate "$SLOT" --algorithm "$ALGO" "$PUBKEY"
#     echo
#
#     echo "Generating X.509 Signing Certificate from Public Key..."
#     ykman piv certificates generate "$SLOT" "$PUBKEY" --subject "CN=$USER-Yubikey-$SERIAL-$SLOT"
#     echo
#   fi
# done
#
# Final script print and exit
echo "Done, printing info"
ykman piv info
echo "Script finished."
```