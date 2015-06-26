'use strict';

var _ = require('lodash');

var iterate = require('async-iterate');
var Rule = require('./rules/base/rule');
var ValidationError = require('./validation-error');

/**
 * @class Verifier
 * @constructor
 * @param {String|Array} rules - rules for validation
 * @property {Rule[]} rules - parsed rules for validation
 * @returns {Verifier}
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
	 * recursive verifier serializer. Returns array of objects {rule: params}
	 *
	 * @method
	 * @this Verifier
	 * @returns {Object[]}
	 * */
	serialize: function () {
		return _.map(this.rules, function (rule) {
			var obj = {};

			obj[rule.name] = rule.serialize();

			return obj;
		});
	},

	/**
	 * convert raw rules array to Rule array
	 *
	 * @method
	 * @param {Array|String} rules - rules for parsing
	 * @this Verifier
	 * @returns {Rule[]}
	 * */
	parseRules: function (rules) {
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

			throw new Error('#V1: invalid rule type, must be string or plain object');
		});
	},

	/**
	 * @callback verifyCallback
	 * @param {?Error} [error] - node style error
	 * */

	/**
	 * verify value with async callback
	 * @method
	 * @param {*} value - value, that need to validate
	 * @param {verifyCallback} done - node style callback
	 * @returns {undefined}
	 * */
	verify: function (value, done) {
		iterate.each(this.rules, function (rule, index, done) {
			rule.verify(value, done);
		}, done);
	},

	_RULE_STRING_FORMAT: /^\s*([a-zA-Z_][a-zA-Z0-9_]*)(.*)$/,

	/**
	 * convert string to Rule object
	 *
	 * @private
	 * @method
	 * @param {String} ruleStr - string for parsing
	 * @returns {Rule}
	 * */
	_parseString: function (ruleStr) {
		var name;
		var params = '';

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
	 * @param {String} jsonSource - json object for parsing
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
	 * convert object {rule: params} to Rule object
	 *
	 * @private
	 * @method
	 * @param {Object} ruleObject - rule object for transformation
	 * @returns {Rule}
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
Verifier.ValidationError = ValidationError;

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
Rule.add('any', require('./rules/any'));
Rule.add('contains', require('./rules/contains'));
Rule.add('available_fields', require('./rules/available_fields'));

module.exports = Verifier;
