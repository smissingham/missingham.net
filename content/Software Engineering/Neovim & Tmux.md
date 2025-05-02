---
created: 2025-04-25T08:21
updated: 2025-05-02T08:36
---
Dumping ground for my notes as I learn, and configure my own NeoVim.
Herein: mostly shortcuts/how-to notes.

# NeoVim
References: 
- https://nix-community.github.io/nixvim/
- https://dotfyle.com/neovim/plugins/trending
## Navigation
[Which-Key](https://github.com/folke/which-key) plugin shows available shortcuts after leader key press. Common entry points below:

`\` - Leader key, access all shortcuts from here
`\f` - File / Find
`\s` - Search
`\g` - Git
### General Operations
| My Binding | My Verbiage | Default | Mode | Description                                         |
| ---------- | ----------- | ------- | ---- | --------------------------------------------------- |
|            | Save        | `:w`    | C    |                                                     |
|            | Quit        | `:q`    | C    |                                                     |
|            | Reset       | `:e!`   | C    | Resets current buffer (Abandon active file changes) |
|            | Copy        | `y`     | V    | "Yank" (copy selected region)                       |
|            | Cut         | `d`     | V    | "Delete" (cut selected region)                      |
|            | Paste       | `p`     | V    | "Paste" (paste yanked/deleted at cursor)            |
### File / Folder Nav
| My Binding | My Verbiage    | Default | Description                        |
| ---------- | -------------- | ------- | ---------------------------------- |
| `\ff`      | Find-Files     |         | Find Files (Fuzzy)                 |
| `\fg`      | Find-Git Files |         | Find Git Files                     |
| `\fp`      | Find-Projects  |         | Find Projects                      |
| `\e`       | Explorer       |         | File Directory Browser             |
| `\sg`      | Search w/ Grep |         | Find inside files with Grep search |
### Window / Pane Nav
`z z` - Center viewport on current line

- Switch focus between window splits `Ctrl-W + HJKL`
#### Tmux-Vim-Navigator
Switch seamlessly between neovim/tmux panes with: `Ctrl + HJKL`

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

## Todo
- treesitter tj
- blinkcmp mrjakob/tj
- 
