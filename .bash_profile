export PATH="$PATH:/usr/local/sbin"

alias showAll='defaults write com.apple.finder AppleShowAllFiles YES; killall Finder /System/Library/CoreServices/Finder.app'
alias hideAll='defaults write com.apple.finder AppleShowAllFiles NO; killall Finder /System/Library/CoreServices/Finder.app'
alias ni='ln -s /Volumes/cevdev/template/node_modules/ ./node_modules'
alias symftp='ln -s /Volumes/cevdev/.ftppass ./'
alias gd='grunt dev'
alias gu='grunt update'
alias gunm='grunt updatenm'
alias gb='grunt build'
alias gbj='grunt buildjs'
alias gl='grunt lint'
alias gp='grunt preview'
alias gv='grunt verify'
alias addnpm='npm install'
alias apacherestart='sudo apachectl restart'

source ~/.profile

# init z https://github.com/rupa/z
. ~/code/z/z.sh

[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm" # Load RVM into a shell session *as a function*