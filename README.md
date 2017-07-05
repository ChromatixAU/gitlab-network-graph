# gitlab-network-graph
An attempt to make the excellent GitLab network graph portable.

## Why?

Because after you've seen GitLab's network graph, _GitHub's_ leaves a lot to be desired.

Plus, sometimes its nice to see a good graph _before_ you push to your remote. :smile:

_There'll be an image here soon to show how good it looks._

## What?

This repository is pretty much a duplication of [GitLab's network graph JS](https://github.com/gitlabhq/gitlabhq/tree/v9.3.4/app/assets/javascripts/network) as of GitLab v9.3.4, using a stripped-down version of [GitLab's webpack config](https://github.com/gitlabhq/gitlabhq/blob/v9.3.4/config/webpack.config.js) as of the same version.

In addition, we've added some simple tools to locally generate suitably formatted JSON output of your git log (or at least, we will soon).

## How?

That's classified. For now. Instructions for use are coming soon!

## License

MIT. See [LICENSE](LICENSE).
