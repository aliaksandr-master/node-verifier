'use strict';
/*eslint no-unused-vars: 0 no-undefined:0 */

var tester = require('./_lib/tester');

exports.examples = tester([
	{
		rules: {
			available_fields: null
		},
		value: null,
		expect: false
	},
	{
		rules: {
			available_fields: [ 123, 234, 345 ]
		},
		value: {},
		expect: true
	},
	{
		rules: {
			available_fields: [ 123, 234, 345 ]
		},
		value: {
			'123': 123123
		},
		expect: true
	},
	{
		rules: {
			available_fields: [ 123, 234, 345 ]
		},
		value: {
			'123': 123123,
			'234': 234234
		},
		expect: true
	},
	{
		rules: {
			available_fields: [ 123, 234, 345 ]
		},
		value: {
			'123': 123123,
			'345': 345345,
			'234': 234234
		},
		expect: true
	},
	{
		rules: {
			available_fields: [ 123, 234, 345 ]
		},
		value: {
			'123': 123123,
			'345': 345345,
			'456': 345345,
			'234': 234234
		},
		verr: {
			rule: 'available_fields',
			params: [ '123', '234', '345' ]
		}
	}
]);
