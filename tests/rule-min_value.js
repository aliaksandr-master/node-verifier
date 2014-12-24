"use strict";

var tester = require('./_lib/tester');

exports.examples = tester([
	{
		rules: 'min_value 3',
		value: 33,
		expect: true
	},
	{
		rules: 'min_value 33',
		value: 33,
		expect: true
	},
	{
		rules: 'min_value 333',
		value: 33,
		verr: {
			rule: 'min_value',
			params: 333,
			index: null
		}
	},
	{
		rules: 'min_value "3"',
		value: 33,
		expect: true
	},
	{
		rules: 'min_value "33"',
		value: 33,
		expect: true
	},
	{
		rules: 'min_value "333"',
		value: 33,
		verr: {
			rule: 'min_value',
			params: 333,
			index: null
		}
	},
	{
		rules: 'min_value 3',
		value: "33",
		expect: true
	},
	{
		rules: 'min_value 33',
		value: "-33",
		verr: {
			rule: 'min_value',
			params: 33,
			index: null
		}
	},
	{
		rules: 'min_value 333',
		value: "+33",
		verr: {
			rule: 'min_value',
			params: 333,
			index: null
		}
	},
	{
		rules: 'min_value "3"',
		value: "33",
		expect: true
	},
	{
		rules: 'min_value "33"',
		value: "33",
		expect: true
	},
	{
		rules: 'min_value "333"',
		value: "33",
		verr: {
			rule: 'min_value',
			params: 333,
			index: null
		}
	},
	{
		rules: 'min_value "333"',
		value: null,
		verr: {
			rule: 'min_value',
			params: 333,
			index: null
		}
	},
	{
		rules: 'min_value 333',
		value: NaN,
		verr: {
			rule: 'min_value',
			params: 333,
			index: null
		}
	},
	{
		rules: 'min_value "333"',
		value: undefined,
		verr: {
			rule: 'min_value',
			params: 333,
			index: null
		}
	},
	{
		rules: 'min_value null',
		value: 33,
		error: 'RMINVALUE1'
	},
	{
		rules: 'min_value "null"',
		value: null,
		error: 'RMINVALUE1'
	},
	{
		rules: 'min_value null',
		value: NaN,
		error: 'RMINVALUE1'
	},
	{
		rules: 'min_value true',
		value: undefined,
		error: 'RMINVALUE1'
	}
]);