'use strict';
/*eslint no-unused-vars:0, no-undefined:0, new-cap:0 */

var _ = require('lodash');
var ValidationError = require('./_lib/lib').Rule.ValidationError;

module.exports = {
	'instance of Error': function (test) {
		var err1 = new Error('12123');
		var params = { a: 123 };
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
		var e1 = new ValidationError();
		var e2 = new ValidationError(123123);
		var e3 = new ValidationError({});

		test.ok(e1 instanceof Error && !(e1 instanceof ValidationError) && /^#E1: /.test(e1.message));
		test.ok(e2 instanceof Error && !(e2 instanceof ValidationError) && /^#E1: /.test(e2.message));
		test.ok(e3 instanceof Error && !(e3 instanceof ValidationError) && /^#E1: /.test(e3.message));

		test.done();
	}
};
