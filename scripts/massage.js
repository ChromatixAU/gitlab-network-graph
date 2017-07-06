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

log.commits.forEach( function( commit ) {

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

    // Track the 'space' increases for this commit so we can adjust the parent's too.
    if ( 'undefined' === typeof spaces[ parent ] ) {
      spaces[ parent ] = space - commit.space + 1;
    }

    space += 2;

  });
  delete commit.parents_as_string;

  // Simplify the refs.
  commit.refs = commit.refs.replace( /,|HEAD ->|tag:|origin\/.*\b/g, ' ' ).replace( /\s+/g, ' ' ).trim();

  // Increment time as we go.
  commit.time  = time;
  time++;

  // Add to the days.
  let date = new Date( commit.date );
  log.days.push([ date.getDate(), date.toLocaleString( 'en-au', { month: 'short' }) ]);

});

// Write the file back (prettily, to make it easier for humans to read if required).
fs.writeFileSync( filename, JSON.stringify( log, null, 2 ) );
