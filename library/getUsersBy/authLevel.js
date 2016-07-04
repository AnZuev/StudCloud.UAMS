"use strict";

let User = require("@anzuev/studcloud.datamodels").User,
	Util = require('util'),
	Q = require("q");


let ValidationError = require("@anzuev/studcloud.errors").ValidationError,
	DbError = require("@anzuev/studcloud.errors").DbError;

/* константы */
let perPage = 20;

/**
 *
 * @param skip - сколько пропустить сначала
 * @returns {*|promise}
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
 *
 * @returns {*|promise}
 */
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
 *
 * @param skip - сколько пропустить сначала
 * @returns {*|promise}
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
 *
 * @returns {*|promise}
 */
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
 *
 * @param skip - сколько пропустить сначала
 * @returns {*|promise}
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
 *
 * @returns {*|promise}
 */
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
 *
 * @param skip
 * @returns {*|promise}
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


