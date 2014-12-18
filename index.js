"use strict";

var _ = require('./lib/utils');

var iterate = require('./lib/iterate');
var Rule = require('./rules/base/rule');

/**
 * @class Verifier
 * @constructor
 * @property {Rule[]} rules - parsed rules for validation
 *
 * @this Verifier
 * @returns Verifier
 * */
var Verifier = function Verifier (rules) {
	if (!(this instanceof Verifier)) {
		return new Verifier(rules);
	}

	this.rules = this.parseRules(rules);
};

Verifier.prototype = {
	constructor: Verifier,

	/**
	 * recursive verifier serializer. Returns array of objects {ruleName: ruleParams}
	 *
	 * @method
	 * @this Verifier
	 * @returns Object[]
	 * */
	serializeRules: function () {
		return _.map(this.rules, function (rule) {
			var obj = {};

			obj[rule.name] = rule.params instanceof Verifier ? rule.params.serializeRules() : _.cloneDeep(rule.params);

			return obj;
		});
	},

	/**
	 * convert raw rules array to Rule array
	 *
	 * @method
	 * @param {Array|String} rules
	 * @this Verifier
	 * @returns Rule[]
	 * */
	parseRules: function  (rules) {
		if (!_.isArray(rules)) {
			rules = [rules];
		}

		var that = this;
		return _.map(rules, function (rule) {
			if (typeof rule === 'string') {
				return that._parseString(rule);
			}

			if (_.isPlainObject(rule)) {
				return that._parseObject(rule);
			}

			throw new Error('invalid rule type, must be string or plain object');
		});
	},

	/**
	 * @callback verifyCallback
	 *
	 * @param {?Error} [error]
	 *
	 * */

	/**
	 * verify value with async callback
	 *
	 * @method
	 * @param {*} value
	 * @param {verifyCallback} done
	 * @this Verifier
	 * */
	verify: function (value, done) {
		iterate.array(this.rules, function (rule, index, done) {
			rule.verify(value, done);
		}, done);
	},

	_RULE_STRING_FORMAT: /^\s*([a-zA-Z_][a-zA-Z0-9_]*)(.*)$/,

	/**
	 * convert string to Rule object
	 *
	 * @private
	 * @method
	 * @param {String} ruleStr
	 * @returns {Rule}
	 * */
	_parseString: function (ruleStr) {
		var name,
			params = '';

		ruleStr.replace(this._RULE_STRING_FORMAT, function (w, _name, _params) {
			name = _name;
			params = _params.trim();
		});

		params = params.length ? this._parseParamsString(params) : null;

		return Rule.create(name, params);
	},

	/**
	 * parse json params
	 *
	 * @private
	 * @method
	 * @param {String} jsonSource
	 * @returns {*}
	 * */
	_parseParamsString: function (jsonSource) {
		var json = null;

		try {
			json = JSON.parse(jsonSource);
		} catch (err) {
			json = jsonSource; // string
		}

		return json;
	},

	/**
	 * convert object {ruleName: ruleParams} to Rule object
	 *
	 * @private
	 * @method
	 * @param {Object} ruleObject
	 *
	 * @returns Rule
	 * */
	_parseObject: function (ruleObject) {
		var name = null;

		for (var k in ruleObject) {
			if (ruleObject.hasOwnProperty(k)) {
				name = k;
				break;
			}
		}

		return Rule.create(name, ruleObject[name]);
	}
};

Verifier.Rule = Rule;
Verifier.ValidationError = Rule.ValidationError;

Rule.Verifier = Verifier;

Rule.add('exact_length', require('./rules/exact_length'));
Rule.add('max_length', require('./rules/max_length'));
Rule.add('min_length', require('./rules/min_length'));
Rule.add('format', require('./rules/format'));
Rule.add('type', require('./rules/type'));
Rule.add('email', require('./rules/email'));
Rule.add('empty', require('./rules/empty'));
Rule.add('max_value', require('./rules/max_value'));
Rule.add('min_value', require('./rules/min_value'));
Rule.add('eq', require('./rules/eq'));
Rule.add('required', require('./rules/required'));
Rule.add('each', require('./rules/each'));
Rule.add('not', require('./rules/not'));

module.exports = Verifier;