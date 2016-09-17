"use strict";

let User = require("@anzuev/studcloud.datamodels").User,
	Util = require('util'),
	Q = require("q");


let ValidationError = require("@anzuev/studcloud.errors").ValidationError,
	DbError = require("@anzuev/studcloud.errors").DbError;

/* константы */
let perPage = 20;


/**
 * Получение пользователей, у которых подтверждена почта
 * @param skip - сколько пропустить сначала
 * @throws {ValidationError}, 400 - значение skip не может быть меньше нуля
 * @returns {promise}
 * @fulfill {User[]} - массив пользователей
 * @reject {DbError}, 204 - ничего не найдено
 * @reject {DbError}, 500 - ошибка базы данных
 * @memberof module:UAMS~User
 * @this User
 * @function getUsersByMailConfirmation
 * @private
 */

User.statics.getUsersByMailConfirmation = function(skip){

	if(skip < 0) throw new ValidationError(400, '@param skip cannot be less than 0');
	let query = {};
	query['authActions.mailSubmit.done'] = true;

	let deffer = Q.defer();

	let promise = this.find(query).limit(perPage).skip(perPage * skip).exec();

	promise.then(function(users){
		if(users.length) deffer.fulfill(users);
		else {
			deffer.reject(new DbError(null, 204, Util.format('No users found with mail confirmed')));
		}
	}).catch(function(err){
		if(err) deffer.reject(new DbError(err, 500));
	});

	return deffer.promise;

};


/**
 * Подсчет пользователей с подтвержденной почтой
 *
 * @returns {promise}
 * @fulfill {number} - количетсво пользователей
 * @reject {DbError}, 500 - ошибка базы данных
 * @memberof module:UAMS~User
 * @this User
 * @function countUsersByMailConfirmation
 * @private
 * */
User.statics.countUsersByMailConfirmation = function(){

	let query = {};
	query['authActions.mailSubmit.done'] = true;

	let deffer = Q.defer();

	let promise = this.find(query).count().exec();

	promise.then(function(counter){
		deffer.fulfill(counter);
	}).catch(function(err){
		if(err) deffer.reject(new DbError(err, 500));
	});

	return deffer.promise;

};



/**
 * Получение пользователей, у которых подтвержден номер телефона
 * @param skip - сколько пропустить сначала
 * @throws {ValidationError}, 400 - значение skip не может быть меньше нуля
 * @returns {promise}
 * @fulfill {User[]} - массив пользователей
 * @reject {DbError}, 204 - ничего не найдено
 * @reject {DbError}, 500 - ошибка базы данных
 * @memberof module:UAMS~User
 * @this User
 * @function countUsersByMobileConfirmation
 * @private
 */
User.statics.getUsersByMobileConfirmation = function(skip){

	if(skip < 0) throw new ValidationError(400, '@param skip cannot be less than 0');
	let query = {};
	query['authActions.mobileSubmit.done'] = true;

	let deffer = Q.defer();

	let promise = this.find(query).limit(perPage).skip(perPage * skip).exec();

	promise.then(function(users){
		if(users.length) deffer.fulfill(users);
		else {
			deffer.reject(new DbError(null, 204, Util.format('No users found with mobile confirmed')));
		}
	}).catch(function(err){
		if(err) deffer.reject(new DbError(err, 500));
	});

	return deffer.promise;

};

/**
 * Подсчет пользователей с подтвержденным номером телефона
 * @returns {promise}
 * @fulfill {number} - количетсво пользователей
 * @reject {DbError}, 500 - ошибка базы данных
 * @memberof module:UAMS~User
 * @this User
 * @function countUsersByMobileConfirmation
 * @private
 * */
User.statics.countUsersByMobileConfirmation = function(){

	let query = {};
	query['authActions.mobileSubmit.done'] = true;

	let deffer = Q.defer();

	let promise = this.find(query).count().exec();

	promise.then(function(counter){
		deffer.fulfill(counter);
	}).catch(function(err){
		if(err) deffer.reject(new DbError(err, 500));
	});

	return deffer.promise;

};

/**
 * Получение пользователей, у которых подтвержден документ
 * @param skip - сколько пропустить сначала
 * @throws {ValidationError}, 400 - значение skip не может быть меньше нуля
 * @returns {promise}
 * @fulfill {User[]} - массив пользователей
 * @reject {DbError}, 204 - ничего не найдено
 * @reject {DbError}, 500 - ошибка базы данных
 * @memberof module:UAMS~User
 * @this User
 * @function getUsersByDocumentConfirmation
 * @private
 */
User.statics.getUsersByDocumentConfirmation = function(skip){

	if(skip < 0) throw new ValidationError(400, '@param skip cannot be less than 0');
	let query = {};
	query['authActions.documentSubmit.done'] = true;

	let deffer = Q.defer();

	let promise = this.find(query).limit(perPage).skip(perPage * skip).exec();

	promise.then(function(users){
		if(users.length) deffer.fulfill(users);
		else {
			deffer.reject(new DbError(null, 204, Util.format('No users found with document confirmed')));
		}
	}).catch(function(err){
		if(err) deffer.reject(new DbError(err, 500));
	});

	return deffer.promise;

};

/**
 * Подсчет пользователей с подтвержденным документом
 * @returns {promise}
 * @fulfill {number} - количетсво пользователей
 * @reject {DbError}, 500 - ошибка базы данных
 * @memberof module:UAMS~User
 * @this User
 * @function countUsersByDocumentConfirmation
 * @private
 * */
User.statics.countUsersByDocumentConfirmation = function(){

	let query = {};
	query['authActions.documentSubmit.done'] = true;

	let deffer = Q.defer();

	let promise = this.find(query).count().exec();

	promise.then(function(counter){
		deffer.fulfill(counter);
	}).catch(function(err){
		if(err) deffer.reject(new DbError(err, 500));
	});

	return deffer.promise;

};


/**
 * Получение пользователей, у которых ожидается варификация документа
 * @param skip - сколько пропустить сначала
 * @throws {ValidationError}, 400 - значение skip не может быть меньше нуля
 * @returns {promise}
 * @fulfill {User[]} - массив пользователей
 * @reject {DbError}, 204 - ничего не найдено
 * @reject {DbError}, 500 - ошибка базы данных
 * @memberof module:UAMS~User
 * @this User
 * @alert - метод не работает
 * @function getUsersByDocumentVarificationRequired
 * @private
 */
//TODO продумать каким образом понимать, что требуется проверка документа
User.statics.getUsersByDocumentVarificationRequired = function(skip){
	if(skip < 0) throw new ValidationError(400, '@param skip cannot be less than 0');
	let query = {};
	query['authActions.documentSubmit.done'] = true;

	let deffer = Q.defer();

	let promise = this.find(query).limit(perPage).skip(perPage * skip).exec();

	promise.then(function(users){
		if(users.length) deffer.fulfill(users);
		else {
			deffer.reject(new DbError(null, 204, Util.format('No users found with document confirmed')));
		}
	}).catch(function(err){
		if(err) deffer.reject(new DbError(err, 500));
	});

	return deffer.promise;
};


