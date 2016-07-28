'use strict';

let mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;


let usersCon;


module.exports.configure = function(config){

	if(config.get("mongoose:UsersUri")){
		usersCon = mongoose.createConnection(config.get('mongoose:UsersUri'), config.get('mongoose:UsersOptions'));
	}else{
		throw new Error("Can't connect to users collection. No mongoose:UsersUri property specified");
	}

};

module.exports.getConnections = function(){
	if(!usersCon) throw new Error('Connections have not been configured');
	return {
		users: usersCon
	}
};
