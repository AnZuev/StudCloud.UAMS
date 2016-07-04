"use strict";

let Util = require('util'),
	DbError = require("@anzuev/studcloud.errors").DbError,
	Q = require('q'),
	User = require("@anzuev/studcloud.datamodels").User,
	Mongoose = require('mongoose'),
	Crypto = require("crypto");

/**
 *
 * @returns {string|String|*}
 */
User.methods.requestMailConfirmation = function(){
	let key = Crypto.createHmac('sha1', Math.random() + "").update(this.auth.mail).digest("hex").toString();
	this.authActions.mailSubmit.key = key;
	return key;
};


/**
 *
 * @param key
 * @returns {boolean}
 */
User.methods.confirmMail = function(key){
	if(key.length == 0) throw new ValidationError(400, 'Key can not be empty');
	if(key == this.authActions.mailSubmit.key){
		this.authActions.mailSubmit.key = '';
		this.authActions.mailSubmit.done = true;
		return true;
	}else{
		return false;
	}
};


/**
 *
 * @returns {string|String|*}
 */
User.methods.requestMobileConfirmation = function(){
	var key = Math.random() * 90000 + 10000;
	this.authActions.mobileSubmit.key = key;
	return key;
};

/**
 *
 * @param key
 * @returns {boolean}
 */
User.methods.confirmMobile = function(key){
	if(key.length == 0) throw new ValidationError(400, 'Key can not be empty');
	if(key == this.authActions.mobileSubmit.key){
		this.authActions.mobileSubmit.key = '';
		this.authActions.mobileSubmit.done = true;
		return true;
	}else{
		return false;
	}
};


/**
 * request password change(if mail activated - generate key for password change, otherwise - ValidationError)
 */
User.methods.requestPasswordChange = function(){
	if(!this.authActions.mailSubmit.done) {
		throw new ValidationError(405, "Password change is allowed only for users with confirmed mail");
	}
	let key = Crypto.createHmac('sha1', Math.random() + "").update(this.auth.mail).digest("hex").toString();
	this.authActions.changePassword.key = key;
};

/**
 *
 * @param key
 * @returns {boolean}
 */
User.methods.confirmPasswordToken = function(key){
	if(key.length == 0){
		throw new ValidationError(400, 'Key can not be empty');
	}
	if(key == this.authActions.changePassword.key){
		this.authActions.changePassword.key = '';
		return true;
	}else{
		return false;
	}
};


