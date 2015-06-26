'use strict';
/*eslint no-unused-vars: 0 no-undefined:0 */

var tester = require('./_lib/tester');

exports.examples = tester([
	{
		rules: 'eq "333"',
		value: null,
		verr: {
			rule: 'eq',
			params: '333',
			index: null
		}
	},
	{
		rules: 'eq "333"',
		value: 333,
		verr: {
			rule: 'eq',
			params: '333',
			index: null
		}
	},
	{
		rules: 'eq "333"',
		value: '333',
		expect: true
	},
	{
		rules: 'eq 333',
		value: NaN,
		verr: {
			rule: 'eq',
			params: 333,
			index: null
		}
	},
	{
		rules: 'eq 333',
		value: 333,
		expect: true
	},
	{
		rules: 'eq 333',
		value: '333',
		verr: {
			rule: 'eq',
			params: 333,
			index: null
		}
	},
	{
		rules: 'eq "333"',
		value: undefined,
		verr: {
			rule: 'eq',
			params: '333',
			index: null
		}
	},
	{
		rules: 'eq null',
		value: 33,
		verr: {
			rule: 'eq',
			params: null,
			index: null
		}
	},
	{
		rules: 'eq "null"',
		value: null,
		verr: {
			rule: 'eq',
			params: 'null',
			index: null
		}
	},
	{
		rules: 'eq null',
		value: NaN,
		verr: {
			rule: 'eq',
			params: null,
			index: null
		}
	},
	{
		rules: 'eq null',
		value: null,
		expect: true
	},
	{
		rules: 'eq true',
		value: undefined,
		verr: {
			rule: 'eq',
			params: true,
			index: null
		}
	}
]);
