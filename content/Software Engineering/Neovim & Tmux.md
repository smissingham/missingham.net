---
created: 2025-04-25T08:21
updated: 2025-04-25T15:59
---
Dumping ground for my notes as I learn, and configure my own NeoVim.
Herein: mostly shortcuts/how-to notes.

# NeoVim
References: 
- https://nix-community.github.io/nixvim/
- https://dotfyle.com/neovim/plugins/trending
## Navigation
### General Operations
| My Binding | My Verbiage | Default | Description                                         |
| ---------- | ----------- | ------- | --------------------------------------------------- |
| `\s`       | Save        | `:w`    |                                                     |
| `\q`       | Quit        | `:q`    |                                                     |
| `\re`      | Reset       | `:e!`   | Resets current buffer (Abandon active file changes) |
|            |             |         |                                                     |
### File / Folder Nav
| My Binding | My Verbiage      | Default                  | Description                        |
| ---------- | ---------------- | ------------------------ | ---------------------------------- |
| `\ff`      | Find-Files       | `:Telescope find_files`  | Telescope Browse Files             |
| `\fg`      | Find-Grep        | `:Telescope live_grep`   | Telescope Browse Files by Contents |
| `\fd`      | Find-Dir         | `:Telescope file_browse` | Telescope Browse Directories       |
| `\ft`      | File-Tree        | `:Neotree`               | Neotree Pane Directory Browser     |
| `\ftt`     | File-Tree-Toggle | `:Neotree toggle`        | Neotree Pane Toggle On/Off         |
|            |                  |                          |                                    |
### Window / Pane Nav
`TBD` - Scroll Viewport, Center Viewport on cursor
## File Changes
`:e!` - Abandon unsaved changes to open file
# Tmux
Basic hierarchy: **Session** > **Window** > **Pane**
References:
- https://tmuxcheatsheet.com/
## Sessions
### Terminal Commands
| Alias | Full Command                     | Action                           |
| ----- | -------------------------------- | -------------------------------- |
|       | `tmux`                           | New Session                      |
|       | `tmux new -s mysession`          | New Session With Name            |
|       | `tmux ls`                        | List Sessions                    |
|       | `tmux a`                         | Attach to Session                |
|       | `tmux a -t mysession`            | Attach to Session by Name        |
|       | `tmux kill-session -t mysession` | Kill Session by Name             |
|       | `tmux kill-session -a`           | Kill All Sessions except current |
### Shortcuts (from inside tmux)
| My Binding | Default Binding | Action                |
| ---------- | --------------- | --------------------- |
|            | `Ctrl+B $`      | Rename Session        |
|            | `Ctrl+B d`      | Detach from Session   |
|            | `Ctrl+B s`      | Session Preview mode  |
|            | `Ctrl+B ()`     | Jump Between Sessions |
## Windows
| My Binding | Default Binding | Action           |
| ---------- | --------------- | ---------------- |
|            | `Ctrl+B c`      | Create New       |
|            | `Ctrl+B ,`      | Rename           |
|            | `Ctrl+B &`      | Close Current    |
|            | `Ctrl+B w`      | List             |
|            | `Ctrl+B n`      | Next             |
|            | `Ctrl+B p`      | Previous         |
|            | `Ctrl+B 0..9`   | Select by Number |
## Panes
| My Binding | Default Binding    | Action           |
| ---------- | ------------------ | ---------------- |
|            | `Ctrl+B %`         | Split Vertical   |
|            | `Ctrl+B "`         | Split Horizontal |
|            | `Ctrl+B ↑↓←→`      | Change Active    |
|            | `Ctrl+B x`         | Close Active     |
|            | `Ctrl+B Ctrl+↑↓←→` | Resize           |
|            |                    |                  |
|            |                    |                  |
