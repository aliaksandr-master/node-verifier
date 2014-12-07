"use strict";

var _ = require('lodash');
var async = require('async');
var Rule = require('./base/rule');
var parseRules = require('../lib/parse-rules');
var verify = require('../lib/verify');
var ValidationError = require('../errors/validation');

var AllRule = Rule.add('each', {
	test: function (value, rulesObject, options, done) {
		value = _.map(value, function (v, k) {
			return { key: k, value: v };
		});

		async.reduce(value, null, function (_1, item, done) {
			verify(rulesObject, options, item.value, function (err, isValid, info) {
				if (err || isValid) {
					return done(err, isValid);
				}

				done(new ValidationError({name: 'each', params: info, iteration: item.key}), false);
			});
		}, done);
	},

	checkParams: function (params) {
		return params.error;
	},

	checkValue: function (value) {
		if (!_.isArray(value)) {
			return 'must be array|object|string';
		}
	},

	prepareParams: function (params) {
		if (_.isEmpty(params)) {
			return new Error('param validation must be specified');
		}

		return parseRules(AllRule, params, Rule.options);
	}
});

module.exports = AllRule;
