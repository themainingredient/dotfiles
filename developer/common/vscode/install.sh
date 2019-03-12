#!/bin/sh
#
# As inspired from https://github.com/springload/dotfiles/blob/master/config/visual-studio-code/install.sh

function install_extensions() {
  read -p "  Do you want to install VSC extensions? (Y/N): " -n 1 -r
  echo

  if [[ $REPLY =~ ^[Yy]$ ]]
  then
    local extensions=(
      "karunamurti.haml"
      "streetsidesoftware.code-spell-checker"
      "mikestead.dotenv"
      "eamodio.gitlens"
      "pkief.material-icon-theme"
      "ionutvmi.path-autocomplete"
      "dbaeumer.vscode-eslint"
      "hookyqr.beautify"
      "mohsen1.prettify-json"
      "noku.rails-run-spec-vscode"
      "rebornix.ruby"
      "hridoy.rails-snippets"
      "misogi.ruby-rubocop"
      "wayou.vscode-todo-highlight"
    )

    for extension in "${extensions[@]}"
    do
      code --install-extension $extension
    done
  fi
}

function install_user_config() {
  read -p "  Do you want to overwrite user config? (Y/N): " -n 1 -r
  echo

  if [[ $REPLY =~ ^[Yy]$ ]]
  then
    read -p "  Do you want to back up your current user config? (Y/N): " -n 1 -r
    echo

    if [[ $REPLY =~ ^[Yy]$ ]]
    then
      cp "$HOME/Library/Application Support/Code/User/settings.json" "$HOME/Library/Application Support/Code/User/settings.backup.json"
      echo "  Your previous config has been saved to: $HOME/Library/Application Support/Code/User/settings.backup.json"
    fi

    CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
    cp $CURRENT_DIR/settings.json.example "$HOME/Library/Application Support/Code/User/settings.json"
    echo "  New user config has been written. Please restart Visual Studio Code."
  fi
}

if test $(which code)
then
  echo "› Configuring Visual Studio Code"
  install_extensions
  install_user_config
fi
