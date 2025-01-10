
# Create the file

Create a file, myShell.nix
```nix
# dev shell containing some packages...
{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell
{
	buildInputs = with pkgs; [
		# nix packages go here
		# python for example
		(python311.withPackages (
			ps: with ps; [
				pip
			]
		))
	];
	nativeBuildInputs = with pkgs; [
		# or here
		# refer to: https://discourse.nixos.org/t/use-buildinputs-or-nativebuildinputs-for-nix-shell/8464
	];
}
```

# Start the Shell

The shell can be started with the following, note inclusion of `zsh` (my chosen shell):
`nix-shell myShell.nix --command zsh`

## Try the Packages

Now note, from a terminal started within vscode I can get to the shell binaries whereas in the host user space I cannot
### On Host:
```zsh
❯ which python; which pip;  
python not found  
pip not found
```

### In Dev Shell
```zsh
❯ which python; which pip;  
/nix/store/l1b26ssjyyn1dbm1y4r95x8rmxps1nyi-python3-3.11.10-env/bin/python  
/nix/store/l1b26ssjyyn1dbm1y4r95x8rmxps1nyi-python3-3.11.10-env/bin/pip
```

# Use an Editor, With the Shell!

From there, open editor of choice
`code .`



# Run it Remotely!
// TODO

# Include it in flake.nix
// TODO
