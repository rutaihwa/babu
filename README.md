# babu [![GitHub version](https://badge.fury.io/gh/rutaihwa%2Fbabu.svg)](http://badge.fury.io/gh/rutaihwa%2Fbabu) [![Build status](https://travis-ci.org/rutaihwa/babu.svg?branch=master)

A quick way to start developing a node application with hapijs, jade.

#### Goal
Provide a minimalistic way to set up your app canvas and build the cool applications.

#### Usage
The template assumes `git`, `nodejs` or `iojs` are correctly installed.

```shell
$ npm install -g babu
$ babu <myApp>
```

#### Application Structure

###### lib/

    ----- index.js		// The server
    ----- start.js		// The application entry point
    ----- routes.js		// The application routes
    ----- manifest.js		// The application manifest

###### views/

    ----- index.jade
    

###### config/

    ---- default.json


###### assets/

    ----- images/	      // Images for your app
    ----- styles/	      // Style and style related stuff
    ----- scripts/	      // Your Js scripts
    ----- vendors/	      // Third party libraries

###### test/

    ----- index.js		// Simple test

###### Others
    
    ------ .gitignore		// files to be ignored by git
    ------ .eslintrc		// Linting rules for js
    ------ .eslintignore	// Files that should be ignored by lint
 
#### Contributing

1. Fork this repo and make changes in your own fork.
2. Commit your changes and push to your fork `git push origin master`
3. Create a new pull request and submit it back to the project.

#### Bugs & Issues

Stuff doesn't work, open an [issue ](https://github.com/rutaihwa/babu/issues), its free.