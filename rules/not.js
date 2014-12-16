"use strict";

var _ = require('./../lib/utils');
var Rule = require('./base/rule');

module.exports = Rule.extend({
	test: function (value, verifier, done) {
		var that = this;
		verifier.verify(value, function (err) {
			if (err instanceof Rule.ValidationError) {
				done(null, true);
				return;
			}

			done(new Rule.ValidationError(that.name, that._errorParams));
		});
	},

	prepareParams: function (params) {
		if (_.isEmpty(params)) {
			throw new Error('param validation must be specified');
		}

		var verifier = new Rule.Verifier(params);

		this._errorParams = verifier.serializeRules();

		return verifier;
	}
});