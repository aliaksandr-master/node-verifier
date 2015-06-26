'use strict';
/*eslint no-unused-vars: 0 no-undefined:0 */

var tester = require('./_lib/tester');

exports.examples = tester([
	{
		rules: 'required',
		value: null,
		expect: true
	},
	{
		rules: 'required',
		value: 333,
		expect: true
	},
	{
		rules: 'required',
		value: '333',
		expect: true
	},
	{
		rules: 'required',
		value: NaN,
		expect: true
	},
	{
		rules: 'required',
		value: 333,
		expect: true
	},
	{
		rules: 'required',
		value: '333',
		expect: true
	},
	{
		rules: 'required',
		value: undefined,
		verr: {
			rule: 'required',
			params: null,
			index: null
		}
	},
	{
		rules: 'required',
		value: 33,
		expect: true
	},
	{
		rules: 'required',
		value: '',
		expect: true
	},
	{
		rules: 'required',
		value: {},
		expect: true
	},
	{
		rules: 'required',
		value: { a: 123 },
		expect: true
	},
	{
		rules: 'required',
		value: Object.create({ a: 123 }),
		expect: true
	},
	{
		rules: 'required',
		value: [],
		expect: true
	},
	{
		rules: 'required',
		value: [1],
		expect: true
	},
	{
		rules: 'required',
		value: false,
		expect: true
	},
	{
		rules: 'required',
		value: '0',
		expect: true
	}
]);
