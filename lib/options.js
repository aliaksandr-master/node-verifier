"use strict";

var _ = require('lodash');

module.exports = function (Rule, options) {
	return _.extend({}, Rule.options, options);
};