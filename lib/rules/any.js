"use strict";

var _ = require('lodash');
var iterate = require('./../utils/iterate');
var Rule = require('./base/rule');

module.exports = Rule.extend({

	check: function (value, branches, done) {
		var that = this,
			error = { error: true},
			success = { error: false };

		iterate.array(branches, function (verifier, index, done) {
			verifier.verify(value, function (err) {
				if (err instanceof Rule.ValidationError) {
					done(index === branches.length - 1 ? error : null);
					return;
				}

				if (err) {
					done(err);
					return;
				}

				done(success);
			});
		}, function (err) {
			if (err === error) {
				err = that.error();
			} else if (err === success) {
				err = null;
			}

			done(err);

			error = null;
			success = null;
		});
	},

	serialize: function () {
		return _.map(this.params, function (v) {
			return v.serialize();
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