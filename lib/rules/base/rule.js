"use strict";

var _ = require('lodash');
var extend = require('./../../utils/extend');
var ValidationError = require('../../validation-error');

/**
 * abstract class Rule. All rules must extends this Class
 *
 * @abstract
 * @class Rule
 * @constructor
 * @property {String} name
 * @property {String} _$ruleName - private
 * @property {*} params
 *
 * @this Rule
 * */
var Rule = function Rule (params) {
	this.name = this._$ruleName;
	this.params = this.prepareParams(params);
	this._paramsRaw = params;
};

Rule.prototype = {
	/**
	 * method for prepare params in construct. this method provides fail-fast paradigm
	 *
	 * @method
	 * @protected
	 * @this Rule
	 * @param {?*} params
	 * @returns {?*}
	 * */
	prepareParams: function (params) {
		return params == null ? null : params;
	},

	/**
	 * method for call value verify of this rule
	 *
	 * @abstract
	 * @public
	 * @method
	 * @param {?*} value
	 * @param {?*} params
	 * @param {verifyCallback} done
	 *
	 * */
	check: null,

	getErrorParams: function (params) {
		return this._paramsRaw;
	},

	error: function (index) {
		return new Rule.ValidationError(this.name, this.getErrorParams(this.params), index);
	},

	verify: function (value, done) {
		var result,
			rule = this,
			_doneCounter = 0;

		var _done = function (err, isValid, index) {
			if (_doneCounter++) {
				console.error('>> validation rule ' + rule.name + ' call callback ' + _doneCounter + ' times');
				return;
			}

			if (err) {
				done(err);
				return;
			}

			if (isValid == null || isValid) {
				done();
				return;
			}

			done(rule.error(index));
		};

		try {
			result = rule.check(value, rule.params, _done);

			if (result !== undefined) {
				if (result instanceof Error) {
					_done(result);
					return;
				}

				_done(null, result);
			}
		} catch (e) {
			_done(e);
		}
	},

	/**
	 * proxy error helper
	 *
	 * @method
	 * @param {Rule.ValidationError} err
	 * @param {?Number} index
	 *
	 * return Rule.ValidationError
	 * */
	convertNestedError: function (err, index) {
		if (!(err instanceof Rule.ValidationError)) {
			return new Error('argument error must be instance of Rule.ValidationError in rule "' + this.name + '"');
		}

		var obj = {};
		obj[err.rule] = err.params;
		index = index == null ? err.index : index;

		return new Rule.ValidationError(this.name, obj, index);
	}
};

/**
 * Extend Rule class
 *
 * @static
 * @method
 * @param {?Object} protoProps
 *
 * return {Function} ChildRule
 * */
Rule.extend = function (protoProps) {
	var Parent = this;

	if (protoProps.name != null) {
		throw new Error('you cant set name in prototype');
	}

	var CustomRule = extend(function CustomRule () {
		Parent.apply(this, arguments);
	}, Parent);

	_.extend(CustomRule.prototype, protoProps);

	CustomRule.extend = Parent.extend;

	if (!_.isFunction(CustomRule.prototype.check)) {
		throw new Error('method check must be specified in validation rule!');
	}

	return CustomRule;
};


/**
 * {Rule{}}
 * */
Rule.rules = {};

/**
 * Register rule
 *
 * @static
 * @method
 * @param {!String} name
 * @param {Function} ChildRuleConstructor - Class that extended Rule
 * @param {?Boolean} [strict=true] - If true - deny replacement register
 *
 * */
Rule.add = function (name, ChildRuleConstructor, strict) {
	if (!name || typeof name !== 'string') {
		throw new Error('rule name must be non-empty string');
	}

	if ((strict == null || strict) && this.rules.hasOwnProperty(name)) {
		throw new Error('rule "' + name + '" already registered');
	}

	if (!_.isFunction(ChildRuleConstructor) || !_.isFunction(ChildRuleConstructor.prototype.check) || !ChildRuleConstructor.extend) {
		throw new Error('rule "' + name + '" must be constructor (with method check)');
	}

	this.rules[name] = ChildRuleConstructor.extend({
		_$ruleName: name
	});
};

/**
 * Register rule
 *
 * @static
 * @method
 * @param {!String} name
 * @param {?Boolean} [strict=true] - If true throws Error about non-exists rule
 *
 * @returns {Function}
 * */
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

/**
 * create instance of Rule
 *
 * @param {String} name
 * @param {*} params
 *
 * @returns {Rule}
 * */
Rule.create = function (name, params) {
	var Rule = this.get(name);
	return new Rule(params);
};

Rule.ValidationError = ValidationError;
module.exports = Rule;
