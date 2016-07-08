/**
 * Created by anton on 17/02/15.
 */
var nconf = require('nconf');
var path = require('path');

nconf.argv()
    .env();
    //.file("UAMSConfig", {file: path.join(__dirname, 'config.json')});

module.exports = nconf;
