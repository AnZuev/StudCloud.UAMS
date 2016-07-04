'use strict';
let User = require('./library'),
	connection = require("./libs/connections").users,
	Mongoose = require("mongoose");


let ValidationError = require("@anzuev/studcloud.errors").ValidationError;
require('./libs/logger');


function UAMS(){
	this.init();
}

/**
 * @summary Инициализация модуля
 *
 */
UAMS.prototype.init = function(){
	if(!connection){
		throw new Error("No connection specified for 'users' collection");
	}else{
		this._Users = connection.model("User", User);
	}
};
/**
 *
 * @param user -
 * @returns {*}
 */
UAMS.prototype.saveUser = function* (user){
	if(user instanceof User){
		return yield user.saveUser();
	}else{
		throw new ValidationError(400, "Object passed is not instance of User");
	}
};


/**
 *
 * @param id
 * @returns {*}
 */
UAMS.prototype.getUserById = function*(id){
	return yield this._Users.getUserById(id);
};

/**
 *
 * @param mail
 * @returns {*}
 */
UAMS.prototype.getUserByMail = function*(mail){
	return yield this._Users.getUserByMail(mail);
};


/**
 *
 * @param phone
 * @returns {*}
 */
UAMS.prototype.getUserByPhone = function*(phone){
	return yield this._Users.getUserByPhone(phone);
};


/**
 *
 * @param key
 * @param context
 * @returns {*}
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
 *
 * @param key1
 * @param key2
 * @param context
 * @returns {*}
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
module.exports = new UAMS();


/**
 *
 * @param university
 * @returns {*}
 */
UAMS.prototype.getUsersByUniversity = function*(university){
	return yield this._Users.getUsersByUniversity(university);
};


/**
 *
 * @param faculty
 * @returns {*}
 */
UAMS.prototype.getUsersByFaculty = function*(faculty){
	return yield this._Users.getUsersByFaculty(faculty);
};


/**
 *
 * @param university - id университета
 * @param faculty - id факультета
 * @param group - группа(string)
 * @returns {*}
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
	};

	return yield this._Users.getUsersByGroup(query);
};

/**
 *
 * @param year - курс
 * @returns {*}
 */
UAMS.prototype.getUsersByYear = function*(year){
	return yield this._Users.getUsersByYear(year);
};

/**
 *
 * @param skip
 * @returns {*}
 */
UAMS.prototype.getUsersByMailConfirmation = function*(skip){
	return yield this._Users.getUsersByMailConfirmation(skip);
};

UAMS.prototype.countUsersByMailConfirmation = function*(){
	return yield this._Users.countUsersByMailConfirmation();
};

/**
 *
 * @param skip
 * @returns {*}
 */
UAMS.prototype.getUsersByMobileConfirmation = function*(skip){
	return yield this._Users.getUsersByMobileConfirmation(skip);
};

/**
 *
 * @param skip
 * @returns {*}
 */
UAMS.prototype.getUsersByMailConfirmation = function*(skip){
	return yield this._Users.getUsersByMailConfirmation(skip);
};

/**
 *
 * @returns {*}
 */
UAMS.prototype.countNewUsersToday = function*(){
	let now = new Date();
	let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	return yield this._Users.countUserBySignUpTime(today);
};

/**
 *
 * @returns {*}
 */
UAMS.prototype.countNewUsersThisWeek = function*(){
	let now = new Date();
	var thisWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
	return yield this._Users.countUserBySignUpTime(thisWeek);
};

/**
 *
 * @returns {*}
 */
UAMS.prototype.countNewUsersThisMonth = function*(){
	let now = new Date();
	var thisMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
	return yield this._Users.countUserBySignUpTime(thisMonth);
};


/**
 *
 * @returns {*}
 */
UAMS.prototype.countNewUsersThisYear = function*(){
	let now = new Date();
	var thisYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
	return yield this._Users.countUserBySignUpTime(thisYear);
};

/**
 * count all users
 * @returns {*}
 */
UAMS.prototype.countAllUsers = function*(){
	return yield this._Users.countAllUsers();
};

/**
 *
 * @param authData
 * @property mail
 * @property password
 * @property name
 * @property surname
 * @returns {*}
 */
UAMS.prototype.createUser = function*(authData){
	if(authData.mail.length < 5) throw new ValidationError(400, 'Mail is incorrect');
	if(authData.password.length < 5) throw new ValidationError(400, 'Password is too weak');
	if(!(authData.name && authData.surname)) throw new ValidationError(400, 'Incorrect personal info');

	let user = yield* this._Users.createUser(authData);
	logger.trace('new user with mail added %s', authData.mail);
	return user;
};


/**
 *
 * @param userId
 * @returns {boolean}
 */
UAMS.prototype.blockUser = function*(userId){
	userId = Mongoose.Types.ObjectId(userId);
	yield* this._Users.blockUser(userId);
	return true;
};

/**
 *
 * @param userId
 * @returns {*}
 */
UAMS.prototype.removeUser = function*(userId){
	userId = Mongoose.Types.ObjectId(userId);
	return yield this._Users.removeUser(userId);
};


