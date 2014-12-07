"use strict";

var _ = require('lodash');
var Rule = require('./base/rule');

module.exports = Rule.add('required', {
	test: function (value, params, options, done) {
		return value !== undefined;
	}
});
