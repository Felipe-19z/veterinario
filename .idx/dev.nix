
# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-23.11"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.openssl
    pkgs.gh
  ];

  # Sets environment variables in the workspace
  env = {};

  services.postgres = {
    enable = true;
  };

  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      "mtxr.sqltools-driver-pg"
      "mtxr.sqltools"
    ];

    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # Example: install JS dependencies from NPM
        # setup = "npm install";
      };
      # Runs when the workspace is (re)started
      onStart = {
        # Example: start a dev server
        # start = "npm run dev";
      };
    };

    # Enable previews
    previews = {
      enable = true;
      previews = {};
    };
  };
}
