"use strict";

var _ = require('./../lib/utils');
var iterate = require('./../lib/iterate');
var Rule = require('./base/rule');

module.exports = Rule.extend({

	check: function (value, branches, done) {
		var error = { error: true };
		var success = { error: false };
		iterate.array(branches, function (verifier, index, done) {
			verifier.verify(value, function (err) {
				if (!err) {
					done(success);
					return;
				}
				if (err instanceof Rule.ValidationError) {
					err = index === branches.length - 1 ? error : null;
				}

				done(err);
			});
		}, function (err) {
			var result = true;

			if (err === error) {
				result = false;
				err = null;
			} else if (err === success) {
				err = null;
			}

			error = null;
			success = null;
			done(err, result);
		});
	},

	prepareParams: function (params) {
		if (params == null) {
			return [];
		}

		if (!_.isPlainObject(params) && !_.isArray(params)) {
			throw new Error('rule params must be array or plain object');
		}

		return _.map(params, function (v) {
			return new Rule.Verifier(v);
		});
	}

});