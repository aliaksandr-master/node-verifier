"use strict";

var BaseError = require('./base/error');

var ValueError = BaseError.extend({
	type: 'ValueError'
});

module.exports = ValueError;