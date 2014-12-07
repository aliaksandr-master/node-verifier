"use strict";

var _ = require('lodash');
var Rule = require('./base/rule');

module.exports = Rule.add('type', {
	test: function (value, params, options, done) {
		return Object.prototype.toString.call(value).toLowerCase() === '[object ' + params.toLowerCase() + ']';
	},

	checkParams: function (params) {
		if (!_.isString(params)) {
			return 'invalid params type, must be String';
		}
	}
});
