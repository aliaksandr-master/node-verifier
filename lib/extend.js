"use strict";

module.exports = function (Child, Parent) {
	var Surrogate = function () {};
	Surrogate.prototype = Parent.prototype;
	Child.prototype = new Surrogate();
	Surrogate = null;

	return Child;
};