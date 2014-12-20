"use strict";

var _ = require('lodash');
var Rule = require('./base/rule');

module.exports = Rule.extend({
	check: function (value, params, done) {
		value = parseFloat(value);
		return value == +value && value >= params; // jshint ignore: line
	},

	prepareParams: function (param) {
		param = parseFloat(param);

		if (param == +param) { // jshint ignore: line
			return param;
		}

		throw new Error('rule params must be Number');
	}
});
