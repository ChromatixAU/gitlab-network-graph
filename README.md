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

That's classified. For now. Actually there are some basic instructions, more coming later:

* Clone this repository locally (into somewhere you can access through your local webserver).
* `cd` into the repository you want to get the network graph for.
* Run `/path/to/gitlab-network-graph/scripts/network.sh`.
* Open http://localhost/gitlab-network-graph in your browser (assuming that's where it's accessible from).

## TODO

* Tweak the parent 'space' detection to match how GitLab does it.
* See all branches....?
* Support tooltips like GitLab does.
* Support scrolling down the page.
* Fix the slight horizontal scroll.
* Work out if it's possible to automatically open the network graph in Chrome (see bottom of network.sh).

## License

MIT. See [LICENSE](LICENSE).
