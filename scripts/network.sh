#!/usr/bin/env bash

echo

# If frontend scripts don't exist yet, run webpack.
if [ ! -f `dirname $0`/../public/assets/webpack/network.bundle.js ]; then
  echo Building frontend scripts, this only needs to happen once...
  npm run webpack
  echo
fi

# Get the git log in JSON format, formatted as close as we can get to what the GitLab network script expects.
# Note that we're using @@ instead of " so that we can easily escape quotes inside the commit message.
# HT: https://gist.github.com/textarcana/1306223
# HT: https://git-scm.com/docs/git-log#_pretty_formats
echo Building git log...
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

# TODO: Open Chrome with the network graph.
# We can't do it simply yet, because ajax cross-origin not supported for local files.
#echo Opening browser...
#start chrome `dirname $0`/../index.html

echo
echo Done.
