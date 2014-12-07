"use strict";

var Class = require('./../../lib/class');

var CustomError = function (message) {
	var tmp = Error.call(this, message);
	this.name = tmp.name = this.type || 'CustomError';
	this.message = tmp.message;

	Object.defineProperty(this, 'stack', {
		get: function () {
			return tmp.stack;
		}
	});

	return this;
};

require('util').inherits(CustomError, Error);

CustomError.extend = Class.extend;

module.exports = CustomError;