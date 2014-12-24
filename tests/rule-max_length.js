"use strict";

var tester = require('./_lib/tester');

exports.examples = tester([
	{
		rules: 'max_length 3',
		value: 4,
		expect: true
	},
	{
		rules: 'max_length 3',
		value: "",
		expect: true
	},
	{
		rules: 'max_length 3',
		value: NaN,
		verr: {
			rule: 'max_length',
			params: 3,
			index: null
		}
	},
	{
		rules: 'max_length 3',
		value: null,
		verr: {
			rule: 'max_length',
			params: 3,
			index: null
		}
	},
	{
		rules: 'max_length 3',
		value: undefined,
		verr: {
			rule: 'max_length',
			params: 3,
			index: null
		}
	},
	{
		rules: 'max_length 3',
		value: {},
		verr: {
			rule: 'max_length',
			params: 3,
			index: null
		}
	},
	{
		rules: 'max_length 3',
		value: [],
		expect: true
	},
	{
		rules: 'max_length 3',
		value: function () {},
		verr: {
			rule: 'max_length',
			params: 3,
			index: null
		}
	},
	{
		rules: 'max_length -2',
		value: '',
		error: 'RMAXLENGTH1'
	},
	{
		rules: 'max_length -2',
		value: 'asdasd',
		error: 'RMAXLENGTH1'
	},
	{
		rules: 'max_length 0',
		value: '',
		expect: true
	},
	{
		rules: 'max_length 0',
		value: '123123',
		verr: {
			rule: 'max_length',
			params: 0,
			index: null
		}
	}
]);