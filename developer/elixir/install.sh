# This will install a default Elixir version for you.

function install_default_elixir () {
  local default_version="1.8"

  asdf plugin-add elixir https://github.com/asdf-vm/asdf-elixir.git
  asdf install elixir "$default_version"
}

function install_vscode_extensions() {
  read -p "  Do you want to install VSC extensions for Elixir? (Y/N): " -n 1 -r
  echo

  if [[ $REPLY =~ ^[Yy]$ ]]
  then
    local extensions=(
      "mjmcloug.vscode-elixir"
    )

    for extension in "${extensions[@]}"
    do
      code --install-extension $extension
    done
  fi
}

echo "Installing Elixir!"
install_default_elixir
install_vscode_extensions
