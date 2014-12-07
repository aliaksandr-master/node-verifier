"use strict";

var _ = require('lodash');
var Rule = require('./base/rule');
var parseRules = require('../lib/parse-rules');
var verify = require('../lib/verify');

var NotRule = Rule.add('not', {
	test: function (value, params, options, done) {
		verify(params, options, value, function (err, isValid, info) {
			done(err, !isValid);
		});
	},

	checkParams: function (params) {
		return params.error;
	},

	prepareParams: function (params) {
		return parseRules(NotRule, params, Rule.options);
	}
});

module.exports = NotRule;