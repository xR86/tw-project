echo on

start cmd /k "echo "***grunt watch window***" & grunt watch"
::grunt watch -> minifies files on change (blocking)

start cmd /k "echo "***npm window***" & npm start"
::npm start -> runs the node.js server (blocking)

start cmd /k "echo "***git/other window***" & git status"
::git status -> shows current changes (non-blocking) 
::here you can run git or other commands needed
