
// Author: Tim Malone, Chromatix Digital Agency
// Date:   2017-07-06

document.addEventListener( 'DOMContentLoaded', function() {

  // Delay our changes till last, so that we can override things that GitLab's default JS does.
  setTimeout( function() {

    // Extend the graph to cover the full available screen space.
    document.getElementsByClassName( 'network-graph' )[0].style.height = document.documentElement.clientHeight + 'px';

  }, 0 );

});
