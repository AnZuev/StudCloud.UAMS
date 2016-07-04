"use strict";

let Util = require('util'),
	DbError = require("@anzuev/studcloud.errors").DbError,
	AuthError = require("@anzuev/studcloud.errors").AuthError,
	Q = require('q'),
	User = require("@anzuev/studcloud.datamodels").User,
	Mongoose = require('mongoose'),
	Crypto = require("crypto");


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



