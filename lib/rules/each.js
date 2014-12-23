"use strict";

var _ = require('lodash');
var Rule = require('./base/rule');
var iterate = require('./../utils/iterate');

var RuleEach = module.exports = Rule.extend({
	check: function (value, verifier, done) {
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
			throw new Error('#REACH1: param validation must be specified');
		}

		return new Rule.Verifier(params);
	}
});
