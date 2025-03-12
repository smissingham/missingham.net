{
  description = "Nix Development Environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_20
            pnpm
          ];

          shellHook = ''
            clear
            echo "----------------------------------------"
            echo "🚀 Development Dependencies"
            echo "📦 Using pnpm as package manager"
            echo "----------------------------------------"
            echo "📊 Installed Versions:"
            echo "  Node.js: $(node --version)"
            echo "  pnpm: $(pnpm --version)"
            echo "----------------------------------------"
          '';
        };
      }
    );
} 