'use strict';
/*eslint consistent-this: 0*/

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
 * @property {String} _$ruleName - private rule name
 * @property {*} params
 * @param {*} params - settings for rule
 *
 * @this Rule
 * */
var Rule = function Rule (params) {
	this.name = this._$ruleName;
	this.params = this.prepareParams(params);
	this.rawParams = params;
};

Rule.prototype = {
	/**
	 * method for prepare params in construct. this method provides fail-fast paradigm
	 *
	 * @method
	 * @protected
	 * @this Rule
	 * @param {?*} params - rule params that need to prepare
	 * @returns {?*}
	 * */
	prepareParams: function (params) {
		return params == null ? null : params;
	},

	ValidationError: ValidationError,

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
	check: null, // function () {}

	serialize: function () {
		return this.rawParams;
	},

	error: function (index, params) {
		return new this.ValidationError(this.name, arguments.length > 1 ? params : this.serialize(), index);
	},

	verify: function (value, done) {
		var result;
		var rule = this;
		var _doneCounter = 0;

		var _done = function (err, isValid, index) {
			if (_doneCounter++) {
				console.error('>> validation rule ' + rule.name + ' call callback ' + _doneCounter + ' times'); // eslint-disable-line
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

			if (typeof result !== 'undefined') {
				if (result instanceof Error) {
					_done(result);

					return;
				}

				_done(null, result);
			}
		} catch (err) {
			_done(err);
		}
	}
};

/**
 * Extend Rule class
 *
 * @static
 * @method
 * @param {?Object} protoProps - Object for prototype properties
 *
 * @returns {Function} ChildRule
 * */
Rule.extend = function (protoProps) {
	var Parent = this;

	if (protoProps.name != null) {
		throw new Error('#R2: you cant set name in prototype');
	}

	var CustomRule = extend(function CustomRule () {
		Parent.apply(this, arguments);
	}, Parent);

	_.extend(CustomRule.prototype, protoProps);

	CustomRule.extend = Parent.extend;

	if (!_.isFunction(CustomRule.prototype.check)) {
		throw new Error('#R3: method check must be specified in validation rule!');
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
 * @param {!String} name - name of rule
 * @param {Function} ChildRuleConstructor - Class that extended Rule
 * @param {?Boolean} [strict=true] - If true - deny replacement register
 * @returns {undefined}
 * */
Rule.add = function (name, ChildRuleConstructor, strict) {
	if (!name || typeof name !== 'string') {
		throw new Error('#R4: rule name must be non-empty string');
	}

	if ((strict == null || strict) && this.rules.hasOwnProperty(name)) {
		throw new Error('#R5: rule "' + name + '" already registered');
	}

	if (!_.isFunction(ChildRuleConstructor) || !_.isFunction(ChildRuleConstructor.prototype.check) || !ChildRuleConstructor.extend) {
		throw new Error('#R6: rule "' + name + '" must be constructor (with method check)');
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
 * @param {!String} name - name of rule
 * @param {?Boolean} [strict=true] - If true throws Error about non-exists rule
 *
 * @returns {Function}
 * */
Rule.get = function (name, strict) {
	if (!name || typeof name !== 'string') {
		throw new Error('#R7: rule name must be non-empty string');
	}

	if (this.rules.hasOwnProperty(name)) {
		return this.rules[name];
	}

	if (strict == null || strict) {
		throw new Error('#R8: unknown rule "' + name + '"');
	}

	return null;
};

/**
 * create instance of Rule
 *
 * @param {String} name - name of rule
 * @param {*} params - params for rule instance
 *
 * @returns {Rule}
 * */
Rule.create = function (name, params) {
	var Rule = this.get(name);

	return new Rule(params);
};

Rule.ValidationError = ValidationError;

module.exports = Rule;
