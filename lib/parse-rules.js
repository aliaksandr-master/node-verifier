"use strict";

var _ = require('lodash');
var parseJSON = require('./parse-json');
var ParamError = require('./../errors/param');
var InitError = require('./../errors/init');
var BaseRule = require('./../rules/base/rule');

var _parseObject, _parseString;

var exports = module.exports = function (Rule, validations, options) {
	if (_.isString(validations)) {
		validations = validations.split(options.separator);
	}

	if (!_.isArray(validations)) {
		validations = [validations];
	}

	var error = null;

	var rules = _.map(validations, function (validation) {
		var result;
		if (error) {
			return null;
		}

		if (validation instanceof Rule) {
			return validation;
		}

		if (_.isString(validation)) {
			result = _parseString(Rule, validation);
		} else if (Object.prototype.toString.call(validation) === '[object Object]') {
			result = _parseObject(Rule, validation);
		} else {
			var ErrConstr = Rule === BaseRule ? InitError : ParamError;
			result = new ErrConstr('invalid rule type, must be string or object');
		}

		if (result instanceof Error) {
			error = result;
			result = null;
		}

		return result;
	});

	return {
		error: error,
		rules: rules
	};
};


var _toRule = function (Rule, name, params) {
	if (Rule.register.hasOwnProperty(name)) {
		return new Rule.register[name](params);
	}

	var ErrConstr = Rule === BaseRule ? InitError : ParamError;
	return new ErrConstr('invalid rule, available ' + _.keys(Rule.register).join('|') + ', "' + name + '" given');
};
exports.toRule = _toRule;



var RULE_STRING_EXP = /^([a-zA-Z_][a-zA-Z0-9_]*)(.*)$/;
_parseString = function (Rule, validation) {
	var name, params;

	validation = String(validation).trim();
	name = validation.replace(RULE_STRING_EXP, '$1');
	params = validation.replace(RULE_STRING_EXP, '$2').trim() || null;

	if (params) {
		params = parseJSON(params);

		if (params instanceof Error) {
			return params;
		}
	}

	return _toRule(Rule, name, params);
};




_parseObject = function (Rule, validation) {
	var i, name;
	for (i in validation) {
		if (Object.prototype.hasOwnProperty.call(validation, i)) {
			name = i.trim();
			break;
		}
	}

	if (!name) {
		var ErrConstr = Rule === BaseRule ? InitError : ParamError;
		return new ErrConstr('invalid rule object, must be {"ruleName": "...params..."}');
	}

	return _toRule(Rule, name, validation[name]);
};
