"use strict";

var _ = Object.create(require('lodash'));

_.mixin({
	firstKey: function (object) {
		if (_.isEmpty(object)) {
			return null;
		}

		for (var i in object) {
			if (object.hasOwnProperty(i)) {
				return i;
			}
		}
	}
});

module.exports = _;
