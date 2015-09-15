'use strict';

// Load modules
var Config = require('getconfig');
var Pkg = require('../package'); // Used for placeholder

// Declare internals

var internals = {};

// Global context
internals.globalContext = {
    'app': {
        'name': Pkg.name,
        'author': Pkg.author
    }
};

exports.register = function (server, options, next) {

    // Ensure dependencies are properly registered
    server.dependency(['inert', 'vision'], internals.after);

    // Go to next
    return next();
};


internals.after = function (server, next) {

    // Setting view engine
    server.views({
        engines: {
            jade: require('jade')
        },
        path: Config.paths.views,
        isCached: Config.getconfig.env === 'production',
        context: internals.globalContext
    });

    // Serve static files
    server.route({
        method: 'GET',
        path: '/{assetpath*}',
        config: {
            description: 'Static Assets Route',
            auth: false,   // Turn off auth restrictions
            handler: {
                directory: {
                    path: Config.paths.public
                }
            }
        }
    });

    // routes
    server.route({
        method: 'GET',
        path: '/',
        config: {
            description: 'Returns the index of the app',
            handler: function (request, reply) {

                var context = {
                    body: Pkg.description
                };
                return reply.view('index', context);
            }
        }
    });

    // Go to next
    return next();
};

exports.register.attributes = {
    name: 'routes'
};
