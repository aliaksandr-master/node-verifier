"use strict";

var _ = require('./../lib/utils');
var Rule = require('./base/rule');
var isEmail = require("email-validator");

module.exports = Rule.extend({
	check: function (value, params, done) {
		if (!_.isString(value)) {
			return false;
		}

		return isEmail.validate(value);
	}
});