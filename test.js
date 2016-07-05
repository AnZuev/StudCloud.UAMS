'use strict';

let UAMS = require('./index');

let Q = require("q");

Q.async(function*(){
	try {

		//let user = yield* UAMS.getUserById('576eb4b1c5e3956e929cea6c');
		//let user = yield* UAMS.getUserByMail('anzue12@istudentapp1.ru');
		//let user = yield* UAMS.getUserByPhone('0-43094389');
		let context = {
			university: "56d6bcd1017cf10359b3129b",
			faculty: "56dab169d41242256d8b8d08",
			group: "4304"
		};
		let authData = {
			mail: "123ew@bvk.ru",
			password: "password1234",
			name: "Антон",
			surname: "Зуев"
		};
		//let reg = new RegExp('^Анто');
		//let user = yield* UAMS.getUsersByGroup(context.university, context.faculty, context.group);
		//let users = yield* UAMS.getUsersByGroup(context.university, context.faculty, context.group);
		//let counter = yield* UAMS.countNewUsersThisWeek();
		//let user = yield* UAMS.removeUser('576eb4b1c5e3956e929cea6c');
		let user = yield* UAMS.createUser(authData);
		//let user = yield* UAMS.getUserById("577aa872888e71863ba6261b");
		user.block();
		console.log(user);
		yield* user.saveUser();
	}catch(err){
		//console.log(err);
	}
})().done();

