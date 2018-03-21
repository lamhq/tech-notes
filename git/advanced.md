## Set email and username for project
git config user.email "lam.huynh@theappteam.com.au"
git config user.name "Lam"


## view git config
git config user.email
git config user.name


## Get git push work on window (In case you have installed TortoiseGIT)

1. Open pageant, click Add Key, select your private key and add it to pageant
2. Add a system enviroment variable named `GIT_SSH`, with value is the path to `TortoiseGitPlink.exe`, (ex: `d:\program\TortoiseGit\bin\TortoiseGitPlink.exe`)
3. try `git push -u origin master` on your terminal

Reference: http://guides.beanstalkapp.com/version-control/git-on-windows.html (search for the keyword: In case you have installed TortoiseGIT)