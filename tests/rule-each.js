'use strict';
/*eslint no-unused-vars: 0 no-undefined:0 */

var tester = require('./_lib/tester');

exports.examples = tester([
	{
		rules: 'each',
		value: null,
		error: 'REACH1'
	},
	{
		rules: 'each hello',
		value: 333,
		error: 'R8'
	},
	{
		rules: 'each type object',
		value: [ {} ],
		expect: 'REACH1'
	},
	{
		rules: { each: [ 'type number', 'max_value 10', 'max_length 1' ] },
		value: [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
		expect: true
	},
	{
		rules: 'each type object',
		value: 333,
		verr: {
			rule: 'type',
			params: 'array',
			index: null
		}
	},
	{
		rules: { 'each': [ 'type object', 'not empty' ] },
		value: [ {} ],
		verr: {
			rule: 'not',
			params: [ { empty: null } ],
			index: 0
		}
	},
	{
		rules: 'each type object',
		value: [ 333 ],
		verr: {
			rule: 'type',
			params: 'object',
			index: 0
		}
	},
	{
		rules: 'each type object',
		value: [ {}, [] ],
		verr: {
			rule: 'type',
			params: 'object',
			index: 1
		}
	},
	{
		rules: { each: [ 'max_value 10', 'max_length 1' ] },
		value: [ {} ],
		verr: {
			rule: 'max_value',
			params: 10,
			index: 0
		}
	},
	{
		rules: { each: [ 'type number', 'max_value 10', 'max_length 1' ] },
		value: [ {} ],
		verr: {
			rule: 'type',
			params: 'number',
			index: 0
		}
	},
	{
		rules: { each: [ 'type number', 'max_value 10', 'max_length 1' ] },
		value: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
		verr: {
			rule: 'max_length',
			params: 1,
			index: 9
		}
	}
]);
