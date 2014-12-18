"use strict";

var tester = require('./_lib/tester');

exports.examples = tester([
	{
		rules: {
			contains: null
		},
		value: null,
		error: true
	},
	{
		rules: {
			contains: [123, 234, 345]
		},
		value: 333,
		expect: false
	},
	{
		rules: {
			contains: [123, 234, 345]
		},
		value: 123,
		expect: true
	},
	{
		rules: {
			contains: [123, 234, 345]
		},
		value: "123",
		expect: false
	}
]);