'use strict';
/*eslint no-unused-vars: 0 no-undefined:0 */

var tester = require('./_lib/tester');

exports.examples = tester([
	{
		rules: 'max_value 3',
		value: 33,
		verr: {
			rule: 'max_value',
			params: 3,
			index: null
		}
	},
	{
		rules: 'max_value 33',
		value: 33,
		expect: true
	},
	{
		rules: 'max_value 333',
		value: 33,
		expect: true
	},
	{
		rules: 'max_value "3"',
		value: 33,
		verr: {
			rule: 'max_value',
			params: 3,
			index: null
		}
	},
	{
		rules: 'max_value "33"',
		value: 33,
		expect: true
	},
	{
		rules: 'max_value "333"',
		value: 33,
		expect: true
	},
	{
		rules: 'max_value 3',
		value: '33',
		verr: {
			rule: 'max_value',
			params: 3,
			index: null
		}
	},
	{
		rules: 'max_value 33',
		value: '-33',
		expect: true
	},
	{
		rules: 'max_value 333',
		value: '+33',
		expect: true
	},
	{
		rules: 'max_value "3"',
		value: '33',
		verr: {
			rule: 'max_value',
			params: 3,
			index: null
		}
	},
	{
		rules: 'max_value "33"',
		value: '33',
		expect: true
	},
	{
		rules: 'max_value "333"',
		value: '33',
		expect: true
	},
	{
		rules: 'max_value "333"',
		value: null,
		verr: {
			rule: 'max_value',
			params: 333,
			index: null
		}
	},
	{
		rules: 'max_value 333',
		value: NaN,
		verr: {
			rule: 'max_value',
			params: 333,
			index: null
		}
	},
	{
		rules: 'max_value "333"',
		value: undefined,
		verr: {
			rule: 'max_value',
			params: 333,
			index: null
		}
	},
	{
		rules: 'max_value null',
		value: 33,
		error: 'RMAXVALUE1'
	},
	{
		rules: 'max_value "null"',
		value: null,
		error: 'RMAXVALUE1'
	},
	{
		rules: 'max_value null',
		value: NaN,
		error: 'RMAXVALUE1'
	},
	{
		rules: 'max_value true',
		value: undefined,
		error: 'RMAXVALUE1'
	}
]);
