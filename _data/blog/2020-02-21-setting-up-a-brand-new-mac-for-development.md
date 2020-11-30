---
template: BlogPost
path: /setting-up-a-brand-new-mac-for-development
date: 2020-03-15T12:12:25.364Z
title: 'macOS Catalina: Setting up a Mac for Development'
thumbnail: /assets/pexels-pixabay-38568.jpg
---
It's hard to remember all the things you need to do to get a proper development environment set up when buying or wiping a MacBook. This guide is here to help!

I have to set up a MacBook Pro fairly often - when starting a new job and when buying a new personal computer. I created this article back in 2015 when I got my first Mac and have been updating it ever since with whatever I need as my job evolves. I'm primarily a full-stack web developer, so most of my needs will revolve around JavaScript/Node.js.

[](https://www.taniarascia.com/#getting-started)Getting Started
---------------------------------------------------------------

The setup assistant will launch once you turn the computer on. Enter your language, time zone, Apple ID, and so on. The first thing you should do is update macOS to get the latest security updates and patches.

[](https://www.taniarascia.com/#homebrew)Homebrew
-------------------------------------------------

Install the [Homebrew](https://brew.sh/) package manager. This will allow you to install almost any app from the command line.

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

Make sure everything is up to date.

```
brew update
```

[](https://www.taniarascia.com/#install-apps)Install Apps
---------------------------------------------------------

Here are some the programs I always install.

> Don't install Node.js through Homebrew. Use nvm (below).

| Program | Purpose |
| --- | --- |
| [Visual Studio Code](https://code.visualstudio.com/) | text editor |
| [Google Chrome](https://www.google.com/chrome/) | web browser |
| [Firefox](https://www.mozilla.org/en-US/firefox/products/) | web browser |
| [Rectangle](https://rectangleapp.com/) | window resizing |
| [iTerm2](https://iterm2.com/) | terminal |
| [Docker](https://www.docker.com/) | development |
| [VLC Media Player](http://www.videolan.org/vlc/index.html) | media player |
| [Slack](https://slack.com/) | communication |
| [Spotify](https://spotify.com/) | music |
| [Postgres](https://www.postgresql.org/) | database |
| [Postico](https://eggerapps.at/postico/) | database UI |
| [Postman](https://www.postman.com/) | API tool |

App installation

```
brew install\
  git\
  yarn\
  make &&

# GUI programs
brew cask install\
  visual-studio-code\
  google-chrome\
  firefox\
  rectangle\
  iterm2\
  docker\
  vlc\
  slack\
  spotify\
  postgres\
  postico\
  postman
```

[](https://www.taniarascia.com/#shell)Shell
-------------------------------------------

Catalina comes with [zsh](http://zsh.sourceforge.net/) as the default shell. Install [Oh My Zsh](https://ohmyz.sh/) for sensible defaults.

```
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

[](https://www.taniarascia.com/#nodejs)Node.js
----------------------------------------------

Use [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm/blob/master/README.md) to install Node.js. This allows you to easily switch between Node versions, which is essential.

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
```

### [](https://www.taniarascia.com/#install)Install

Install the latest version.

```
nvm install node
```

Restart terminal and run the final command.

```
nvm use node
```

Confirm that you are using the latest version of Node and npm.

```
node -v && npm -v
```

### [](https://www.taniarascia.com/#update)Update

For later, here's how to update nvm.

```
nvm install node --reinstall-packages-from=node
```

### [](https://www.taniarascia.com/#change-version)Change version

Here's how to switch to another version and use it.

```
nvm install xx.xx
```

```
nvm use xx.xx
```

And to set the default:

```
nvm alias default xx.xx
```

[](https://www.taniarascia.com/#git)Git
---------------------------------------

The first thing you should do with Git is [set your global configuration](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup).

```
touch ~/.gitconfig
```

Input your config and create some aliases.

.gitconfig

```
[user]
  name   = Firstname Lastname
  email  = you@example.com
[github]
  user   = username
[alias]
  a      = add
  ca     = commit -a
  cam    = commit -am
  cm     = commit -m
  s      = status
  pom    = push origin master
  pog    = push origin gh-pages
  puom   = pull origin master
  puog   = pull origin gh-pages
  cob    = checkout -b
  co     = checkout
  fp     = fetch --prune --all
  l      = log --oneline --decorate --graph
  lall   = log --oneline --decorate --graph --all
  ls     = log --oneline --decorate --graph --stat
  lt     = log --graph --decorate --pretty=format:'%C(yellow)%h%Creset%C(auto)%d%Creset %s %Cgreen(%cr) %C(bold blue)%an%Creset'
```

With the above aliases, I can run `git s` instead of `git status`, for example. The less I have to type, the happier I am.

[](https://www.taniarascia.com/#ssh)SSH
---------------------------------------

Simplify the process of SSHing into other boxes. Create an SSH config file.

```
mkdir ~/.ssh && touch ~/.ssh/config
```

Add the following contents, changing the variables for any hosts that you connect to. Using the below will be the same as running `ssh -i ~/.ssh/key.pem user@example.com`.

.ssh/config

```
Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_rsa

Host myssh
  HostName example.com
  User user
  IdentityFile ~/.ssh/key.pem
```

Now just run the alias to connect.

```
ssh myssh
```

### [](https://www.taniarascia.com/#generate-ssh-key)Generate SSH key

You can [generate an SSH key](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/) to distribute.

```
ssh-keygen -t rsa -b 4096 -C "email@example.com"
```

Add key.

```
ssh-add -K ~/.ssh/id_rsa
```

[](https://www.taniarascia.com/#settings)Settings
-------------------------------------------------

I don't like a lot of the Apple defaults so here are the things I always change.

To get the Home folder in the finder, press `CMD + SHIFT + H` and drag the home folder to the sidebar.

### [](https://www.taniarascia.com/#general)General

-   Set Dark mode
-   Make Google Chrome default browser

### [](https://www.taniarascia.com/#dock)Dock

-   Automatically hide and show Dock
-   Show indicators for open applications

### [](https://www.taniarascia.com/#keyboard)Keyboard

-   Key Repeat -> Fast
-   Delay Until Repeat -> Short
-   Disable "Correct spelling automatically"
-   Disable "Capitalize words automatically"
-   Disable "Add period with double-space"
-   Disable "Use smart quotes and dashes"

### [](https://www.taniarascia.com/#security-and-privacy)Security and Privacy

-   Allow apps downloaded from App Store and identified developers
-   Turn FileVault On (makes sure SSD is securely encrypted)
-   Turn Firewall On (extra security measure)

### [](https://www.taniarascia.com/#sharing)Sharing

-   Change computer name
-   Make sure all file sharing is disabled

### [](https://www.taniarascia.com/#users--groups)Users & Groups

-   Add "Rectangle" to Login items

[](https://www.taniarascia.com/#defaults)Defaults
-------------------------------------------------

A few more commands to change some defaults.

```
# Show Library folder
chflags nohidden ~/Library

# Show hidden files
defaults write com.apple.finder AppleShowAllFiles YES

# Show path bar
defaults write com.apple.finder ShowPathbar -bool true

# Show status bar
defaults write com.apple.finder ShowStatusBar -bool true

# Prevent left and right swipe through history in Chrome
defaults write com.google.Chrome AppleEnableSwipeNavigateWithScrolls -bool false
```

[](https://www.taniarascia.com/#application-settings)Application Settings
-------------------------------------------------------------------------

### [](https://www.taniarascia.com/#chrome)Chrome

-   Turn off "Warn before quitting"
-   Install [uBlock Origin](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm?hl=en)
-   Install [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
-   Install [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
-   Install [JSONView](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?hl=en)
-   Install [DevTools Theme - New Moon](https://chrome.google.com/webstore/detail/devtools-theme-new-moon/lndddploiofhfpdcoclegenegblkhlfk?hl=en)
-   Settings

    -   Set theme to "Dark"
    -   Go to `chrome://flags` and set Developer Tools Experiments to "Enabled"
    -   Go to Experiments and select "Allow custom UI themes"

### [](https://www.taniarascia.com/#visual-studio-code)Visual Studio Code

-   Press `CMD + SHIFT + P` and click "Install code command in PATH".
-   Install Prettier
-   Install [New Moon Theme](https://marketplace.visualstudio.com/items?itemName=taniarascia.new-moon-vscode)
-   Install [GitLens](https://gitlens.amod.io/)
-   Install [Highlight Matching Tag](https://marketplace.visualstudio.com/items?itemName=vincaslt.highlight-matching-tag)
-   Install ESLint
-   Install Prettier
-   Keyboard Shortcuts

    -   Copy Line Down - `CMD + SHIFT + E`
    -   Delete Line - `CMD + SHIFT + D`
    -   Reload Window - Remove Development Mode from When
    -   Format Document - `CMD + SHIFT + L`

### [](https://www.taniarascia.com/#rectangle)Rectangle

-   Full Screen: `CMD + SHIFT + '` (prevents messing with other commands)
-   Left Half: `CMD + OPTION + LEFT`
-   Right Half: `CMD + OPTION + RIGHT`

### [](https://www.taniarascia.com/#iterm2)iTerm2

-   [Use ⌥ ← and ⌥→ to jump forwards / backwards](https://coderwall.com/p/h6yfda/use-and-to-jump-forwards-backwards-words-in-iterm-2-on-os-x)
-   Set tab to open in same location

[](https://www.taniarascia.com/#conclusion)Conclusion
-----------------------------------------------------

That sums it up for my current preferences on setting up a MacBook Pro. I hope it helped speed up your process or gave you ideas for the next time you're setting one up.