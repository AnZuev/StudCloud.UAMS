"use strict";

let Util = require('util'),
	DbError = require("@anzuev/studcloud.errors").DbError,
	Q = require('q'),
	User = require("@anzuev/studcloud.datamodels").User,
	Mongoose = require('mongoose');

/**
 *
 * @param photoId
 */
User.methods.changePhoto = function(photoId){

	photoId = Mongoose.Types.ObjectId(photoId);
	this.pubInform.photo = photoId;
};

/**
 *
 * @param newGroup
 */
User.methods.changeGroup = function(newGroup){
	if(newGroup.length == 0){
		throw new ValidationError(400, Util.format("Group length can not be 0"));
	}
	if(this.pubInform.group == newGroup){
		let errMessage = Util.format("New group is equal with old group. Old - %s, new - %s", this.pubInform.group, newGroup);
		throw new ValidationError(400, errMessage);
	}
	this.pubInform.group = newGroup;
};


/**
 *
 * @param newUniversity
 */
User.methods.changeUniversity = function(newUniversity){
	newUniversity = Mongoose.Types.ObjectId(newUniversity);
	if(this.pubInform.university == newUniversity){
		let errMessage = Util.format("New university is equal with old university. Old - %s, new - %s",
			this.pubInform.university, newUniversity);
		throw new ValidationError(400, errMessage);
	}
	this.pubInform.university = newUniversity;
	this.pubInform.faculty = null;
};

/**
 *
 * @param newFaculty
 */
User.methods.changeFaculty = function(newFaculty){
	newFaculty = Mongoose.Types.ObjectId(newFaculty);
	if(this.pubInform.faculty == newFaculty){
		let errMessage = Util.format("New faculty is equal with old faculty. Old - %s, new - %s",
			this.pubInform.faculty, newFaculty);
		throw new ValidationError(400, errMessage);
	}
	this.pubInform.faculty = newFaculty;
};


/**
 *
 * @param newYear
 */
User.methods.changeYear = function(newYear){
	if(newYear < 1 || newYear > 6) throw new ValidationError(400, 'Year can not be less than 1 or greater than 6');
	this.pubInform.year = newYear;
};

/**
 *
 * @param newName
 */
User.methods.changeName = function(newName){
	if(newName.length < 2) throw new ValidationError(400, "Name must contain at least 2 characters");
	this.pubInform.name = newName;
};

/**
 *
 * @param newSurname
 */
User.methods.changeSurname = function(newSurname){
	if(newSurname.length < 2) throw new ValidationError(400, "Surname must contain at least 2 characters");
	this.pubInform.surname = newSurname;
};

