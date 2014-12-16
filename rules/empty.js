"use strict";

var _ = require('./../lib/utils');
var Rule = require('./base/rule');

module.exports = Rule.extend({
	test: function (value, params, done) {
		if (_.isNumber(value)) {
			return !value;
		}

		if (_.isBoolean(value)) {
			return !value;
		}

		return _.isEmpty(value);
	}
});
