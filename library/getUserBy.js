"use strict";

let Util = require('util'),
	DbError = require("@anzuev/studcloud.errors").DbError,
	Q = require('q'),
	User = require("@anzuev/studcloud.datamodels").User;


const logger = require('../libs/logger');

/**
 * Get user by id
 * @param id
 * @returns {*|promise}
 */
User.statics.getUserById = function(id){
	let deffer = Q.defer();
	var promise = this.findById(id).exec();

	promise.then(function(user){
		if(user) deffer.fulfill(user);
		else {
			deffer.reject(new DbError(null, 404, Util.format('No user found by id %s', id)));
		}
	}).catch(function(err){
		logger.error(err);
		if(err) deffer.reject(new DbError(err, 500));
	});

	return deffer.promise;
};

/**
 * Get user by mail
 * @param mail
 * @returns {*|promise}
 */
User.statics.getUserByMail = function (mail){
	let deffer = Q.defer();
	var promise = this.findOne({"auth.mail": mail}).exec();

	promise.then(function(user){
		if(user) deffer.fulfill(user);
		else {
			deffer.reject(new DbError(null, 404, Util.format('No user found by mail %s', mail)));
		}
	}).catch(function(err){
		logger.error(err);
		if(err) deffer.reject(new DbError(err, 500));
	});

	return deffer.promise;
};


/**
 * get user by phone
 * @param phone
 * @returns {*|promise}
 */
User.statics.getUserByPhone = function(phone){
	let deffer = Q.defer();
	var promise = this.findOne({"prInform.phone": phone}).exec();

	promise.then(function(user){
		if(user) deffer.fulfill(user);
		else {
			deffer.reject(new DbError(null, 404, Util.format('No user found by phone %s', phone)));
		}
	}).catch(function(err){
		logger.error(err);
		if(err) deffer.reject(new DbError(err, 500));
	});

	return deffer.promise;
};

