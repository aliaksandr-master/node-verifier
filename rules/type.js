"use strict";

var _ = require('./../lib/utils');
var Rule = require('./base/rule');

module.exports = Rule.extend({
	test: function (value, params, done) {
		return Object.prototype.toString.call(value).toLowerCase() === '[object ' + params.toLowerCase() + ']';
	},

	prepareParams: function (params) {
		if (!_.isString(params)) {
			throw new Error('invalid params type, must be String');
		}

		return params;
	}
});
