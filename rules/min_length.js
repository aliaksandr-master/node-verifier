"use strict";

var _ = require('./../lib/utils');
var Rule = require('./base/rule');

module.exports = Rule.extend({
	test: function (value, params, done) {
		if (!_.isArray(value) && !_.isString(value) && !(_.isNumber(value) && !_.isNaN(value))) {
			throw false;
		}

		return (_.isArray(value) ? value : String(value)).length >= Number(params);
	},

	prepareParams: function (param) {
		if (_.isString(param)) {
			var num = Number(param);
			if ((num == param && num >= 0)) { // jshint ignore: line
				return param;
			}
		}

		if (_.isNumber(param) && param >= 0) {
			return param;
		}

		throw new Error('rule params must be Number >= 0');
	}
});
