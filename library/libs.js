"use strict";

let Util = require('util'),
	DbError = require("@anzuev/studcloud.errors").DbError,
	Q = require('q'),
	User = require("@anzuev/studcloud.datamodels").User,
	Mongoose = require('mongoose');

/**
 *
 */
User.methods.saveUser = function*(){
	let errCounter = 5;
	let user;
	while(errCounter > 0){
		try{
			user = yield this.save();
			break;
		}catch(err){
			errCounter--;
			logger.error(new DbError(err, 500, 'Ошибка при сохранении пользователя, колличество ошибок - %d', 5 - errCounter));
		}
	}
	return user;
};

/**
 *
 */
User.methods.block = function(){
	this.state = "Blocked";
};

/**
 *
 * @param userId - Schema.Types.ObjectId
 */
User.statics.blockUser = function*(userId){
	let user = yield this.getUserById(userId);
	user.block();
	yield* user.saveUser();
};

/**
 *
 * @param userId
 * @returns {*|promise}
 */
User.statics.removeUser = function(userId){
	let deffer = Q.defer();
	let promise = this.remove({_id: userId}).exec();

	promise.then(function(result){
			if(result.n == 1) {
				deffer.fulfill(true);
			} else{
				deffer.reject(new DbError(null, 400, Util.format('No user found by id = %s', userId)));
			}
		})
		.catch(function(err){
			deffer.reject(new DbError(err, 500, 'Error in User.removeUser function'));
		});

	return deffer.promise;
};
