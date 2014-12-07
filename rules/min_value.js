"use strict";

var _ = require('lodash');
var Rule = require('./base/rule');

module.exports = Rule.add('min_value', {
	test: function (value, params, options, done) {
		return Number(value) >= Number(params);
	},

	checkValue: function (value) {
		if (_.isString(value)) {
			var num = Number(value);
			if ((num == value && !_.isNaN(num))) { // jshint ignore:line
				return;
			}
		}

		if (_.isNumber(value) && !_.isNaN(value)) {
			return;
		}

		return 'must be Number >= 0';
	},

	checkParams: function (param) {
		if (_.isString(param)) {
			var num = Number(param);
			if ((num == param && !_.isNaN(num))) { // jshint ignore:line
				return;
			}
		}

		if (_.isNumber(param) && !_.isNaN(param)) {
			return;
		}

		return 'must be Number';
	}
});
