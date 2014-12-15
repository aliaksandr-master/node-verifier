"use strict";

var ValidationError = require('../index').Rule.ValidationError;
module.exports = {
	'instance of Error': function (test) {
		var err1 = new Error('12123');
		var err2 = new ValidationError('123123');
		test.ok(err1 instanceof Error);
		test.ok(err2 instanceof Error);
		test.ok(err2 instanceof ValidationError);
		test.ok(!(err1 instanceof ValidationError));
		test.done();
	}
};
