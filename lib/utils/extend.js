"use strict";

/**
 * extend class implementation for cross-platform work
 * @function
 *
 * @param {Function} Child
 * @param {Function} Parent
 * @returns Child
 * */
module.exports = function (Child, Parent) {
	var Surrogate = function () {};
	Surrogate.prototype = Parent.prototype;
	Child.prototype = new Surrogate();
	Surrogate = null;

	return Child;
};