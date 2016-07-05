/**
 * @module UAMS
 */

'use strict';
const logger = require('./libs/logger');
let User = require('./library'),
	connection = require("./libs/connections").users,
	Mongoose = require("mongoose");


let ValidationError = require("@anzuev/studcloud.errors").ValidationError;
let DbError = require("@anzuev/studcloud.errors").DbError;


/**
 *
 * @constructor
 * @this {UAMS}
 *
 */
function UAMS(){
	this.init();
}

/**
 *  Инициализация модуля. Здесь проверяем соединение к базе данных.
 *  @throws {Error}- не указано соединение для коллекции 'users'
 *
 */
UAMS.prototype.init = function(){
	if(!connection){
		let err = new Error("No connection specified for 'users' collection");
		logger.error(err);
		throw err;
	}else{
		this._Users = connection.model("User", User);
	}
};



/**
 * Получение пользователя по id
 * @param id - идентификатор пользователя
 * @returns {user} объект типа user
 * @throws {DbError} - 404, пользователь не найден
 * @throws {DbError} - 500, ошибка базы данных
 */
UAMS.prototype.getUserById = function*(id){
	id = Mongoose.Types.ObjectId(id);
	return yield this._Users.getUserById(id);
};


/**
 * Получение пользователя по почте
 * @param mail - почтовый адрес
 * @returns {user} объект типа user
 * @throws {DbError} - 404, пользователь не найден
 * @throws {DbError} - 500, ошибка базы данных
 */
UAMS.prototype.getUserByMail = function*(mail){
	return yield this._Users.getUserByMail(mail);
};


/**
 * Получение пользователя по номеру телефона
 * @param phone{string} - номер телефона
 * @returns {user} объект типа user
 * @throws {DbError} - 404, пользователь не найден
 * @throws {DbError} - 500, ошибка базы данных
 */
UAMS.prototype.getUserByPhone = function*(phone){
	return yield this._Users.getUserByPhone(phone);
};


/**
 * Поиск пользователей по ключу и контексту.
 * @param key - регулярное выражение, сгенерированное на основе данных от пользователя.
 * @param {object} context - контекст поиска. Возможны проверти university(objectId), faculty(objectId), year(number), group(string)
 * @returns [user] массив из объектов типа user, если хотя бы один пользователь найден
 * @throws {DbError} - 204, не найдено пользователей, удовлетворяющих условиям
 * @throws {DbError} - 500, ошибка базы данных
 */
UAMS.prototype.getUsersByKeyAndContext = function*(key, context){
	let query = {
		$or:[
			{"pubInform.name": {$regex: key}},
			{"pubInform.surname": {$regex: key}}
		]
	};

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

	return yield this._Users.getUsersByOneKey(query);
};


/**
 * Поиск пользователей по двум ключам и контексту
 * @param key1 - регулярное выражение, сгенерированное на основе данных от пользователя.
 * @param key2 - регулярное выражение, сгенерированное на основе данных от пользователя.
 * @param {object} context - контекст поиска. Возможны проверти university(objectId), faculty(objectId), year(number), group(string)
 * @returns [user] массив из объектов типа user, если хотя бы один пользователь найден
 * @throws {DbError} - 204, не найдено пользователей, удовлетворяющих условиям
 * @throws {DbError} - 500, ошибка базы данных
 */
UAMS.prototype.getUsersByTwoKeysAndContext = function*(key1, key2, context){
	let query =
	{
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

		]
	};
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

	return yield this._Users.getUsersByTwoKeys(query);
}


/**
 * Поиск пользователей по университету
 * @param {Mongoose.Types.ObjectId} university - id университета
 * @returns [user] массив из объектов типа user, если хотя бы один пользователь найден
 * @throws {DbError} - 204, не найдено пользователей, удовлетворяющих условиям
 * @throws {DbError} - 500, ошибка базы данных
 */
UAMS.prototype.getUsersByUniversity = function*(university){
	return yield this._Users.getUsersByUniversity(university);
};



/**
 * Поиск пользователей по факультету
 * @param {Mongoose.Types.ObjectId} faculty - id факультета
 * @returns [user] массив из объектов типа user, если хотя бы один пользователь найден
 * @throws {DbError} - 204, не найдено пользователей, удовлетворяющих условиям
 * @throws {DbError} - 500, ошибка базы данных
 */
UAMS.prototype.getUsersByFaculty = function*(faculty){
	return yield this._Users.getUsersByFaculty(faculty);
};


/**
 * Поиск пользователей по группе
 * @param {Mongoose.Types.ObjectId} university - id университета
 * @param {Mongoose.Types.ObjectId} faculty - id факультета
 * @param {Mongoose.Types.ObjectId} group - группа(string)
 * @returns [user] массив из объектов типа user, если хотя бы один пользователь найден
 * @throws {DbError} - 204, не найдено пользователей, удовлетворяющих условиям
 * @throws {DbError} - 500, ошибка базы данных
 */
UAMS.prototype.getUsersByGroup = function*(university, faculty, group){
	let query = {};
	if(university){
		query["pubInform.university"] = university;
	}else{
		throw new ValidationError(400, "No university specified");
	}
	if(faculty){
		query["pubInform.faculty"] = faculty;
	}else{
		throw new ValidationError(400, "No faculty specified");
	}
	if(group){
		query["pubInform.group"] = group;
	}else{
		throw new ValidationError(400, "No group specified");
	}

	return yield this._Users.getUsersByGroup(query);
};

/**
 * Поиск пользователей по курсу
 * @param {Mongoose.Types.ObjectId} year - год обучения(курс)
 * @returns [user] массив из объектов типа user, если хотя бы один пользователь найден
 * @throws {DbError} - 204, не найдено пользователей, удовлетворяющих условиям
 * @throws {DbError} - 500, ошибка базы данных
 */
