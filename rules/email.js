"use strict";

var _ = require('lodash');
var Rule = require('./base/rule');
var isEmail = require("email-validator").validate;

module.exports = Rule.add('email', {
	test: function (value, params, options, done) {
		if (!_.isString(value)) {
			return false;
		}

		return isEmail(value);
	}
});