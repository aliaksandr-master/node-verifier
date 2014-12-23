"use strict";

var _ = require('lodash');
var Rule = require('./base/rule');

module.exports = Rule.extend({
	check: function (value, params, done) {
		if (_.isNumber(value) && !_.isNaN(value)) {
			value = String(value);
		}

		if (_.isArray(value) || _.isString(value)) {
			return value.length >= params;
		}

		return false;
	},

	prepareParams: function (param) {
		param = parseFloat(param);

		if (param == +param && param >= 0) { // jshint ignore: line
			return param;
		}

		throw new Error('#RMINLENGTH1: rule params must be Number >= 0');
	}
});
