"use strict";

let Util = require('util'),
	DbError = require("@anzuev/studcloud.errors").DbError,
	AuthError = require("@anzuev/studcloud.errors").AuthError,
	Q = require('q'),
	User = require("@anzuev/studcloud.datamodels").User,
	Mongoose = require('mongoose'),
	Crypto = require("crypto");

const logger = require('../libs/logger').getLogger();


/**
 * Зашифровка пароля
 * @function encryptPassword
 * @param password - пароль
 * @memberof module:UAMS~User
 * @instance
 * @this {User}
 * @returns {string} password - зашифрованный пароль
 */
User.methods.encryptPassword = function(password){
	return Crypto.createHmac('sha1',this.auth.salt).update(password + "").digest("hex");
};

/**
 * @this {User}
 */
User.virtual('auth.password')
	.set(function(password) {
		this.auth._plainPassword = password;
		this.auth.salt = Math.random() + "";
		this.auth.hashed_password = this.encryptPassword(password);
	})
	.get(function() { return this._plainPassword;});


User.statics.createUser = function*(authData){
	let User = this;

	let user;
	try{
		user = yield User.findOne({"auth.mail": authData.mail});
	}catch(err){
		throw new DbError(err, 500);
	}

	if(user){
		throw new AuthError(400, Util.format("mail %s already in use", authData.mail));
	}
	let key = Crypto.createHmac('sha1', Math.random() + "").update(authData.mail).digest("hex").toString();
	let newUser = new User({
		pubInform:{
			name: authData.name,
			surname: authData.surname
		},
		auth:{
			mail: authData.mail,
			password: authData.password
		},
		authActions:{
			mailSubmit:{
				key: key
			}
		}
	});
	return yield* newUser.saveUser();
};



