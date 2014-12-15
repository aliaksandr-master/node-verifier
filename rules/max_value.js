"use strict";

var _ = require('./../lib/utils');
var Rule = require('./base/rule');

module.exports = Rule.extend({
	test: function (value, params, done) {
		if (_.isString(value)) {
			var num = Number(value);
			if ((num != value || _.isNaN(num))) { // jshint ignore: line
				return false;
			}
		}

		if (!(_.isNumber(value) && !_.isNaN(value))) {
			return false;
		}

		return Number(value) <= Number(params);
	},

	prepareParams: function (param) {
		if (_.isString(param)) {
			var num = Number(param);
			if ((num == param && !_.isNaN(num))) { // jshint ignore: line
				return param;
			}
		}

		if (_.isNumber(param) && !_.isNaN(param)) {
			return param;
		}

		throw new Error('rule params must be Number');
	}
});
