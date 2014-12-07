"use strict";

var _ = require('lodash');
var Rule = require('./base/rule');

module.exports = Rule.add('min_length', {
	test: function (value, params, options, done) {
		return (_.isArray(value) ? value : String(value)).length >= Number(params);
	},

	checkValue: function (value) {
		if (!_.isArray(value) && !_.isString(value) && !(_.isNumber(value) && !_.isNaN(value))) {
			return 'must be String|Number|Array';
		}
	},

	checkParams: function (param) {
		if (_.isString(param)) {
			var num = Number(param);
			/* jshint ignore:start */
			if ((num == param && num >= 0)) {
				return;
			}
			/* jshint ignore:end */
		}

		if (_.isNumber(param) && param >= 0) {
			return;
		}

		return 'must be Number >= 0';
	}
});
