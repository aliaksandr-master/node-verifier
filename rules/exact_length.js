"use strict";

var _ = require('./../lib/utils');
var Rule = require('./base/rule');

module.exports = Rule.extend({
	test: function (value, params, done) {
		if (!_.isArray(value) && !_.isString(value) && !(_.isNumber(value) && !_.isNaN(value))) {
			return false;
		}

		return (_.isArray(value) ? value : String(value)).length === Number(params);
	},

	prepareParams: function (params) {
		if (_.isString(params)) {
			var num = Number(params);
			if ((num == params  && num >= 0)) { // jshint ignore: line
				return params;
			}
		}

		if (_.isNumber(params) && params >= 0) {
			return params;
		}

		throw new Error('must be Number >= 0');
	}
});