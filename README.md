[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# Welcome to the The Main Ingredient dotfiles

We set up this project because of a few reasons:

- We want everybody to be up and running within 1 hour after joining our company
- We want to share our default configuration to continuously pimp our workflow
- We want to be able to use this script for not only developers, but designers and everybody in the company

## TL;DR - how to install it

Run this:

```sh
git clone git@github.com:themainingredient/dotfiles.git ~/.dotfiles
cd ~/.dotfiles
script/bootstrap
```

This will symlink the appropriate files in `.dotfiles` to your home directory.
Everything is configured and tweaked within `~/.dotfiles`.

## Topics

Everything's built around topic areas. If you're adding a new area to your
forked dotfiles — say, "Java" — you can simply add a `java` directory and put
files in there. Anything with an extension of `.zsh` will get automatically
included into your shell. Anything with an extension of `.symlink` will get
symlinked without extension into `$HOME` when you run `script/bootstrap`.

A default topic folder looks like this:

- **topic/\*.zsh**: Any files ending in `.zsh` get loaded into your
  environment.
- **topic/path.zsh**: Any file named `path.zsh` is loaded first and is
  expected to setup `$PATH` or similar.
- **topic/completion.zsh**: Any file named `completion.zsh` is loaded
  last and is expected to setup autocomplete.
- **topic/install.sh**: Any file named `install.sh` is executed when you run `script/install`. To avoid being loaded automatically, its extension is `.sh`, not `.zsh`.
- **topic/\*.symlink**: Any file ending in `*.symlink` gets symlinked into
  your `$HOME`. This is so you can keep all of those versioned in your dotfiles
  but still keep those autoloaded files in your home directory. These get
  symlinked in when you run `script/bootstrap`.

## Homebrew

We made sure everybody (also non-developers 🖖) can use this script. Therefore we made different Brewfiles for everybody in the `homebrew/brewfiles` folder:

- `common`, suitable for everybody
- `designer`, you can probably guess for whom this is suited 😉
- `developer`

## Making changes

If you think you have a change that more folks could benefit from, please propose and make a change or addition. Take these steps:

1. Create a branch
1. Create a pull request
1. Add a reviewer to make sure it gets reviewed and merged

## Shout out 🙌

A big shout out goes out to [@holman](https://github.com/holman/dotfiles). This repository drew inspiration from his set up.
