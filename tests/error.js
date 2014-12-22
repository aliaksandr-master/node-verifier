"use strict";

var _ = require('lodash');
var ValidationError = require('./_lib/lib').Rule.ValidationError;

module.exports = {
	'instance of Error': function (test) {
		var err1 = new Error('12123');
		var params = {a: 123};
		var rule = 'asdasd';
		var index = 0;
		var err2 = new ValidationError(rule, params, index);

		test.ok(err2.rule === rule);
		test.ok(err2.params !== params);
		test.ok(err2.index === index);
		test.ok(err1 instanceof Error);
		test.ok(err2 instanceof Error);
		test.ok(err2 instanceof ValidationError);
		test.ok(!(err1 instanceof ValidationError));
		test.done();
	},

	'create by function': function (test) {
		var err1 = new ValidationError('type', 'string', 3);
		var err2 = ValidationError('type', 'string', 3); // jshint ignore : line

		test.ok(_.isEqual(err1, err2));
		test.done();
	},

	'throws error if incorrect rule name': function (test) {

		test.throws(function () {
			var err = new ValidationError();
		});

		test.throws(function () {
			var err = new ValidationError(123123);
		});

		test.throws(function () {
			var err = new ValidationError({});
		});

		test.done();
	}
};
