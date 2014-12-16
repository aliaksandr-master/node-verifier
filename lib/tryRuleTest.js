"use strict";

var tryRuleTest = function (ValidationError, rule, value, done) {
	var _doneCounter = 0;
	var _done = function (err, isValid, index) {
		if (_doneCounter++) {
			console.error('validation rule ' + rule.name + ' call callback ' + _doneCounter + ' times');
			return;
		}

		if (err) {
			done(err);
			return;
		}

		if (isValid) {
			return done();
		}

		done(new ValidationError(rule.name, rule.params, index));
	};

	var result;
	try {
		result = rule.test(value, rule.params, _done);
	} catch (e) {
		_done(e);
	}

	if (result !== undefined) {
		if (result instanceof Error) {
			_done(result);
			return;
		}

		_done(null, result);
	}
};

module.exports = tryRuleTest;
