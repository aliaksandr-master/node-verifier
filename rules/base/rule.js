"use strict";

var _ = require('./../../lib/utils');
var extend = require('./../../lib/extend');

var Rule = function ValidationRule (params) {
	this.name = this._$ruleName;
	this.params = this.prepareParams(params);
};

Rule.prototype = {

	params: null,

	prepareParams: function (params) {
		return params == null ? null : params;
	},

	test: function (value, params, done) {
		done(new Error('method test must be defined in validation rule "' + this.name + '"!'));
	},

	convertNestedError: function (err, index) {
		if (!(err instanceof Rule.ValidationError)) {
			return new Error('errorProxy: argument error must be instance of Rule.ValidationError in rule "' + this.name + '"');
		}

		var obj = {};
		obj[err.ruleName] = err.ruleParams;
		index = index == null ? err.index : index;
		return new Rule.ValidationError(this.name, obj, index);
	}
};

Rule.extend = function (proto) {
	var Parent = this;

	var CustomRule = extend(function CustomRule () {
		Parent.apply(this, arguments);
	}, Parent);

	if (proto.name != null) {
		throw new Error('you cant set name in prototype');
	}

	_.extend(CustomRule.prototype, proto);

	CustomRule.__super__ = Parent.prototype;

	return CustomRule;
};

Rule.rules = {};

Rule.add = function (name, rule, strict) {
	if (!name || typeof name !== 'string') {
		throw new Error('rule name must be non-empty string');
	}

	if (!_.isFunction(rule) || rule.prototype.hasOwnProperty('_$ruleName') || !rule.prototype.test) {
		throw new Error('rule "' + name + '" must be constructor (with method test), and can register only once');
	}

	if ((strict == null || strict) && this.rules.hasOwnProperty(name)) {
		throw new Error('rule "' + name + '" already registered');
	}

	rule.prototype._$ruleName = name;

	this.rules[name] = rule;

	return rule;
};

Rule.get = function (name, strict) {
	if (!name || typeof name !== 'string') {
		throw new Error('rule name must be non-empty string');
	}

	if (this.rules.hasOwnProperty(name)) {
		return this.rules[name];
	}

	if (strict == null || strict) {
		throw new Error('unknown rule "' + name + '"');
	}

	return null;
};

Rule.create = function (name, params) {
	var CustomRule = this.get(name);
	return new CustomRule(params);
};

var ValidationError = function ValidationError (ruleName, ruleParams, index) {
	if (!(this instanceof ValidationError)) {
		return new ValidationError(ruleName, ruleParams, index);
	}

	if (!ruleName || typeof ruleName !== 'string') {
		throw new TypeError('invalid ruleName, must be non-empty string');
	}

	Error.call(this);
	this.type = this.name = 'ValidationError';

	this.ruleName = ruleName;
	this.ruleParams = _.cloneDeep(ruleParams);
	this.index = typeof index === 'number' && !_.isNaN(index) ? index : null;

	return this;
};

extend(ValidationError, Error);

Rule.ValidationError = ValidationError;

module.exports = Rule;

