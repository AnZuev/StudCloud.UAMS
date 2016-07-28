"use strict";

let Util = require('util'),
	DbError = require("@anzuev/studcloud.errors").DbError,
	Q = require('q'),
	User = require("@anzuev/studcloud.datamodels").User,
	Mongoose = require('mongoose'),
	Crypto = require("crypto");

const logger = require('../libs/logger').getLogger();


/**
 * Запрос создания ключа для подтверждения почты
 * @returns {string} Новый ключ
 * @this User
 * @memberof module:UAMS~User
 * @instance
 */
function requestMailConfirmation(){
	let key = Crypto.createHmac('sha1', Math.random() + "").update(this.auth.mail).digest("hex").toString();
	this.authActions.mailSubmit.key = key;
	return key;
};
User.methods.requestMailConfirmation = requestMailConfirmation


/**
 * Подтверждение почты
 * @param key - ключ для подтверждения(длина больше 0)
 * @throws {ValidationError} - ключ не может быть пустым
 * @returns {boolean} true - почта подтверждена, false - почта не подтверждена
 * @this User
 * @memberof module:UAMS~User
 * @instance
 */
function confirmMail(key){
	if(key.length == 0) throw new ValidationError(400, 'Key can not be empty');
	if(key == this.authActions.mailSubmit.key){
		this.authActions.mailSubmit.key = '';
		this.authActions.mailSubmit.done = true;
		return true;
	}else{
		return false;
	}
};
User.methods.confirmMail = confirmMail;


/**
 * Запрос ключа для подтверждения номера телефона
 * @returns {string} - ключ
 * @this User
 * @memberof module:UAMS~User
 * @instance
 */
function requestMobileConfirmation(){
	var key = (Math.random() * 90000 + 10000).toString();
	this.authActions.mobileSubmit.key = key;
	return key;
};
User.methods.requestMobileConfirmation = requestMobileConfirmation;

/**
 * Подтверждение мобильного телефона
 * @param key - ключ для подтверждения(длина больше 0)
 * @throws {ValidationError} 400, ключ не может быть пустым
 * @returns {boolean} true - номер телефона подтвержден, false - номер телефона не подтвержден
 * @this User
 * @memberof module:UAMS~User
 * @instance
 */
function confirmMobile(key){
	if(key.length == 0) throw new ValidationError(400, 'Key can not be empty');
	if(key == this.authActions.mobileSubmit.key){
		this.authActions.mobileSubmit.key = '';
		this.authActions.mobileSubmit.done = true;
		return true;
	}else{
		return false;
	}
};
User.methods.confirmMobile = confirmMobile;


/**
 * Запрос ключа для смены пароля
 * @throws {ValidationError} 405, Для смены пароля необходимо, чтобы почта была подтверждена
 * @this User
 * @memberof module:UAMS~User
 * @instance
 */
function requestPasswordChange(){
	if(!this.authActions.mailSubmit.done) {
		throw new ValidationError(405, "Password change is allowed only for users with confirmed mail");
	}
	let key = Crypto.createHmac('sha1', Math.random() + "").update(this.auth.mail).digest("hex").toString();
	this.authActions.changePassword.key = key;
	return key;
};
User.methods.requestPasswordChange = requestPasswordChange;

/**
 * Подтверждение смены пароля
 * @param key - ключ для подветржения
 * @throws {ValidationError} 400, ключ не может быть пустым
 * @returns {boolean} true - ключ подходит, false - ключ не подходит
 * @this User
 * @memberof module:UAMS~User
 * @instance
 */
function confirmPasswordToken(key){
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
User.methods.confirmPasswordToken = confirmPasswordToken;

