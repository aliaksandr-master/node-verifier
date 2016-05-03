'use strict';

var extend = require('./_lib/utils-extend');

exports.instanceof = function (test) {
	var SomeClass = function () {};

	extend(SomeClass, Error);

	var some = new SomeClass();

	test.ok(some instanceof Error);
	test.ok(some instanceof SomeClass);
	test.done();
};
