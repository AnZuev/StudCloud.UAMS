"use strict";

let User = require("@anzuev/studcloud.datamodels").User,
	Util = require('util'),
	Q = require("q");

let ValidationError = require("@anzuev/studcloud.errors").ValidationError,
	DbError = require("@anzuev/studcloud.errors").DbError;

/**
 * Get users by one key(query)
 * @param query
 * @returns {*|promise}
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
 * @param query
 * @returns {*|promise}
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
 *
 * @param university
 * @returns {*|promise}
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
 *
 * @param faculty
 * @returns {*|promise}
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
 *
 * @param query
 * @property university
 * @property faculty
 * @property group
 * @returns {*|promise}
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
 *
 * @param year
 * @returns {*|promise}
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