UAMS.prototype.getUsersByYear = function*(year){
	return yield this._Users.getUsersByYear(year);
};


/**
 * Поиск пользователей с подтвержденной почтой
 * @param skip - сколько страниц сначала необходимо пропустить. На странице 20 элементов.
 * @returns [user] массив из объектов типа user, если хотя бы один пользователь найден
 * @throws ValidationError - 400, параметр skip < 0
 * @throws {DbError} - 204, не найдено пользователей, удовлетворяющих условиям
 * @throws {DbError} - 500, ошибка базы данных
 */
UAMS.prototype.getUsersByMailConfirmation = function*(skip){
	return yield this._Users.getUsersByMailConfirmation(skip);
};


/**
 * Подсчет количества пользователей с подтвержденной почтой
 * @returns {number} Количество пользователей
 * @throws {DbError} - 500, ошибка базы данных
 */
UAMS.prototype.countUsersByMailConfirmation = function*(){
	return yield this._Users.countUsersByMailConfirmation();
};

/**
 * Поиск пользователей с подтвержденным номером телефона
 * @param skip - сколько страниц сначала необходимо пропустить. На странице 20 элементов.
 * @returns [user] массив из объектов типа user, если хотя бы один пользователь найден
 * @throws ValidationError - 400, параметр skip < 0
 * @throws {DbError} - 204, не найдено пользователей, удовлетворяющих условиям
 * @throws {DbError} - 500, ошибка базы данных
 */
UAMS.prototype.getUsersByMobileConfirmation = function*(skip){
	return yield this._Users.getUsersByMobileConfirmation(skip);
};

/**
 * Подсчет количества пользователей с подтвержденным номером телефона
 * @returns {number} Количество пользователей
 * @throws {DbError} - 500, ошибка базы данных
 */
UAMS.prototype.countUsersByMobileConfirmation = function*(){
	return yield this._Users.countUsersByMobileConfirmation();
};



/**
 * Подсчет новых пользователей за сегодня
 * @returns {number} Количество пользователей
 * @throws {DbError} - 500, ошибка базы данных
 */
UAMS.prototype.countNewUsersToday = function*(){
	let now = new Date();
	let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	return yield this._Users.countUserBySignUpTime(today);
};

/**
 * Подсчет новых пользователей за неделю
 * @returns {number} Количество пользователей
 * @throws {DbError} - 500, ошибка базы данных
 */
UAMS.prototype.countNewUsersThisWeek = function*(){
	let now = new Date();
	var thisWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
	return yield this._Users.countUserBySignUpTime(thisWeek);
};

/**
 * Подсчет новых пользователей за месяц
 * @returns {number} Количество пользователей
 * @throws {DbError} - 500, ошибка базы данных
 */
UAMS.prototype.countNewUsersThisMonth = function*(){
	let now = new Date();
	var thisMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
	return yield this._Users.countUserBySignUpTime(thisMonth);
};


/**
 * Подсчет новых пользователей за год
 * @returns {number} Количество пользователей
 * @throws {DbError} - 500, ошибка базы данных
 */
UAMS.prototype.countNewUsersThisYear = function*(){
	let now = new Date();
	var thisYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
	return yield this._Users.countUserBySignUpTime(thisYear);
};

/**
 * Подсчет новых пользователей за все время
 * @returns {number}Количество пользователей
 * @throws {DbError} - 500, ошибка базы данных
 */
UAMS.prototype.countAllUsers = function*(){
	return yield this._Users.countAllUsers();
};

/**
 * Создание нового пользователя
 * @param authData - данные для авторизации. Пропирти можно увидеть в пункте properties
 * @property mail - почтовый адрес
 * @property password - пароль
 * @property name - имя пользователя
 * @property surname - пароль
 * @returns {user} объект типа user, если все прошло успешно
 * @throws {ValidationError} 400, Mail is incorrect - длина почты меньше 5
 * @throws {ValidationError} 400, Password is too weak - длина пароля меньше 5
 * @throws {ValidationError} 400, Incorrect personal info - имя или фамилия не переданы
 * @throws {AuthError} 400, mail {mail} already in use - почта уже кем-то используется
 * @throws {DbError} - 500, ошибка базы данных
 */
UAMS.prototype.createUser = function*(authData){
	if(authData.mail.length < 5) throw new ValidationError(400, 'Mail is incorrect');
	if(authData.password.length < 5) throw new ValidationError(400, 'Password is too weak');
	if(!(authData.name && authData.surname)) throw new ValidationError(400, 'Incorrect personal info');

	try{
		let user = yield* this._Users.createUser(authData);
	}catch(err){
		logger.warn(err);
		throw err;
	}
	logger.trace('new user with mail added %s', authData.mail);
	return user;
};


/**
 * Блокировка юзера
 * @param userId - идентификатор пользователя
 * @returns {boolean} true - все прошло хорошо
 * @throws {DbError} - 404, пользователь не найден
 * @throws {DbError} - 500, ошибка базы данных
 */
UAMS.prototype.blockUser = function*(userId){
	userId = Mongoose.Types.ObjectId(userId);
	yield* this._Users.blockUser(userId);
	return true;
};

/**
 * Удаление пользователя по идентификатору
 * @param userId - идентификатор пользователя
 * @returns {boolean} true - все прошло хорошо
 * @throws {DbError} - 400, пользователь не найден
 * @throws {DbError} - 500, ошибка базы данных
 *
 */
UAMS.prototype.removeUser = function*(userId){
	userId = Mongoose.Types.ObjectId(userId);
	try{
		return yield this._Users.removeUser(userId);
	}catch(err){
		logger.error(err);
		throw err;
	}
};


module.exports = new UAMS();

