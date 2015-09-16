#!/usr/bin/env node

'use strict';

// Load modules

var Cli = require('cli');
var Fs = require('fs-extra');
var Path = require('path');

// Internals

var Internals = {};

Internals.repo = 'https://github.com/rutaihwa/babu.git';
Internals.dependencies = ['cli', 'fs-extra'];

Internals.cloneBaseRepo = function (destination, callback) {

    Cli.info('Cloning the base project ...');

    var Cmd = 'git clone ' + Internals.repo + ' ' + destination;

    Cli.exec(Cmd, callback, callback);
};

Internals.updateProject = function (name, destination) {

    Cli.info('Updating project ...');

    // Update app package.json

    var Package = Fs.readJsonSync(Path.join(destination, 'package.json'));

    Cli.progress(0.3);

    Package.name = name;
    Package.version = '0.0.1';
    Package.description = 'New cool hapi application';
    Package.keywords = [name, 'babu'];
    Package.author = process.env.USER;
    Package.email = process.env.USER + '@someservice.js';

    // Delete generator dependencies & stuff

    delete Package.bin;
    delete Package.files;
    delete Package.preferGlobal;
    delete Package.homepage;
    delete Package.repository;
    delete Package.bugs;

    Internals.dependencies.forEach(function (dep) {

        if (Package.dependencies.hasOwnProperty(dep)) {

            delete Package.dependencies[dep];
        }
    });

    Cli.progress(0.6);

    Fs.writeJsonSync(Path.join(destination, 'package.json'), Package);
    Cli.progress(0.8);
};

Internals.installDependencies = function (destination, callback) {

    Cli.info('Downloading dependencies...');

    // Clear git
    Fs.removeSync(Path.join(destination, '.git'));

    // Clean Generator & other bins
    Fs.removeSync(Path.join(destination, 'bin'));

    // Install dependencies
    var Cmd = 'cd ' + destination + ' && npm install && git init . && git add . && git commit -m "Initial commit"';

    Cli.exec(Cmd, callback, callback);
};

Cli.parse({
    verbose: ['v', 'verbose']
});

// Main

Cli.main(function (args, options) {

    // Clone https://github.com/rutaihwa/babu.git into <myApp>
    // cd into <myApp>
    // Update package.json
    // npm install

    if (args.length !== 1) {
        return Cli.error('Invalid number of arguments' + '\n' +
                         'Usage: babu <myApp>');
    }

    var Generate = function () {

        Cli.spinner('Working...');

        Cli.progress(0.0);

        var Verbose = options.verbose;
        var App = args[args.length - 1]; // Last arg should be app name
        var Destination = Path.join(process.cwd(), App);

        Cli.ok('App Name: ' + App);
        Cli.ok('App folder: ' + Destination);

        Cli.info('Checking app folder ...');

        Fs.remove(Destination, function (err) {

            // Clear destination

            if (err) {
                return Cli.error(err);
            }

            Internals.cloneBaseRepo(Destination, function (err, stdout) {

                // ? Errors

                if (Verbose) {
                    console.info(err);
                    console.info(stdout);
                }

                Cli.progress(0.2);

                Internals.updateProject(App, Destination);

                Internals.installDependencies(App, function (err) {
                    // ? Errors

                    if (Verbose) {

                        console.info(err);
                        console.info(stdout);
                    }

                    Cli.progress(1.0);
                    Cli.spinner('Wow, your app is good now start coding :)', true);
		    Cli.info('Start your app: npm start' + '\n' +
			    'Run tests: npm test');
                });
            });
        });
    };

    Generate();
});
