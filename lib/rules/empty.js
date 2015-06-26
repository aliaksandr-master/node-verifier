'use strict';

var _ = require('lodash');
var Rule = require('./base/rule');

module.exports = Rule.extend({
	check: function (value, params, done) {
		if (_.isNumber(value)) {
			return !value;
		}

		if (_.isBoolean(value)) {
			return !value;
		}

		return _.isEmpty(value);
	}
});
