'use strict';

var Rule = require('./base/rule');

module.exports = Rule.extend({
	check: function (value, params, done) {
		return typeof value !== 'undefined';
	}
});
