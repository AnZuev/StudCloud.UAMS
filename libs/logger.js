'use strict';

let log4js = require('log4js'),
	config = require('../config');

log4js.configure({
	appenders: [
		{ type: 'file', filename: config.get("UAMS:path") || 'logs/UAMS.log', category: config.get("UAMS:label") ||'UAMS' },
		{ type: 'console' }
	]
});

global.logger = log4js.getLogger('UAMS');