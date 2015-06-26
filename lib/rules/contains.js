'use strict';

var _ = require('lodash');
var Rule = require('./base/rule');

module.exports = Rule.extend({

	check: function (value, params, done) {
		return _.any(params, function (paramValue) {
			return _.isEqual(paramValue, value);
		});
	},

	prepareParams: function (params) {
		if (_.isArray(params) && params.length > 1) {
			return params;
		}

		throw new Error('#RCONTAINS1: rule params must be non-empty array');
	}
});
