"use strict";

var _ = require('lodash');
var Rule = require('./base/rule');
var RuleAny = require('./any');

var RuleContains = RuleAny.extend({

	serialize: function () {
		return this.rawParams;
	},

	prepareParams: function (params) {
		if (!_.isArray(params)) {
			throw new Error('#RCONTAINS1: rule params must be array');
		}

		return RuleContains.__super__.prepareParams.call(this, _.map(params, function (v) {
			return { eq: v };
		}));
	}
});

module.exports = RuleContains;