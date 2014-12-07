"use strict";

var _ = require('lodash');
var Rule = require('./base/rule');

module.exports = Rule.add('empty', {
	test: function (value, params, options, done) {
		if (_.isNumber(value)) {
			return !value;
		}

		if (_.isBoolean(value)) {
			return !value;
		}

		return _.isEmpty(value);
	}
});
