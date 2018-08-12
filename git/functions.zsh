# Finds the last commit the file with the specified path is
# present and restores it.
git-undelete() {
  git checkout $(git rev-list -n 1 HEAD -- "$1")^ -- "$1"
}

# Sets up your branch to track a remote branch. Assumes you mean
# `origin/$branch-name`.
git-track() {
  branch=$(git rev-parse --abbrev-ref HEAD)
  git branch $branch --set-upstream-to origin/$branch
}
