"use strict";

var _ = require('./lib/utils');

var iterate = require('./lib/iterate');
var tryRuleTest = require('./lib/tryRuleTest');
var Rule = require('./rules/base/rule');

var Verifier = function Verifier (validations) {
	if (!(this instanceof Verifier)) {
		return new Verifier(validations);
	}

	this.validations = this.parse(validations);
};

Verifier.prototype = {
	parse: function  (validations) {
		if (!_.isArray(validations)) {
			validations = [validations];
		}

		return _.map(validations, function (validation) {
			if (typeof validation === 'string') {
				return this._parseString(validation);
			}
			if (_.isPlainObject(validation)) {
				return this._parseObject(validation);
			}
			throw new Error('invalid rule type, must be string or plain object');
		}, this);
	},

	verify: function (value, done) {
		iterate.array(this.validations, function (rule, index, done) {
			tryRuleTest(Verifier.Rule.ValidationError, rule, value, done);
		}, done);
	},

	_RULE_STRING_FORMAT: /^\s*([a-zA-Z_][a-zA-Z0-9_]*)(.*)$/,

	_parseString: function (validation) {
		var name,
			params = '';

		validation.replace(this._RULE_STRING_FORMAT, function (w, _name, _params) {
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

	_parseObject: function (validation) {
		var name = _.firstElement(validation);
		return Rule.create(name, validation[name]);
	}
};

Verifier.Rule = Rule;

Rule.Verfier = Verifier;

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
Rule.add('not', require('./rules/not'));
Rule.add('each', require('./rules/each'));

module.exports = Verifier;