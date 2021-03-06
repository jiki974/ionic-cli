'use strict';

require('colors');

var extend = require('../utils/extend');
var path = require('path');
var IonicAppLib = require('ionic-app-lib');
var appLibUtils = IonicAppLib.utils;
var log = IonicAppLib.logging.logger;
var fs = require('fs');

var settings = {
  title: 'list',
  name: 'list',
  summary: 'List Ions, bower components, or addons in the project',
  isProjectTask: true
};

function listComponents() {
  try {
    var bowerJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'bower.json')));
    log.info('Ions, bower components, or addons installed:');

    Object.keys(bowerJson.devDependencies).forEach(function(bowerComponentName) {
      log.info(bowerComponentName.green);
    });
  } catch (ex) {
    log.error('This command can only be used when in an Ionic project directory'.red);
  }
}

/**
 * Need to look at bower.json of package just installed and look for any cordova plugins required
 * Check the directory in the projects `.bowerrc` file
 * Then go to /path/to/bower/components/<ionic-service-componentName>/ionic-plugins.json - 'plugins'
 * For each plugins - call 'ionic add plugin <current-required-plugin>'
 */
function run() {

  // This command will be deprecated in the future.
  var deprecationMsg = 'This command has been ' + 'deprecated'.red + '.  All ' +
   'resources are currently available in NPM and we recommend that you use NPM to manage these.\n' +
   'More information is available here: https://github.com/driftyco/ionic-cli/wiki/Migrating-to-NPM-from-bower\n';
  log.info(deprecationMsg);

  try {
    listComponents();
  } catch (error) {
    var errorMessage = error.message ? error.message : error;
    appLibUtils.fail(errorMessage, 'list');
  }
}

module.exports = extend(settings, {
  run: run
});
