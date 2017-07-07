#!/usr/bin/env node

// Author: Tim Malone, Chromatix Digital Agency
// Date:   2017-07-06

const fs       = require( 'fs' );
const crypto   = require( 'crypto' );
const filename = __dirname + '/../.data/data.json';

let log   = JSON.parse( fs.readFileSync( filename ) );
let space = 1;
let time  = 0;

// Prepare the days array.
log.days = [];

// Prepare the 'space' tracking object.
let spaces = {};
let active_spaces = {};
let parent_frees  = {};

log.commits.forEach( function( commit ) {

  commit.debug = [];

  // Set the gravatar hash for the author's e-mail address.
  let hash = crypto.createHash( 'md5' ).update( commit.author.email.toLowerCase() ).digest( 'hex' );
  commit.author.icon = 'https://secure.gravatar.com/avatar/' + hash + '?s=40&d=wavatar';

  // Check what 'space' we are meant to be at.
  commit.space = 'undefined' === typeof spaces[ commit.id ] ? 1 : spaces[ commit.id ];

  // Split the parents into separate arrays in the format GitLab requires.
  let space = commit.space;
  commit.parents = [];
  commit.parents_as_string.split( ' ' ).forEach( function( parent ) {

    commit.parents.push([ parent, space ]);

    active_spaces[ 'space' + space ] = true;

    // Track which spaces need to be freed when this parent is reached.
    if ( 'undefined' === typeof parent_frees[ 'parent' + parent ] ) {
      parent_frees[ 'parent' + parent ] = [];
    }
    parent_frees[ 'parent' + parent ].push( space );

    // Track the 'space' increases for this commit so we can adjust the parent's too.
    if ( 'undefined' === typeof spaces[ parent ] ) {
      spaces[ parent ] = space;
      commit.debug.push( 'Sets parent ' + parent + ' space to ' + spaces[ parent ] + ' (first time for this parent).' );
    } else {
      spaces[ parent ] = space - commit.space + 1;
      commit.debug.push( 'Sets parent ' + parent + ' space to ' + spaces[ parent ] + ' (' + commit.space + ') (subsequent time for this parent).' );
    }

    // Increment the space that the next parent will occupy.
    space += 2;

    // Check if there's any active spaces we're finished with at this point, before we move on.
    if ( 'undefined' !== typeof parent_frees[ 'parent' + commit.id ] ) {
      parent_frees[ 'parent' + commit.id ].forEach( function( space_to_free ) {

        // Do not free this space yet if the current commit is occupying the same space.
        if ( spaces[ commit.id ] === space_to_free && spaces[ parent ] === space_to_free ) {
          commit[ 'do_not_free_space_' + space_to_free ] = true;
        }

        // Free the space.
        if ( 'undefined' === typeof commit[ 'do_not_free_space_' + space_to_free ] ) {
          active_spaces[ 'space' + space_to_free ] = false;
        }

      });
    }

    // Check if there's any active spaces we need to avoid for the next parent.
    while ( 'undefined' !== typeof active_spaces[ 'space' + space ] && active_spaces[ 'space' + space ] ) {
      space += 2;
    }

  });
  delete commit.parents_as_string;

  // Remove content we don't need from the refs.
  commit.refs = commit.refs.replace( /,|HEAD|->|tag:|origin\//g, ' ' ).replace( /\s+/g, ' ' ).trim();

  // Make refs unique, in case we have both origin and local refs, and then sort alphabetically.
  // HT: https://stackoverflow.com/a/14438954/1982136
  commit.refs = [ ... new Set( commit.refs.split( ' ' ) ) ].sort().join( ' ' );

  // Increment time as we go.
  commit.time  = time;
  time++;

  // Add to the days.
  let date = new Date( commit.date );
  log.days.push([ date.getDate(), date.toLocaleString( 'en-au', { month: 'short' }) ]);

});

// Write the file back (prettily, to make it easier for humans to read if required).
fs.writeFileSync( filename, JSON.stringify( log, null, 2 ) );
