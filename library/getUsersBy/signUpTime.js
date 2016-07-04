"use strict";

let User = require("@anzuev/studcloud.datamodels").User,
	Util = require('util'),
	Q = require("q");


let ValidationError = require("@anzuev/studcloud.errors").ValidationError,
	DbError = require("@anzuev/studcloud.errors").DbError;




User.statics.countUserBySignUpTime = function(age){
	let defer = Q.defer();
	let promise = this.count({created:{$gte: age.toISOString()} }).exec();
	promise
		.then(function(counter){
			defer.fulfill(counter);
		})
		.catch(function(err){
			defer.reject(err);
		});
	return defer.promise;
};

User.statics.countAllUsers = function(){
	let defer = Q.defer();
	let promise = this.count({}).exec();
	promise
		.then(function(counter){
			defer.fulfill(counter);
		})
		.catch(function(err){
			defer.reject(err);
		});
	return defer.promise;
};
