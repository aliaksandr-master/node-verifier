'use strict';
/*eslint eqeqeq: 0*/

var Rule = require('./base/rule');

module.exports = Rule.extend({
	check: function (value, params, done) {
		value = parseFloat(value);
		return value == +value && value <= params;
	},

	serialize: function () {
		return this.params;
	},

	prepareParams: function (param) {
		param = parseFloat(param);

		if (param == +param) {
			return param;
		}

		throw new Error('#RMAXVALUE1: rule params must be Number');
	}
});
