"use strict";

var _ = require('lodash');

var Rule = require('./rules/base/rule');
var parseRules = require('./lib/parse-rules');
var verify = require('./lib/verify');
var initOptions = require('./lib/options');

var ValidationError = require('./errors/validation');
var ParamError = require('./errors/param');
var ValueError = require('./errors/value');
var InitError = require('./errors/init');

require('./rules/exact_length');
require('./rules/max_length');
require('./rules/min_length');
require('./rules/format');
require('./rules/type');
require('./rules/email');
require('./rules/empty');
require('./rules/max_value');
require('./rules/min_value');
require('./rules/eq');
require('./rules/required');
require('./rules/not');
require('./rules/each');

var validator = function validator (options, validations, value, done) {
	options = initOptions(Rule, options);

	if (arguments.length <= 1) {
		return function (validations, value, done) {
			var ruleObject = parseRules(Rule, validations, options);
			var verifier = function (value, done) {
				return verify(ruleObject, options, value, done);
			};

			if (arguments.length <= 1) {
				return verifier;
			}

			return verifier(value, done);
		};
	}

	var ruleObject = parseRules(Rule, validations, options);
	var verifier = function (value, done) {
		return verify(ruleObject, options, value, done);
	};

	if (arguments.length === 2) {
		return verifier;
	}

	return verifier(value, done);
};

validator.options = Rule.options;
validator.Rule = Rule;
validator.rules = Rule.register;

validator.ValidationError = ValidationError;
validator.ParamError = ParamError;
validator.ValueError = ValueError;
validator.InitError = InitError;

module.exports = validator;