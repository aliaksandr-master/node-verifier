"use strict";

var tester = require('./_lib/tester');

exports.examples = tester([
	{
		rules: 'exact_length 3',
		value: 4,
		verr: {
			rule: 'exact_length',
			params: 3,
			index: null
		}
	},

	{
		rules: 'exact_length 3',
		value: "",
		verr: {
			rule: 'exact_length',
			params: 3,
			index: null
		}
	},

	{
		rules: 'exact_length 3',
		value: "111",
		expect: true
	},

	{
		rules: 'exact_length 3',
		value: 111,
		expect: true
	},

	{
		rules: 'exact_length 3',
		value: NaN,
		verr: {
			rule: 'exact_length',
			params: 3,
			index: null
		}
	},

	{
		rules: 'exact_length 3',
		value: null,
		verr: {
			rule: 'exact_length',
			params: 3,
			index: null
		}
	},

	{
		rules: 'exact_length 3',
		value: undefined,
		verr: {
			rule: 'exact_length',
			params: 3,
			index: null
		}
	},

	{
		rules: 'exact_length 3',
		value: {},
		verr: {
			rule: 'exact_length',
			params: 3,
			index: null
		}
	},

	{
		rules: 'exact_length 3',
		value: [],
		verr: {
			rule: 'exact_length',
			params: 3,
			index: null
		}
	},

	{
		rules: 'exact_length 3',
		value: [ 1, 2, 3 ],
		expect: true
	},
		
	{
		rules: 'exact_length 3',
		value: function () {},
		verr: {
			rule: 'exact_length',
			params: 3,
			index: null
		}
	},
		
	{
		rules: 'exact_length -2',
		value: '',
		error: 'REXACTLENGTH1'
	},
		
	{
		rules: 'exact_length -2',
		value: 'asdasd',
		error: 'REXACTLENGTH1'
	},
		
	{
		rules: 'exact_length 0',
		value: '',
		expect: true
	},
		
	{
		rules: 'exact_length 0',
		value: '123123',
		verr: {
			rule: 'exact_length',
			params: 0,
			index: null
		}
	}
]);