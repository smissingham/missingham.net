---
created: 2025-04-25T08:21
updated: 2025-05-13T17:08
---
Dumping ground for my notes as I learn, and configure my own NeoVim.
Herein: mostly shortcuts/how-to notes.

# NeoVim
>[!warning]
> Herein are keymaps specific to my neovim configuration. Many are standard, many are not
> [Click Here to Browse My Config on Github](https://github.com/search?q=repo%3Asmissingham%2Fnix+path%3Anvim&[type=code)

Helpful References: 
- https://vim.rtorr.com/
- https://nix-community.github.io/nixvim/
- https://dotfyle.com/neovim/plugins/trending
- http://vimcasts.org/blog/2013/02/habit-breaking-habit-making/
- https://linuxhandbook.com/move-page-up-down-vim/
## Navigation
[Which-Key](https://github.com/folke/which-key) plugin shows available shortcuts after leader key press. Common entry points below:

| My Binding | My Verbiage | Default | Mode | Description                      |
| ---------- | ----------- | ------- | ---- | -------------------------------- |
| `\`        |             |         | N    | Leader key, access all shortcuts |
| `\?`       |             |         | N    | See buffer-local keymaps         |
| `\f`       | File/Find   |         | N    | File and find operations         |
| `\s`       | Search      |         | N    | Search operations                |
| `\g`       | Git         |         | N    | Git operations                   |


### General Operations
| My Binding | My Verbiage | Default    | Mode | Description                                         |
| ---------- | ----------- | ---------- | ---- | --------------------------------------------------- |
|            | Save        | `:w`       | C    |                                                     |
|            | Quit        | `:q`       | C    |                                                     |
|            | Reset       | `:e!`      | C    | Resets current buffer (Abandon active file changes) |
|            | Copy        | `y`        | V    | "Yank" (copy selected region)                       |
|            | Cut         | `d`        | V    | "Delete" (cut selected region)                      |
|            | Paste       | `p`        | V    | "Paste" (paste yanked/deleted at cursor)            |
|            |             | `K`        | N    | Show definition hover                               |
|            |             | `u`        | N    | Undo                                                |
|            |             | `Ctrl + r` | N    | Redo                                                |
### File / Folder Nav
| My Binding | My Verbiage    | Default | Description                        |
| ---------- | -------------- | ------- | ---------------------------------- |
| `\ff`      | Find-Files     |         | Find Files (Fuzzy)                 |
| `\fg`      | Find-Git Files |         | Find Git Files                     |
| `\fp`      | Find-Projects  |         | Find Projects                      |
| `\e`       | Explorer       |         | File Directory Browser             |
| `\sg`      | Search w/ Grep |         | Find inside files with Grep search |
### Cursor / Pane Navigation
| My Binding      | My Verbiage | Default | Mode | Description                        |
| --------------- | ----------- | ------- | ---- | ---------------------------------- |
| `z z`           |             |         | N    | Center viewport on current line    |
| `Ctrl + u`      |             |         | N    | Scroll active pane up              |
| `Ctrl + d`      |             |         | N    | Scroll active pane down            |
| `Ctrl-W + HJKL` |             |         | N    | Switch focus between window splits |
|                 |             |         | N    | Go to top of file                  |
#### Flash Navigation
| My Binding | My Verbiage         | Default | Mode    | Description                       |
| ---------- | ------------------- | ------- | ------- | --------------------------------- |
| `s`        | Flash               |         | n, x, o | Jump to target                    |
| `S`        | Flash Treesitter    |         | n, x, o | Navigate using treesitter         |
| `r`        | Remote Flash        |         | o       | Remote flash navigation           |
| `R`        | Treesitter Search   |         | o, x    | Search using treesitter           |
| `<c-s>`    | Toggle Flash Search |         | c       | Toggle flash search functionality |
#### Basic Vim Mode Commands
| My Binding | My Verbiage | Default | Mode | Description                                |
| ---------- | ----------- | ------- | ---- | ------------------------------------------ |
| `i`        |             |         | N    | Insert mode at current position            |
| `I`        |             |         | N    | Insert at beginning of current line        |
| `a`        |             |         | N    | Insert after character at current position |
| `A`        |             |         | N    | Insert at end of current line              |
#### Line / Word Navigation
| My Binding | My Verbiage | Default | Mode | Description                              |
| ---------- | ----------- | ------- | ---- | ---------------------------------------- |
| `$`        |             |         | N    | Move cursor to end of line               |
| `^`        |             |         | N    | Move cursor to start of line             |
| `w`        |             |         | N    | Move cursor to next word start           |
| `e`        |             |         | N    | Move cursor to next word end             |
| `W`        |             |         | N    | Move cursor to next word start after whitespace |
| `E`        |             |         | N    | Move cursor to next word end after whitespace |

#### Tmux-Vim-Navigator
Switch seamlessly between neovim/tmux panes with: `Ctrl + HJKL`

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
# Avante Nvim
|Key Binding|Description|
|---|---|
|Leaderaa|show sidebar|
|Leaderat|toggle sidebar visibility|
|Leaderar|refresh sidebar|
|Leaderaf|switch sidebar focus|
|Leadera?|select model|
|Leaderae|edit selected blocks|
|LeaderaS|stop current AI request|
|Leaderah|select between chat histories|
|co|choose ours|
|ct|choose theirs|
|ca|choose all theirs|
|c0|choose none|
|cb|choose both|
|cc|choose cursor|
|]x|move to previous conflict|
|[x|move to next conflict|
|[[|jump to previous codeblocks (results window)|
|]]|jump to next codeblocks (results windows)|

http://vimcasts.org/blog/2013/02/habit-breaking-habit-making/
