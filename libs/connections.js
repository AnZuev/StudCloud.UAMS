'use strict';

let mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

let usersCon;


module.exports = function(config){
	if(config.get("mongoose:UsersUri")){
		usersCon = mongoose.createConnection(config.get('mongoose:UsersUri'), config.get('mongoose:UsersOptions'));
		return {
			users: usersCon
		}
	}else{
		throw new Error("Can't connect to users collection. No mongoose:UsersUri property specified");
	}

};

