"use strict";

var _ = require('lodash');
var Rule = require('./base/rule');

module.exports = Rule.add('eq', {
	test: function (value, params, options, done) {
		return _.isEqual(params, value);
	}
});
