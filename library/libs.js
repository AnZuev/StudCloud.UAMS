"use strict";

let Util = require('util'),
	DbError = require("@anzuev/studcloud.errors").DbError,
	Q = require('q'),
	User = require("@anzuev/studcloud.datamodels").User,
	Mongoose = require('mongoose');

const logger = require('../libs/logger').getLogger();


/**
 * @type {exports|module.exports}
 */
/**
 * @this {User}
 * @memberof module:UAMS~User
 * @instance
 * Безопасное сохранение пользователя. В случае ошибки пытается сохранить еще раз. Максимальное
 * количество попыток - 5
 * @throws {DbError} 500, ошибка базы данных
 * @returns {user} все прошло хорошо, вернулся объект типа user
 */
function* saveUser (){
	let errCounter = 5;
	let user;
	while(errCounter > 0){
		try{
			user = yield this.save();
			break;
		}catch(err){
			errCounter--;
			logger.error(new DbError(err, 500, 'Ошибка при сохранении пользователя, колличество ошибок - %d', 5 - errCounter));
		}
	}
	return user;
}
User.methods.saveUser = saveUser;


/**
 * Блокировка пользователя(меняет состояние state на blocked);
 * @memberof module:UAMS~User
 * @instance
 * @function block
 * @returns {void}
 *
 */
User.methods.block = function(){
	this.state = "Blocked";
};



/**
 * Блокировка пользователя(меняет состояние state на blocked) + сохранение
 * @memberof module:UAMS~User
 * @static
 * @function blockUser
 * @returns {void}
 *
 */
User.statics.blockUser = function*(userId){
	let user = yield this.getUserById(userId);
	user.block();
	yield* user.saveUser();
};


/**
 * Удаление пользователя по id
 * @memberof module:UAMS~User
 * @static
 * @param userId - идентификатор пользователя
 * @returns {*|promise}
 */
User.statics.removeUser = function(userId){
	let deffer = Q.defer();
	let promise = this.remove({_id: userId}).exec();

	promise.then(function(result){
			if(result.n == 1) {
				deffer.fulfill(true);
			} else{
				deffer.reject(new DbError(null, 400, Util.format('No user found by id = %s', userId)));
			}
		})
		.catch(function(err){
			deffer.reject(new DbError(err, 500, 'Error in User.removeUser function'));
		});

	return deffer.promise;
};


/**
 * Check password
 * @param password - пароль для проверки
 * @returns {boolean}. true - пароль верен, false - пароль неверен
 * @this {User}
 * @instance
 * @memberof module:UAMS~User
 */
function checkPassword (password){
	return (this.encryptPassword(password) === this.auth.hashed_password);
};
User.methods.checkPassword = checkPassword;


/**
 * Получение уровня авторизации
 * @memberof module:UAMS~User
 * @returns {number} - 1, 2, 3, 4
 * @this {User}
 * @instance
 *
 */
function getAuthLevel(){
	if(this.authActions.documentSubmit.done){
		return 4;
	}else if(this.authActions.mobileSubmit.done){
		return 3;
	}else if(this.authActions.mailSubmit.done){
		return 2;
	}else{
		return 1;
	}
};
User.methods.getAuthLevel = getAuthLevel;

/**
 * Пользователь принадлежит группе?
 * @param group - группа
 * @memberof module:UAMS~User
 * @this {User}
 * @instance
 * @returns {boolean}, true - принадлежит, false - не принадлежит
 */
function isInGroup(group){
	return (this.pubInform.group == group);
};
User.methods.isInGroup = isInGroup;