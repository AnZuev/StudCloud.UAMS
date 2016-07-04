'use strict';

var log4js = require('log4js');

log4js.configure({
	appenders: [
		{ type: 'file', filename: 'logs/UAMS.log', category: 'UAMS' },
		{ type: 'console' }
	]
});

global.logger = log4js.getLogger('UAMS');