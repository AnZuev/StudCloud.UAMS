"use strict";


let Util = require('util'),
	DbError = require("@anzuev/studcloud.errors").DbError,
	Q = require('q'),
	User = require("@anzuev/studcloud.datamodels").User,
	Mongoose = require('mongoose');

const logger = require('../libs/logger');


/**
 * @module User
 */
/**
 * Изменить аватарку
 * @param photoId - идентификатор фотографии на сервере статики
 *
 */
function changePhoto(photoId){
	photoId = Mongoose.Types.ObjectId(photoId);
	this.pubInform.photo = photoId;
};
User.methods.changePhoto = changePhoto;

/**
 * Изменить группу
 * @param newGroup - новая группа
 * @throws {ValidationError}400, номер группы совпадает со старым
 * @throws {ValidationError} 400, длина группы не может быть 0
 */
function changeGroup(newGroup){
	if(newGroup.length == 0){
		throw new ValidationError(400, Util.format("Group length can not be 0"));
	}
	if(this.pubInform.group == newGroup){
		let errMessage = Util.format("New group is equal with old group. Old - %s, new - %s", this.pubInform.group, newGroup);
		throw new ValidationError(400, errMessage);
	}
	this.pubInform.group = newGroup;
};
User.methods.changeGroup = changeGroup;


/**
 * Изменение университета
 * @param newUniversity - идентификатор университета
 *
 */
function changeUniversity(newUniversity){
	newUniversity = Mongoose.Types.ObjectId(newUniversity);
	if(this.pubInform.university == newUniversity){
		let errMessage = Util.format("New university is equal with old university. Old - %s, new - %s",
			this.pubInform.university, newUniversity);
		logger.warn( new ValidationError(400, errMessage));
		throw new ValidationError(400, errMessage);
	}
	this.pubInform.university = newUniversity;
	this.pubInform.faculty = null;
};
User.methods.changeUniversity = changeUniversity;

/**
 * Изменение факультета
 * @param newFaculty - id нового факультета
 * @throws {ValidationError} 400, новый факультет совпадает со старым
 */
function changeFaculty(newFaculty){
	newFaculty = Mongoose.Types.ObjectId(newFaculty);
	if(this.pubInform.faculty == newFaculty){
		let errMessage = Util.format("New faculty is equal with old faculty. Old - %s, new - %s",
			this.pubInform.faculty, newFaculty);
		throw new ValidationError(400, errMessage);
	}
	this.pubInform.faculty = newFaculty;
};


User.methods.changeFaculty = changeFaculty;

/**
 * Изменение курса обучения
 * @param newYear - новый курс
 * @throws {ValidationError} 400 - переданное значение курса < 0 или больше 6
 */
function changeYear(newYear){
	if(newYear < 1 || newYear > 6) throw new ValidationError(400, 'Year can not be less than 1 or greater than 6');
	this.pubInform.year = newYear;
};

User.methods.changeYear = changeYear;
/**
 * Изменение имени
 * @param newName - новое имя
 * @throws {ValidationError}400, Имя должно содержать хотя бы 2 символа
 */
function changeName(newName){
	if(newName.length < 2) throw new ValidationError(400, "Name must contain at least 2 characters");
	this.pubInform.name = newName;
};
User.methods.changeName = changeName;

/**
 * Изменение имени
 * @param newSurname - новая фамилия
 * @throws {ValidationError}400, фамилия должна содержать хотя бы 2 символа
 */
function changeSurname(newSurname){
	if(newSurname.length < 2) throw new ValidationError(400, "Surname must contain at least 2 characters");
	this.pubInform.surname = newSurname;
};
User.methods.changeSurname = changeSurname;

