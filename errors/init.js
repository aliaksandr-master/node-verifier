"use strict";

var BaseError = require('./base/error');

var InitError = BaseError.extend({
	type: 'InitError'
});

module.exports = InitError;