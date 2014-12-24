"use strict";

var tester = require('./_lib/tester');

exports.examples = tester([
	{
		rules: 'empty',
		value: null,
		expect: true
	},
	{
		rules: 'empty',
		value: 333,
		verr: {
			rule: 'empty',
			params: null,
			index: null
		}
	},
	{
		rules: 'empty',
		value: "333",
		verr: {
			rule: 'empty',
			params: null,
			index: null
		}
	},
	{
		rules: 'empty',
		value: NaN,
		expect: true
	},
	{
		rules: 'empty',
		value: 333,
		verr: {
			rule: 'empty',
			params: null,
			index: null
		}
	},
	{
		rules: 'empty',
		value: "333",
		verr: {
			rule: 'empty',
			params: null,
			index: null
		}
	},
	{
		rules: 'empty',
		value: undefined,
		expect: true
	},
	{
		rules: 'empty',
		value: 33,
		verr: {
			rule: 'empty',
			params: null,
			index: null
		}
	},
	{
		rules: 'empty',
		value: '',
		expect: true
	},
	{
		rules: 'empty',
		value: {},
		expect: true
	},
	{
		rules: 'empty',
		value: {a: 123},
		verr: {
			rule: 'empty',
			params: null,
			index: null
		}
	},
	{
		rules: 'empty',
		value: Object.create({a: 123}),
		expect: true
	},
	{
		rules: 'empty',
		value: [],
		expect: true
	},
	{
		rules: 'empty',
		value: [1],
		verr: {
			rule: 'empty',
			params: null,
			index: null
		}
	},
	{
		rules: 'empty',
		value: false,
		expect: true
	},
	{
		rules: 'empty',
		value: '0',
		verr: {
			rule: 'empty',
			params: null,
			index: null
		}
	}
]);