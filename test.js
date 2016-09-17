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
		UAMS.configure(require('./config'));
		let users = yield* UAMS.getUsersByGroup(context.university, context.faculty, context.group);
		let user = users[0];
		user.pubInform.university = "57b70b3f00c19c30592d44d8";
		user.pubInform.faculty = "57b70d09361fc08f591f8770";
		console.log(yield* user.format());
		//let users = yield* UAMS.getUsersByGroup(context.university, context.faculty, context.group);
		//let counter = yield* UAMS.countNewUsersThisWeek();
		//let user = yield* UAMS.removeUser('576eb4b1c5e3956e929cea6c');
		//let user = yield* UAMS.createUser(authData);
		//let user = yield* UAMS.getUserById("577aa872888e71863ba6261b");
		//user.block();
		//console.log(user);
		//yield* user.saveUser();
	}catch(err){
		throw err;
		console.log(err);
	}

})().done();

