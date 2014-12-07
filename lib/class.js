"use strict";

var _ = require('lodash');

var Class = function Class () {
	this.initialize.apply(this, arguments);
};

Class.prototype.initialize = function () {};
Class.extend = function (proto, stat) {
	var parent = this,
		Child;

	if (proto && _.has(proto, 'constructor')) {
		Child = proto.constructor;
	} else {
		Child = function Child () {
			return parent.apply(this, arguments);
		};
	}

	require('util').inherits(Child, parent);

	_.extend(Child, parent, stat);
	_.extend(Child.prototype, proto);

	Child.__super__ = parent.prototype;

	return Child;
};

module.exports = Class;