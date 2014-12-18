"use strict";

var _ = require('./../lib/utils');
var Rule = require('./base/rule');

module.exports = Rule.extend({
	check: function (value, params, done) {
		return value !== undefined;
	}
});
