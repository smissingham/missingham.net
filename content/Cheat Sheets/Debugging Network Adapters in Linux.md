---
created: 2025-01-10T10:01
updated: 2025-02-12T15:23
tags:
  - cheat-sheet
  - linux
  - cli
---
## Increase logging verbosity
`sudo nmcli general logging level DEBUG domains ALL`

Watch logs in:
- `journalctl --system --follow`
- `nmcli monitor`

