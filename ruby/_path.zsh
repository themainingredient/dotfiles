enforce_qt5_path () {
  local qt_path="$(brew --prefix qt@5.5)/bin"

  if [[ $PATH != *"$qt_path"* ]]
  then
    export PATH="$qt_path:$PATH"
  fi
}

enforce_qt5_path
