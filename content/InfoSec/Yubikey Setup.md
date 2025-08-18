---
created: 2025-08-17T09:11
updated: 2025-08-18T08:48
---
//TODO: This doc is a work in progress, for now I'm jotting top notes on what I've got working

- Using `age-plugin-yubikey` to put unique age keys straight onto yubikeys in retired slot 1 (slot 82)
```bash
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
```
- Created helper shell fn to use any of 4 redundant yubikeys for en/decrypt
```bash
YK_SOPS_CFG="/path/to/.sops.yaml"

yk() {
  # Unset existing age files so we ignore other sops age configs
  unset SOPS_AGE_KEY_FILE

  # Capture the age key info from the plugged in yubikey
  SOPS_AGE_KEY="$(age-plugin-yubikey -i)"

  # Save it to env for sops cli to detect
  export SOPS_AGE_KEY

  # Set the editor to use regular vim for added safety from neovim plugins
  export SOPS_EDITOR=vim

  # Run sops CLI, take in remainder of user input args
  sops --config "$YK_SOPS_CFG" "$@"
}
``` 



Reference:
PIV Slots: https://developers.yubico.com/PIV/Introduction/Certificate_slots.html