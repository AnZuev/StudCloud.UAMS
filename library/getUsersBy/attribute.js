"use strict";

let User = require("@anzuev/studcloud.datamodels").User,
	Util = require('util'),
	Q = require("q");

let ValidationError = require("@anzuev/studcloud.errors").ValidationError,
	DbError = require("@anzuev/studcloud.errors").DbError;

/**
 * Get users by one key(query)
 * @function getUsersByOneKey
 * @private
 * @param query
 * @returns {promise}
 * @fulfill {User[]} - массив пользователей
 * @reject {DbError}, 204 - ничего не найдено
 * @reject {DbError}, 500 - ошибка базы данных
 * @memberof module:UAMS~User
 */
User.statics.getUsersByOneKey = function(query){
	let deffer = Q.defer();

	var promise = this.find(query).limit(5).exec();

	promise.then(function(users){
		if(users) deffer.fulfill(users);
		else {
			deffer.reject(new DbError(null, 204, Util.format('No users found by key')));
		}
	}).catch(function(err){
		if(err) deffer.reject(new DbError(err, 500));
	});

	return deffer.promise;
};

/**
 * Get users by 2 keys
 * @param query - запрос
 * @private
 * @returns {promise}
 * @fulfill {User[]} - массив пользователей
 * @reject {DbError}, 204 - ничего не найдено
 * @reject {DbError}, 500 - ошибка базы данных
 * @this User
 * @memberof module:UAMS~User
 * @function getUsersByTwoKeys
 */
User.statics.getUsersByTwoKeys = function(query){
	let deffer = Q.defer();
	var promise = this.find(query).limit(5).exec();

	promise.then(function(users){
		if(users.length) deffer.fulfill(users);
		else {
			deffer.reject(new DbError(null, 204, Util.format('No users found by keys')));
		}
	}).catch(function(err){
		if(err) deffer.reject(new DbError(err, 500));
	});

	return deffer.promise;
};


/**
 * Получение пользователей по университету
 * @param university - идентификатор университета
 * @returns {promise}
 * @fulfill {User[]} - массив пользователей
 * @reject {DbError}, 204 - ничего не найдено
 * @reject {DbError}, 500 - ошибка базы данных
 * @memberof module:UAMS~User
 * @private
 * @this User
 * @function getUsersByUniversity
 */
User.statics.getUsersByUniversity = function(university){
	let deffer = Q.defer();
	var promise = this.find({"pubInform.university": university}).exec();

	promise.then(function(users){
		if(users.length) deffer.fulfill(users);
		else {
			deffer.reject(new DbError(null, 204, Util.format('No users found by university %s', university)));
		}
	}).catch(function(err){
		if(err) deffer.reject(new DbError(err, 500));
	});
	return deffer.promise;
};

/**
 * Получение пользователей по факультету
 * @param faculty - идентификатор факультета
 * @returns {promise}
 * @fulfill {User[]} - массив пользователей
 * @reject {DbError}, 204 - ничего не найдено
 * @reject {DbError}, 500 - ошибка базы данных
 * @memberof module:UAMS~User
 * @private
 * @this User
 * @function getUsersByFaculty
 */
User.statics.getUsersByFaculty = function(faculty){
	let deffer = Q.defer();
	var promise = this.find({"pubInform.faculty": faculty}).exec();

	promise.then(function(users){
		if(users.length) deffer.fulfill(users);
		else {
			deffer.reject(new DbError(null, 204, Util.format('No users found by faculty %s', faculty)));
		}
	}).catch(function(err){
		if(err) deffer.reject(new DbError(err, 500));
	});
	return deffer.promise;
};


/**
 * Получение пользователя по группе
 * @param query - запрос
 * @property university - идентификатор университета
 * @property faculty - идентификатор факультета
 * @property group - группа
 * @returns {promise}
 * @fulfill {User[]} - массив пользователей
 * @reject {DbError}, 204 - ничего не найдено
 * @reject {DbError}, 500 - ошибка базы данных
 * @memberof module:UAMS~User
 * @private
 * @this User
 * @function getUsersByGroup
 */
User.statics.getUsersByGroup = function(query){
	let deffer = Q.defer();
	var promise = this.find(query).exec();

	promise.then(function(users){
		if(users.length) deffer.fulfill(users);
		else {
			deffer.reject(new DbError(null, 204, Util.format('No users found by group %s', query["pubInform.group"])));
		}
	}).catch(function(err){
		if(err) deffer.reject(new DbError(err, 500));
	});
	return deffer.promise;
};

/**
 * Получение пользователей по курсу
 * @param year - значение курса( 1-6)
 * @returns {promise}
 * @fulfill {User[]} - массив пользователей
 * @reject {DbError}, 204 - ничего не найдено
 * @reject {DbError}, 500 - ошибка базы данных
 * @memberof module:UAMS~User
 * @private
 * @this User
 * @function getUsersByYear
 */
User.statics.getUsersByYear = function(year){
	let deffer = Q.defer();
	var promise = this.find({"pubInform.year": year}).exec();

	promise.then(function(users){
		if(users.length) deffer.fulfill(users);
		else {
			deffer.reject(new DbError(null, 204, Util.format('No users found by year %s', year)));
		}
	}).catch(function(err){
		if(err) deffer.reject(new DbError(err, 500));
	});
	return deffer.promise;
};


/**
 * Получение статистики по университетам(сколько пользователей в каком университете)
 * @memberof module:UAMS~User
 * @function getStaticsByUniversity
 * @returns {Promise}
 */
User.statics.getStaticsByUniversity = function(){
	return this.aggregate([
		{
			$group:{
				_id: "$pubInform.university",
				counter:{$sum: 1}
			}
		}
	]).exec();
};







