# gitlab-network-graph
An attempt to make the _excellent_ GitLab network graph portable.

## Why?

Because after you've seen GitLab's network graph, _GitHub's_ leaves a lot to be desired.

Plus, sometimes its nice to see a good graph _before_ you push to your remote. :smile:

![The GitLab network graph](screenshot.png)

## What?

This repository is pretty much a duplication of [GitLab's network graph JS](https://github.com/gitlabhq/gitlabhq/tree/v9.3.4/app/assets/javascripts/network) as of GitLab v9.3.4, using a stripped-down version of [GitLab's webpack config](https://github.com/gitlabhq/gitlabhq/blob/v9.3.4/config/webpack.config.js) as of the same version. GitLab's network graph in turn uses [Raphaël](http://dmitrybaranovskiy.github.io/raphael/).

In addition, we've added some simple tools to locally generate suitably formatted JSON output of your git log.

## How?

Firstly, [install node.js](https://nodejs.org/en/download/current/) if you don't already have it. Then:

1. Clone this repository locally (into somewhere you can access through your local webserver).

   `git clone https://github.com/ChromatixAU/gitlab-network-graph.git`

2. `cd` into the repository you want to get the network graph for.
3. Run `/path/to/gitlab-network-graph/scripts/network.sh`. This will take a little while the first time you run it.
4. Open http://localhost/gitlab-network-graph in your browser (assuming that's where it's accessible from).

To condense steps 3 and 4 later on, you may want to add a git alias:

Run this once, replacing both the path you've cloned gitlab-network-graph to, and the relevant path to your local webserver:

    git config --global alias.network '!/path/to/gitlab-network-graph/scripts/network.sh && start chrome "http://localhost/gitlab-network-graph"'

Then, whenever you want to see the network graph pop up on your screen, from within the repo you want to see, just run:

    git network

_This tool has been tested in Git Bash on Windows 10, with node.js v7.0.0, npm 3.10.8, and perl v5.22.1. Your mileage may vary._

## TODO

* Tweak the parent 'space' detection to match how GitLab does it - we're not quite there yet.
* Support the fancy tooltips like GitLab does.
* Maybe add to the output a small header/footer with a link to this repo or something.
* Look at the possibility of making a hosted version of this that uses the GitHub API to pull commit lists from there, for _any_ repository.
* Look into what the JS global `findFileURL` does, whether we need it, and whether we could create that from the repository remote (eg. GitHub's find file URL would be eg. `https://github.com/gitlabhq/gitlabhq/find/master`, whereas GitLab's is `/find_file/master`)

## Contributing

Pull requests and issues are most welcome. Go forth!

## License

MIT. See [LICENSE](LICENSE).
