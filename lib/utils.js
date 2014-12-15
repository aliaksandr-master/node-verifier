"use strict";

var _ = Object.create(require('lodash'));

_.isPlainObject = function (obj) {
	return Object.prototype.toString.call(obj) === '[object Object]';
};

_.firstElement = function (obj) {
	for (var i in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, i)) {
			return i;
		}
	}
};

module.exports = _;