'use strict';

var _ = require('lodash');
var Rule = require('./base/rule');

module.exports = Rule.extend({
	check: function (value, params, done) {
		return _.isEqual(params, value);
	}
});
