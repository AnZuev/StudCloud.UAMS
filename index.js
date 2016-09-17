/**
 * @module UAMS
 */

'use strict';
let logger,
	Mongoose = require("mongoose");


let ValidationError = require("@anzuev/studcloud.errors").ValidationError;
let DbError = require("@anzuev/studcloud.errors").DbError;


/**
 *
 * @class UAMS
 * @this {UAMS}
 *
 */
function UAMS(){}
/**
 * Модель mongoose для работы с базой данных
 * @type {Mongoose.model}
 * @private
 * @memberor module:UAMS~User
 */

UAMS._Users = undefined;

/**
 *  Инициализация модуля. Здесь происходит попытка подключиться к бд,
 *  используя данные из конфига, а после происходит привязка модели
 *  User к данному подключению
 *  @param config - конфигурация типа nconf
 *  @throws {Error}- не указано соединение для коллекции 'users'
 *
 */
UAMS.configure = function(config){
	UAMS._config = config;
	require('./libs/connections').configure(config);
	require('./libs/logger').configure(config);
	require("@anzuev/studcloud.rds").configure(config);

	logger = require('./libs/logger').getLogger();
	let connection = require("./libs/connections").getConnections().users;
	if(!connection){
		let err = new Error("No connection specified for 'users' collection");
		logger.error(err);
		throw err;
	}else{
		let User = require('./library');
		UAMS._Users = connection.model("User", User);
	}

	logger.info("UAMS has been successfully configured and started");

	/**
	 * Получение пользователя по id
	 * @param id - идентификатор пользователя
	 * @returns {user} объект типа user
	 * @throws {DbError} - 404, пользователь не найден
	 * @throws {DbError} - 500, ошибка базы данных
	 */
	UAMS.getUserById = function*(id){
		id = Mongoose.Types.ObjectId(id);
		return yield UAMS._Users.getUserById(id);
	};


	/**
	 * Получение пользователя по почте
	 * @param mail - почтовый адрес
	 * @returns {user} объект типа user
	 * @throws {DbError} - 404, пользователь не найден
	 * @throws {DbError} - 500, ошибка базы данных
	 *
	 */
	UAMS.getUserByMail = function*(mail){
		return yield UAMS._Users.getUserByMail(mail);
	};


	/**
	 * Получение пользователя по номеру телефона
	 * @param phone{string} - номер телефона
	 * @returns {user} объект типа user
	 * @throws {DbError} - 404, пользователь не найден
	 * @throws {DbError} - 500, ошибка базы данных
	 */
	UAMS.getUserByPhone = function*(phone){
		return yield UAMS._Users.getUserByPhone(phone);
	};


	/**
	 * Поиск пользователей по ключу и контексту.
	 * @param key - регулярное выражение, сгенерированное на основе данных от пользователя.
	 * @param {object} context - контекст поиска. Возможны проверти university(objectId), faculty(objectId), year(number), group(string)
	 * @returns [user] массив из объектов типа user, если хотя бы один пользователь найден
	 * @throws {DbError} - 204, не найдено пользователей, удовлетворяющих условиям
	 * @throws {DbError} - 500, ошибка базы данных
	 */
	UAMS.getUsersByKeyAndContext = function*(key, context){
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

		return yield UAMS._Users.getUsersByOneKey(query);
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
	UAMS.getUsersByTwoKeysAndContext = function*(key1, key2, context){
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

		return yield UAMS._Users.getUsersByTwoKeys(query);
	}


	/**
	 * Поиск пользователей по университету
	 * @param {Mongoose.Types.ObjectId} university - id университета
	 * @returns [user] массив из объектов типа user, если хотя бы один пользователь найден
	 * @throws {DbError} - 204, не найдено пользователей, удовлетворяющих условиям
	 * @throws {DbError} - 500, ошибка базы данных
	 */
	UAMS.getUsersByUniversity = function*(university){
		return yield UAMS._Users.getUsersByUniversity(university);
	};



	/**
	 * Поиск пользователей по факультету
	 * @param {Mongoose.Types.ObjectId} faculty - id факультета
	 * @returns [user] массив из объектов типа user, если хотя бы один пользователь найден
	 * @throws {DbError} - 204, не найдено пользователей, удовлетворяющих условиям
	 * @throws {DbError} - 500, ошибка базы данных
	 */
	UAMS.getUsersByFaculty = function*(faculty){
		return yield UAMS._Users.getUsersByFaculty(faculty);
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
	UAMS.getUsersByGroup = function*(university, faculty, group){
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

		return yield UAMS._Users.getUsersByGroup(query);
	};

	/**
	 * Поиск пользователей по курсу
	 * @param {Mongoose.Types.ObjectId} year - год обучения(курс)
	 * @returns [user] массив из объектов типа user, если хотя бы один пользователь найден
	 * @throws {DbError} - 204, не найдено пользователей, удовлетворяющих условиям
	 * @throws {DbError} - 500, ошибка базы данных
	 */
	UAMS.getUsersByYear = function*(year){
		return yield UAMS._Users.getUsersByYear(year);
	};


	/**
	 * Поиск пользователей с подтвержденной почтой
	 * @param skip - сколько страниц сначала необходимо пропустить. На странице 20 элементов.
	 * @returns [user] массив из объектов типа user, если хотя бы один пользователь найден
	 * @throws ValidationError - 400, параметр skip < 0
	 * @throws {DbError} - 204, не найдено пользователей, удовлетворяющих условиям
	 * @throws {DbError} - 500, ошибка базы данных
	 */
	UAMS.getUsersByMailConfirmation = function*(skip){
		return yield UAMS._Users.getUsersByMailConfirmation(skip);
	};


	/**
	 * Подсчет количества пользователей с подтвержденной почтой
	 * @returns {number} Количество пользователей
	 * @throws {DbError} - 500, ошибка базы данных
	 */
	UAMS.countUsersByMailConfirmation = function*(){
		return yield UAMS._Users.countUsersByMailConfirmation();
	};

	/**
	 * Поиск пользователей с подтвержденным номером телефона
	 * @param skip - сколько страниц сначала необходимо пропустить. На странице 20 элементов.
	 * @returns [user] массив из объектов типа user, если хотя бы один пользователь найден
	 * @throws ValidationError - 400, параметр skip < 0
	 * @throws {DbError} - 204, не найдено пользователей, удовлетворяющих условиям
	 * @throws {DbError} - 500, ошибка базы данных
	 */
	UAMS.getUsersByMobileConfirmation = function*(skip){
		return yield UAMS._Users.getUsersByMobileConfirmation(skip);
	};

	/**
	 * Подсчет количества пользователей с подтвержденным номером телефона
	 * @returns {number} Количество пользователей
	 * @throws {DbError} - 500, ошибка базы данных
	 */
	UAMS.countUsersByMobileConfirmation = function*(){
		return yield UAMS._Users.countUsersByMobileConfirmation();
	};



	/**
	 * Подсчет новых пользователей за сегодня
	 * @returns {number} Количество пользователей
	 * @throws {DbError} - 500, ошибка базы данных
	 */
	UAMS.countNewUsersToday = function*(){
		let now = new Date();
		let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		return yield UAMS._Users.countUserBySignUpTime(today);
	};

	/**
	 * Подсчет новых пользователей за неделю
	 * @returns {number} Количество пользователей
	 * @throws {DbError} - 500, ошибка базы данных
	 */
	UAMS.countNewUsersThisWeek = function*(){
		let now = new Date();
		var thisWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
		return yield UAMS._Users.countUserBySignUpTime(thisWeek);
	};

	/**
	 * Подсчет новых пользователей за месяц
	 * @returns {number} Количество пользователей
	 * @throws {DbError} - 500, ошибка базы данных
	 */
	UAMS.countNewUsersThisMonth = function*(){
		let now = new Date();
		var thisMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
		return yield UAMS._Users.countUserBySignUpTime(thisMonth);
	};


	/**
	 * Подсчет новых пользователей за год
	 * @returns {number} Количество пользователей
	 * @throws {DbError} - 500, ошибка базы данных
	 */
	UAMS.countNewUsersThisYear = function*(){
		let now = new Date();
		var thisYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
		return yield UAMS._Users.countUserBySignUpTime(thisYear);
	};

	/**
	 * Подсчет новых пользователей за все время
	 * @returns {number}Количество пользователей
	 * @throws {DbError} - 500, ошибка базы данных
	 */
	UAMS.countAllUsers = function*(){
		return yield UAMS._Users.countAllUsers();
	};

	/**
	 * Получение статистики сколько в каком универе пользователей
	 * @returns {*}
	 */
	UAMS.getUsersStaticsPerUniversity = function*(){
		return yield UAMS._Users.getStaticsByUniversity();
	}


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
	UAMS.createUser = function*(authData){
		if(authData.mail.length < 5) throw new ValidationError(400, 'Mail is incorrect');
		if(authData.password.length < 5) throw new ValidationError(400, 'Password is too weak');
		if(!(authData.name && authData.surname)) throw new ValidationError(400, 'Incorrect personal info');

		try{
			let user = yield* UAMS._Users.createUser(authData);
			logger.trace('New user with mail added %s', authData.mail);
			return user;
		}catch(err){
			logger.warn(err);
			throw err;
		}
	};


	/**
	 * Блокировка юзера
	 * @param userId - идентификатор пользователя
	 * @returns {boolean} true - все прошло хорошо
	 * @throws {DbError} - 404, пользователь не найден
	 * @throws {DbError} - 500, ошибка базы данных
	 */
	UAMS.blockUser = function*(userId){
		userId = Mongoose.Types.ObjectId(userId);
		yield* UAMS._Users.blockUser(userId);
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
	UAMS.removeUser = function*(userId){
		userId = Mongoose.Types.ObjectId(userId);
		try{
			return yield UAMS._Users.removeUser(userId);
		}catch(err){
			logger.error(err);
			throw err;
		}
	};

};





module.exports = UAMS;

/**
 * @class User
 * @public
 */

