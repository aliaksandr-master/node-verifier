"use strict";

var tester = require('./_lib/tester');
var Verifier = require('./_lib/lib');

exports.examples = tester([
	{ rules: 'format 3',   value: 4,      expect: false },
	{ rules: 'format 3',   value: 3,      expect: true },
	{ rules: 'format 3',   value: 433,    expect: true },
	{ rules: 'format ^3',  value: 433,    expect: false },
	{ rules: 'format ^3',  value: 33,     expect: true },
	{ rules: 'format ^3$', value: 3,      expect: true },
	{ rules: 'format ^3$', value: 33,     expect: false },
	{ rules: 'format ^[a-zA-Z][a-zA-Z0-9_.-]*@[a-zA-Z0-9]+\\.[a-zA-Z0-9]+$', value: 33,     expect: false },
	{ rules: 'format ^[a-zA-Z][a-zA-Z0-9_.-]*@[a-zA-Z0-9]+\\.[a-zA-Z0-9]+$', value: "asdasdasd",     expect: false },
	{ rules: 'format ^[a-zA-Z][a-zA-Z0-9_.-]*@[a-zA-Z0-9]+\\.[a-zA-Z0-9]+$', value: "asdasdasd@asd.com",     expect: true },
]);

exports['check params'] = function (test) {

	test.throws(function () {
		var verifier = new Verifier({format: null});
	});

	test.throws(function () {
		var verifier = new Verifier({format: {}});
	});

	test.throws(function () {
		var verifier = new Verifier({format: parseInt("asdasd")});
	});

	test.done();
};