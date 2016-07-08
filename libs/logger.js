'use strict';

let log4js = require('log4js'),
	config = require('../config');

log4js.configure({
	appenders: [
		{ type: 'file', filename: config.get("logs:UAMS:path") || './logs/UAMS.log', category: config.get("logs:UAMS:label") ||'UAMS' },
		{ type: 'console' }
	]
});

module.exports = log4js.getLogger('UAMS');