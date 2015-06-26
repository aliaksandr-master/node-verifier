'use strict';
/*eslint no-unused-vars: 0 no-undefined:0 */

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
			contains: [ 123, 234, 345 ]
		},
		value: 333,
		verr: {
			rule: 'contains',
			params: [ 123, 234, 345 ]
		}
	},
	{
		rules: {
			contains: [ 123, 234, 345 ]
		},
		value: 123,
		expect: true
	},
	{
		rules: {
			contains: [ 123, 234, 345 ]
		},
		value: '123',
		verr: {
			rule: 'contains',
			params: [ 123, 234, 345 ]
		}
	}
]);
