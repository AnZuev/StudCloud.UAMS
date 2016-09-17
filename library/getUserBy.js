"use strict";

let Util = require('util'),
	DbError = require("@anzuev/studcloud.errors").DbError,
	Q = require('q'),
	User = require("@anzuev/studcloud.datamodels").User;


const logger = require('../libs/logger').getLogger();

/**
 * Get user by id
 * @function getUserById
 * @param {mongoose.Types.ObjectId} id - идентификатор пользователя
 * @memberof module:UAMS~User
 * @returns {promise}
 * @this User
 * @fulfill {User[]}
 * @reject {DbError}, 404 - пользователь не найден
 * @reject {DbError}, 500 - ошибка базы данных
 * @private
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
 * @function getUserByMail
 * @param {string} mail - почтовый адрес
 * @memberof module:UAMS~User
 * @this User
 * @fulfill {User[]}
 * @reject {DbError}, 404 - пользователь не найден
 * @reject {DbError}, 500 - ошибка базы данных
 * @returns {promise}
 * @private
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
 * @function getUserByPhone
 * @param {string} phone - номер мобильного телефона
 * @memberof module:UAMS~User
 * @this User
 * @fulfill {User[]}
 * @reject {DbError}, 404 - пользователь не найден
 * @reject {DbError}, 500 - ошибка базы данных
 * @returns {promise}
 * @private
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

