"use strict";

var _ = require('./lib/utils');

var iterate = require('./lib/iterate');
var tryRuleTest = require('./lib/tryRuleTest');
var Rule = require('./rules/base/rule');

var Verifier = function Verifier (rules) {
	if (!(this instanceof Verifier)) {
		return new Verifier(rules);
	}

	this.rules = this.parseRules(rules);
};

Verifier.prototype = {
	serializeRules: function () {
		return _.map(this.rules, function (rule) {
			var obj = {};

			obj[rule.name] = rule.params instanceof Verifier ? rule.params.serializeRules() : _.cloneDeep(rule.params);

			return obj;
		});
	},

	parseRules: function  (rules) {
		if (!_.isArray(rules)) {
			rules = [rules];
		}

		return _.map(rules, function (rule) {
			if (typeof rule === 'string') {
				return this._parseString(rule);
			}

			if (_.isPlainObject(rule)) {
				return this._parseObject(rule);
			}

			throw new Error('invalid rule type, must be string or plain object');
		}, this);
	},

	verify: function (value, done) {
		iterate.array(this.rules, function (rule, index, done) {
			tryRuleTest(Verifier.Rule.ValidationError, rule, value, done);
		}, done);
	},

	_RULE_STRING_FORMAT: /^\s*([a-zA-Z_][a-zA-Z0-9_]*)(.*)$/,

	_parseString: function (rule) {
		var name,
			params = '';

		rule.replace(this._RULE_STRING_FORMAT, function (w, _name, _params) {
			name = _name;
			params = _params.trim();
		});

		params = params.length ? this._parseParamsString(params) : null;

		return Rule.create(name, params);
	},

	_parseParamsString: function (jsonSource) {
		var json = null;

		try {
			json = JSON.parse(jsonSource);
		} catch (err) {
			json = jsonSource; // string
		}

		return json;
	},

	_parseObject: function (rule) {
		var name = _.firstElement(rule);
		return Rule.create(name, rule[name]);
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