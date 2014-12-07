"use strict";

var _ = require('lodash');
var Rule = require('./base/rule');

module.exports = Rule.add('format', {
	test: function (value, params, options, done) {
		if (_.isString(params) || _.isNumber(params)) {
			params = new RegExp(params);
		}

		return params.test(value);
	},

	checkParams: function (params) {
		if (!_.isRegExp(params) && !_.isString(params) && !_.isNumber(params)) {
			return 'invalid value type, must be RegExp';
		}
	}
});