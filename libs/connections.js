'use strict';

let mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;


var config = require('./../config/index');
let usersCon;


if(config.get("mongoose:UsersUri")){
	usersCon = mongoose.createConnection(config.get('mongoose:UsersUri'), config.get('mongoose:UsersOptions'));
}else{
	throw new Error("Can't connect to users collection. No mongoose:UsersUri property specified");
}
module.exports.users = usersCon;

