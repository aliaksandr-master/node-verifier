"use strict";

module.exports = function (context, func, value, params, options, done) {
	var args = Array.prototype.slice.call(arguments, 2);
	try {
		var result = func.apply(context, args);
		if (result !== undefined) {
			done(null, result);
		}
	} catch (e) {
		done(e);
	}
};