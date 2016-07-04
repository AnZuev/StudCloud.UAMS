"use strict";

let Util = require('util'),
	DbError = require("@anzuev/studcloud.errors").DbError,
	Q = require('q'),
	User = require('./User');
	Mongoose = require('mongoose');


/**
 *
 * @param key
 * @param context
 * @returns {*|promise}
 */
User.methods.getContactsByOneKey = function(key, context){
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
};


/**
 *
 * @param key1
 * @param key2
 * @param context
 * @returns {*|promise}
 */
User.methods.getContactsByTwoKeys = function(key1, key2, context){
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


/**
 *
 * @param context
 * @returns {*|promise}
 */
User.methods.getContactsByContext = function(context){
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



/**
 *
 * @param query
 * @param context
 * @returns {*}
 */
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

