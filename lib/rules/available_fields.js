'use strict';

var _ = require('lodash');
var Rule = require('./base/rule');

module.exports = Rule.extend({
	check: function (value, params, done) {
		if (!_.isObject(value)) {
			return false;
		}

		return _.every(value, function (v, key) {
			return _.includes(params, key);
		});
	},

	serialize: function () {
		return this.params;
	},

	prepareParams: function (params) {
		return _.map(params, function (param) {
			return String(param);
		});
	}
});
