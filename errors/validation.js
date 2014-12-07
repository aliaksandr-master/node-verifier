"use strict";

var ValidationError = function ValidationError (rule, message) {
	if (message) {
		message = message.replace('%params%', JSON.stringify(rule.params, null)).replace('%name%', rule.name);
	}

	Error.call(this, message || 'invalid value');
	this.rule = rule;
	this.type = 'ValidationError';
};

require('util').inherits(ValidationError, Error);

module.exports = ValidationError;