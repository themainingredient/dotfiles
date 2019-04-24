enforce_qt5_path () {
  local qt_path="$(brew --prefix qt@5.5)/bin"

  if [[ $PATH != *"$qt_path"* ]]
  then
    export PATH="$qt_path:$PATH"
  fi
}

if [[ $(brew list | grep qt@5.5) == "qt@5.5" ]]
then
  enforce_qt5_path
fi
