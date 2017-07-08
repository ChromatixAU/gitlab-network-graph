#!/usr/bin/env bash

# Author: Tim Malone, Chromatix Digital Agency
# Date:   2017-07-05

# We use blank lines in this script to make each stage of processing a bit clearer.
echo

# If npm hasn't been installed yet, install it.
if [ ! -d `dirname $0`/../node_modules ]; then
  echo Installing node modules. This may take some time, but only needs to happen once...
  ( cd `dirname $0`/../; npm install; )
  echo
fi

# If frontend scripts don't exist yet, run webpack.
if [ ! -f `dirname $0`/../public/assets/webpack/network.bundle.js ]; then
  echo Building frontend scripts, this only needs to happen once...
  ( cd `dirname $0`; npm run webpack; )
  echo
fi

# Get the git log in JSON format, formatted as close as we can get to what the GitLab network script expects.
# Note that we're using @@ instead of " so that we can easily escape quotes inside the commit message.
# HT: https://gist.github.com/textarcana/1306223
# HT: https://git-scm.com/docs/git-log#_pretty_formats
echo Exporting git log...
if [ ! -d `dirname $0`/../.data ]; then
  mkdir `dirname $0`/../.data
fi
touch `dirname $0`/../.data/data.json
git log --all --pretty=format:'    {
      @@author@@: {
        @@email@@: @@%aE@@,
        @@icon@@:  @@@@,
        @@name@@:  @@%aN@@
      },
      @@date@@:    @@%aI@@,
      @@id@@:      @@%H@@,
      @@message@@: @@%s@@,
      @@refs@@:    @@%D@@,
      @@space@@:   1,
      @@time@@:    0,
      @@parents_as_string@@: @@%P@@
    },'$@ |
  sed 's/"/\\"/g' | sed 's/@@/"/g' |
  perl -pe 'BEGIN{print "{\n  \"commits\": [\n"}; END{print "]\n}\n"}' |
  perl -pe 's/},]/}\n  ]/' > `dirname $0`/../.data/data.json

# Massage the JSON further than what we can do with git log.
echo Massaging data...
`dirname $0`/massage.js

# Place a GitHub URL based on the origin remote.
GIT_REMOTE=`git ls-remote --get-url | sed 's,\\.git,/commit/%s,g' | sed 's,:,/,g' | sed 's,git@,https://,g'`
sed -e 's,data-commit-url=".*",data-commit-url="'$GIT_REMOTE'",g' `dirname $0`/../index.html > `dirname $0`/../index.html.tmp && mv `dirname $0`/../index.html.tmp `dirname $0`/../index.html

echo
echo Done.
