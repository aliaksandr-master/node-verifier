"use strict";

var _ = require('lodash');
var extend = require('./../../utils/extend');

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
	check: function (value, params, done) {
		done(new Error('method check must be defined in validation rule "' + this.name + '"!'));
	},

	verify: function (value, done) {
		var rule = this,
			_doneCounter = 0;
		var _done = function (err, isValid, index) {
			if (_doneCounter++) {
				console.error('validation rule ' + rule.name + ' call callback ' + _doneCounter + ' times');
				return;
			}

			if (err) {
				done(err);
				return;
			}

			if (isValid) {
				done();
				return;
			}

			done(new Rule.ValidationError(rule.name, rule.params, index));
		};

		var result;
		try {
			result = rule.check(value, rule.params, _done);
		} catch (e) {
			_done(e);
		}

		if (result !== undefined) {
			if (result instanceof Error) {
				_done(result);
				return;
			}

			_done(null, result);
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
		obj[err.ruleName] = err.ruleParams;
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

	var CustomRule = extend(function CustomRule () {
		Parent.apply(this, arguments);
	}, Parent);

	if (protoProps.name != null) {
		throw new Error('you cant set name in prototype');
	}

	_.extend(CustomRule.prototype, protoProps);

	CustomRule.__super__ = Parent.prototype;
	CustomRule.extend = Parent.extend;

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

	if (!_.isFunction(ChildRuleConstructor) || !ChildRuleConstructor.prototype.check || !ChildRuleConstructor.extend) {
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


/**
 * Register rule
 *
 * @static
 * @class
 * @constructor
 * @param {!String} ruleName
 * @param {*} ruleParams
 * @param {?Number} [index]
 * @property {String} name="ValidationError"
 * @property {*} params
 * @property {?Number} index
 *
 * @returns {Rule.ValidationError}
 * */
Rule.ValidationError = function ValidationError (ruleName, ruleParams, index) {
	if (!(this instanceof Rule.ValidationError)) {
		return new Rule.ValidationError(ruleName, ruleParams, index);
	}

	if (!ruleName || typeof ruleName !== 'string') {
		throw new TypeError('invalid ruleName, must be non-empty string');
	}

	Error.call(this);
	this.name = 'ValidationError';
	this.rule = ruleName;
	this.params = _.cloneDeep(ruleParams);
	this.index = typeof index === 'number' && !_.isNaN(index) ? index : null;

	return this;
};

extend(Rule.ValidationError, Error);

module.exports = Rule;
