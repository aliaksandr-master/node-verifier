"use strict";

var _ = require('lodash');
var util = require('util');
var Class = require('../../lib/class');
var ValidationError = require('../../errors/validation');
var ParamError = require('../../errors/param');
var ValueError = require('../../errors/value');
var tryit = require('../../lib/tryit');

var Rule = Class.extend({

	name: null,

	params: null,

	message: null,

	_error: null,

	initialize: function (params) {
		this['name'] = this['name'];
		this.params = this.prepareParams(params == null ? null : params);

		var paramsError;
		if (this.params instanceof Error) {
			paramsError = new ParamError(this.params.message);
		}

		paramsError = paramsError || this.checkParams(this.params);

		if (paramsError && !this._error) {
			this._error = paramsError instanceof Error ? paramsError : new ParamError('invalid params ' + util.inspect(params, {depth: null}) + '. ' + paramsError);
		}
	},

	prepareParams: function (params) {
		return params;
	},

	checkParams: function (params) {},

	checkValue: function (value) {},

	verify: function (value, options, done) {
		var that = this;

		if (this._error) {
			done(this._error);
			return;
		}

		var valueError = this.checkValue(value, options);
		if (valueError) {
			done(valueError instanceof Error ? valueError : new ValueError('invalid value ' + util.inspect(value, {depth: null}) + '. ' + valueError));
			return;
		}

		tryit(this, this.test, value, this.params, options, function (err, isValid) {
			if (err && err instanceof ValidationError) {
				isValid = false;
			}

			if (!err) {
				if (isValid === undefined) {
					isValid = true;
				}

				if (!isValid) {
					err = new ValidationError({name: that.name, params: that.params, value: true}, that.message);
				}
			}

			done(err, Boolean(isValid));
		});

		return that;
	},

	test: function (value, params, done) {
		done(new Error('method test must be defined in validation rule "' + this.name + '"!'));
	}
}, {
	add: function (name, test) {
		if (_.isFunction(test)) {
			return this.extend({
				name: name,
				test: test
			});
		}

		return this.extend(_.extend({
			name: name
		}, test));
	},

	extend: function (proto, stat) {
		if (!proto || !proto.name || !proto.name.trim()) {
			throw new Error('rule name must be specified');
		}

		if (!_.isFunction(proto.test)) {
			throw new Error('rule test function must be specified');
		}

		var Child = Class.extend.call(this, proto, stat);

		this.register[proto.name] = Child;

		return Child;
	},

	options: {
		interrupt: true,
		separator: '|'
	},

	register: {}
});

module.exports = Rule;

