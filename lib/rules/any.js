"use strict";

var _ = require('lodash');
var iterate = require('async-iterate');
var Rule = require('./base/rule');

module.exports = Rule.extend({

	check: function (value, branches, done) {
		var that = this,
			success = { error: false };

		var len = branches.length;
		iterate.each(branches, function (verifier, index, done) {
			--len;
			verifier.verify(value, function (err) {
				if (err instanceof Rule.ValidationError) {
					done(len ? null : err);
					return;
				}

				if (err) {
					done(err);
					return;
				}

				done(success);
			});
		}, function (err) {
			if (err === success) {
				err = null;
			}

			done(err);

			success = null;
		});
	},

	prepareParams: function (params) {
		if (params == null) {
			return [];
		}

		if (!_.isPlainObject(params) && !_.isArray(params)) {
			throw new Error('#RANY1: rule params must be array or plain object');
		}

		return _.map(params, function (v) {
			return new Rule.Verifier(v);
		});
	}

});