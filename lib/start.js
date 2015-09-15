'use strict';

// Load modules

var Hoek = require('hoek');
var Server = require('./index');
var Composer = require('./manifest');

// Internals
var internals = {};

// Server init
Server.init(Composer.manifest, Composer.composeOptions, function (err, server) {

    Hoek.assert(!err, err);

    // Server connections
    var web = server.select('web');

    // Console log where the server is running
    console.log('Web server running at: ', web.info.uri);

});

