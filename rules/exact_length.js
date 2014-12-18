"use strict";

var _ = require('./../lib/utils');
var Rule = require('./base/rule');

module.exports = Rule.extend({
	check: function (value, params, done) {
		if (_.isNumber(value) && !_.isNaN(value)) {
			value = String(value);
		}

		if (_.isArray(value) || _.isString(value)) {
			return value.length === params;
		}

		return false;
	},

	prepareParams: function (params) {
		params = parseFloat(params);

		if (params == +params && params >= 0) { // jshint ignore: line
			return params;
		}

		throw new Error('rule params must be Number >= 0');
	}
});