"use strict";

var BaseError = require('./base/error');

var ParamError = BaseError.extend({
	type: 'ParamError'
});

module.exports = ParamError;