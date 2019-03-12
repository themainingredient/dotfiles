# This will install a default Ruby version for you.

function install_default_ruby () {
  local default_version="2.5.1"

  echo "  Installing a default Ruby for you."
  read -t 10 -p "Version ${default_version} will be installed in 10 seconds, unless you supply a different version: " version
  echo ""
  version=${version:-$default_version}

  rbenv install $version && rbenv global $version
  gem install bundler
}

echo "Installing Ruby!"
install_default_ruby
