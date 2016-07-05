"use strict";


let Util = require('util'),
	DbError = require("@anzuev/studcloud.errors").DbError,
	Q = require('q'),
	User = require("@anzuev/studcloud.datamodels").User,
	Mongoose = require('mongoose');


/**
 * @type {exports|module.exports}
 */

/**
 * Получение контактов пользователя по ключу и контексту
 *
 * @param key - ключ(регулярное выражение)
 * @param context - объект. Поддерживаемые значения - university, faculty, year, group
 * @returns {promise}
 * @fulfil {user} - объект вида user
 * @reject {DbError} 204, не найдено контактов
 * @reject {DbError} 500, ошибка базы данных
 */
function getContactsByOneKey(key, context){
	let deffer = Q.defer();
	let query = {
		$or:[
			{"pubInform.name": {$regex: key}},
			{"pubInform.surname": {$regex: key}}
		],
		"contacts": this._id
	};

	query = fillQueryWithContext(query, context);

	var promise = this.find(query).limit(5).exec();
	promise.then(function(contacts){
		if(contacts) deffer.fulfill(contacts);
		else {
			deffer.reject(new DbError(null, 204, Util.format('No contacts found')));
		}
	}).catch(function(err){
		if(err) deffer.reject(new DbError(err, 500));
	});
	return deffer.promise;
}
User.methods.getContactsByOneKey = getContactsByOneKey;


/**
 * Получение контактов пользователя по двум ключам и контексту
 *
 * @param key1 - ключ(регулярное выражение)
 * @param key2 - ключ(регулярное выражение)
 * @param context - объект. Поддерживаемые значения - university, faculty, year, group
 * @returns {promise}
 * @fulfil {user} - объект вида user
 * @reject {DbError} 204, не найдено контактов
 * @reject {DbError} 500, ошибка базы данных
 */
function getContactsByTwoKeys(key1, key2, context){
	let deffer = Q.defer();

	let query = {
		$or:[
			{
				$and:[
					{"pubInform.name": {$regex:key1}},
					{"pubInform.surname": {$regex:key2}}
				]
			},
			{
				$and:[
					{"pubInform.name": {$regex:key2}},
					{"pubInform.surname": {$regex:key1}}
				]
			}
		],
		"contacts": this._id
	};

	query = fillQueryWithContext(query, context);

	var promise = this.find(query).limit(5).exec();
	promise.then(function(contacts){
		if(contacts) deffer.fulfill(contacts);
		else {
			deffer.reject(new DbError(null, 204, Util.format('No contacts found')));
		}
	}).catch(function(err){
		if(err) deffer.reject(new DbError(err, 500));
	});
	return deffer.promise;
};
User.methods.getContactsByTwoKeys = getContactsByTwoKeys;


/**
 * Получение контактов пользователя по контексту
 *
 * @param context - объект. Поддерживаемые значения - university, faculty, year, group
 * @returns {promise}
 * @fulfil {user} - объект вида user
 * @reject {DbError} 204, не найдено контактов
 * @reject {DbError} 500, ошибка базы данных
 */
function getContactsByContext(context){
	let deffer = Q.defer();

	let query = {
		"contacts": this._id
	};

	query = fillQueryWithContext(query, context);

	var promise = this.find(query).limit(5).exec();
	promise.then(function(contacts){
		if(contacts) deffer.fulfill(contacts);
		else {
			deffer.reject(new DbError(null, 204, Util.format('No contacts found')));
		}
	}).catch(function(err){
		if(err) deffer.reject(new DbError(err, 500));
	});
	return deffer.promise;
};
User.methods.getContactsByContext = getContactsByContext;




function fillQueryWithContext(query, context){
	if(context.university){
		query["pubInform.university"] = context.university;
	}
	if(context.faculty){
		query["pubInform.faculty"] = context.faculty;
	}
	if(context.group){
		query["pubInform.group"] = context.group;
	}
	if(context.year){
		query["pubInform.year"] = context.year;
	}
	return query;
}

