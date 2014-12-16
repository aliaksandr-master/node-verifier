"use strict";

var _ = require('./../lib/utils');
var Rule = require('./base/rule');
var iterate = require('./../lib/iterate');

var RuleEach = module.exports = Rule.extend({
	test: function (value, verifier, done) {
		var that = this;
		if (!_.isArray(value)) {
			return false;
		}

		iterate.array(value, function (itemValue, index, done) {
			verifier.verify(itemValue, function (err) {
				if (err instanceof Rule.ValidationError) {
					done(that.convertNestedError(err, index));
					return;
				}

				done(err);
			});
		}, function (err) {
			done(err, !err);
		});
	},

	prepareParams: function (params) {
		if (_.isEmpty(params)) {
			throw new Error('param validation must be specified');
		}

		return new Rule.Verifier(params);
	}
});
