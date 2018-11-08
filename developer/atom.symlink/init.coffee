# Add any auto-loaded Atom code on init here.

# Add rbenv PATHs
process.env.PATH = [process.env.HOME + "/.rbenv/shims", process.env.PATH].join(":")
process.env.PATH = [process.env.HOME + "/.rbenv/bin", process.env.PATH].join(":")
