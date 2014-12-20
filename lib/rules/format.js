"use strict";

var _ = require('lodash');
var Rule = require('./base/rule');

module.exports = Rule.extend({
	check: function (value, params, done) {
		if (_.isString(params) || _.isNumber(params)) {
			params = new RegExp(params);
		}

		return params.test(value);
	},

	prepareParams: function (params) {
		if (!_.isRegExp(params) && !_.isString(params) && !_.isNumber(params)) {
			throw new Error('invalid value type, must be RegExp');
		}

		return params;
	}
});