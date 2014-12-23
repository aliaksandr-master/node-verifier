"use strict";

var _ = require('lodash');
var Rule = require('./base/rule');

module.exports = Rule.extend({
	check: function (value, verifier, done) {
		var that = this;
		verifier.verify(value, function (err) {
			if (err instanceof Rule.ValidationError) {
				done(null, true);
				return;
			}

			done(that.error());
		});
	},

	serialize: function () {
		return this.params.serialize();
	},

	prepareParams: function (params) {
		if (_.isEmpty(params)) {
			throw new Error('param validation must be specified');
		}

		return new Rule.Verifier(params);
	}
});