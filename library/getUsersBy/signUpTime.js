"use strict";

let User = require("@anzuev/studcloud.datamodels").User,
	Util = require('util'),
	Q = require("q");


let ValidationError = require("@anzuev/studcloud.errors").ValidationError,
	DbError = require("@anzuev/studcloud.errors").DbError;


/**
 * Подсчет сколько пользователей было зарегистрировано начиная с какого-то времени
 * @function countUserBySignUpTime
 * @param {Date} age - за какой период получать пользователей
 * @returns {promise}
 * @fulfill {number} - количетсво пользователей
 * @reject {DbError}, 500 - ошибка базы данных
 * @memberof module:UAMS~User
 * @this User
 */
User.statics.countUserBySignUpTime = function(age){
	let defer = Q.defer();
	let promise = this.count({created:{$gte: age.toISOString()} }).exec();
	promise
		.then(function(counter){
			defer.fulfill(counter);
		})
		.catch(function(err){
			defer.reject(new DbError(err, 500));
		});
	return defer.promise;
};

/**
 * Подсчет сколько пользователей было зарегистрировано начиная с какого-то времени
 * @function countAllUsers
 * @returns {promise}
 * @fulfill {number} - количетсво пользователей
 * @reject {DbError}, 500 - ошибка базы данных
 * @memberof module:UAMS~User
 * @this User
 */
User.statics.countAllUsers = function(){
	let defer = Q.defer();
	let promise = this.count({}).exec();
	promise
		.then(function(counter){
			defer.fulfill(counter);
		})
		.catch(function(err){
			defer.reject(new DbError(err, 500));
		});
	return defer.promise;
};
