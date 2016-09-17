'use strict';

/**
 * @memberof UAMS
 */
let User = require("@anzuev/studcloud.datamodels").User;

require('./getUserBy');

require('./getUsersBy/authLevel');

require('./getUsersBy/attribute');

require('./getUsersBy/signUpTime');

require('./changePublicInfo');

require('./requestConfirmation');

require('./social');

require('./general');

require('./libs');

require('./format');



module.exports = User;