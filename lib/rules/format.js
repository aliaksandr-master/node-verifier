"use strict";

var _ = require('lodash');
var Rule = require('./base/rule');

module.exports = Rule.extend({
	check: function (value, params, done) {
		return params.test(value);
	},

	prepareParams: function (params) {
		if (_.isString(params) || (_.isNumber(params) && !_.isNaN(params))) {
			params = new RegExp(params);
		}

		if (_.isRegExp(params)) {
			return params;
		}

		throw new Error('#RFORMAT1: invalid value type, must be RegExp');
	}
});