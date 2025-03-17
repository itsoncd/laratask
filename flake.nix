{
  description = "PHP dev environment";

  inputs.nixpkgs.url = "https://flakehub.com/f/NixOS/nixpkgs/0.1.*.tar.gz";

  outputs = { self, nixpkgs }:
    let
      supportedSystems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      forEachSupportedSystem = f: nixpkgs.lib.genAttrs supportedSystems (system: f {
        pkgs = import nixpkgs {
          inherit system;
          config.allowUnfree = true;
        };
      });
    in
    {
      devShells = forEachSupportedSystem ({ pkgs }: {
        default = pkgs.mkShell {
          packages = with pkgs; [
            php82
            php82Packages.composer
            php82Packages.php-cs-fixer
            php82Packages.phpstan
            nodejs
            nodePackages.pnpm
            nodePackages.intelephense
            mysql80
            git
            curl
            openssl
          ];
        };
      });
    };
}
