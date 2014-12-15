"use strict";

var _ = require('./../lib/utils');
var Rule = require('./base/rule');
var iterate = require('./../lib/iterate');

module.exports = Rule.extend({
	test: function (value, verifier, done) {
		if (!_.isArray(value)) {
			return false;
		}

		iterate.array(value, function (itermValue, index, done) {
			verifier.verify(value, function (err) {
				if (err instanceof Rule.ValidationError) {
					done(null, false, index);
					return;
				}

				done(err, true);
			});
		}, done);


	},

	prepareParams: function (params) {
		if (_.isEmpty(params)) {
			throw new Error('param validation must be specified');
		}

		return new Rule.Verfier(params);
	}
});
