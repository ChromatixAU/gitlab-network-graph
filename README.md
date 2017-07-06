# gitlab-network-graph
An attempt to make the _excellent_ GitLab network graph portable.

## Why?

Because after you've seen GitLab's network graph, _GitHub's_ leaves a lot to be desired.

Plus, sometimes its nice to see a good graph _before_ you push to your remote. :smile:

![The GitLab network graph](screenshot.png)

## What?

This repository is pretty much a duplication of [GitLab's network graph JS](https://github.com/gitlabhq/gitlabhq/tree/v9.3.4/app/assets/javascripts/network) as of GitLab v9.3.4, using a stripped-down version of [GitLab's webpack config](https://github.com/gitlabhq/gitlabhq/blob/v9.3.4/config/webpack.config.js) as of the same version.

In addition, we've added some simple tools to locally generate suitably formatted JSON output of your git log (or at least, we will soon).

## How?

1. Clone this repository locally (into somewhere you can access through your local webserver).

   `git clone https://github.com/ChromatixAU/gitlab-network-graph.git`

2. `cd` into the repository you want to get the network graph for.
3. Run `/path/to/gitlab-network-graph/scripts/network.sh`. This will take a little while the first time you run it.
4. Open http://localhost/gitlab-network-graph in your browser (assuming that's where it's accessible from).

To condense scripts 3 and 4 later on, you may want to add a git alias.

Run this once, replacing both the path you've cloned gitlab-network-graph to, and the relevant path to your local webserver:

    git config --global alias.network '!/path/to/gitlab-network-graph/scripts/network.sh && start chrome "http://localhost/gitlab-network-graph"'

Then, whenever you want to see the network graph pop up on your screen, from within the repo you want to see, just run:

    git network

## TODO

* Tweak the parent 'space' detection to match how GitLab does it.
* See all branches....?
* Support tooltips like GitLab does.
* Support scrolling down the page.
* Fix the slight horizontal scroll.
* Work out if it's possible to automatically open the network graph in Chrome (see bottom of network.sh).

## Contributing

Pull requests and issues are most welcome. Go forth!

## License

MIT. See [LICENSE](LICENSE).
