"use strict";


let User = require("@anzuev/studcloud.datamodels").User;

const logger = require('../libs/logger').getLogger();
const UI = require('@anzuev/studcloud.rds').getUniversityModel();






/**
 * Форматирование юзера к виду
 * @example
 * yield* user.format()
 * // result
 *
 * {
 *      id: 5747521bf58f75460d9f5960,
 *      name: 'Антон',
 *      surname: 'Ильин',
 *      photo: '',
 *      year: 1,
 *      group: '4304',
 *      faculty: 'Компьютерные технологии',
 *      university: 'СПБГЭТУ Лэти'
 * }
 * @this {User}
 * @function format
 * @memberof module:UAMS~User
 * @instance
 * @returns {{id: *, name: *, surname: *, photo: *, year: *}|*}
 */
User.methods.format =  function*(){
	let user;
	user = {
		id: this._id,
		name: this.pubInform.name,
		surname: this.pubInform.surname,
		photo: this.pubInform.photo,
		year: this.pubInform.year,
		group: this.pubInform.group
	};

	if(this.pubInform.university && this.pubInform.faculty){
		let university = yield UI.getUniversityAndFacultyTitles(this.pubInform.university, this.pubInform.faculty);
		user.faculty = university.faculty;
		user.university = university.university;
	}

	return user;
}