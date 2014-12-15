"use strict";

var _ = require('./../lib/utils');
var Rule = require('./base/rule');

module.exports = Rule.extend({
	test: function (value, verifier, done) {
		verifier.verify(value, function (err) {
			if (err instanceof Rule.ValidationError) {
				done(null, true);
				return;
			}

			done(err, false);
		});
	},

	prepareParams: function (params) {
		if (_.isEmpty(params)) {
			throw new Error('param validation must be specified');
		}

		return new Rule.Verifier(params);
	}
});