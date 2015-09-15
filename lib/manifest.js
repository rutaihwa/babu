'use strict';

// Load modules

// Internals
var internals = {};

// Config for monitor

internals.monitor = {
    opsInterval: 1000,
    reporters: [{
        reporter: require('good-console'),
        events: { log: '*', response: '*' }
    }, {
        reporter: require('good-file'),
        events: { ops: '*' },
        config: './test/fixtures/monitor_log'
    }]
};

// Composer
var composer = module.exports = {};

composer.manifest = {

    connections: [
        {
            host: process.env.HOST || 'localhost',
            port: process.env.PORT || 8000,
            labels: ['web']
        }
    ],
    plugins: {
        'good': internals.monitor,
        'vision': {},
        'inert': {},
        './routes': [{
            'select': ['web']
        }]
    }
};

composer.composeOptions = {
    relativeTo: __dirname
};
