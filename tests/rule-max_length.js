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
		expect: false
	},
	{
		rules: 'max_length 3',
		value: null,
		expect: false
	},
	{
		rules: 'max_length 3',
		value: undefined,
		expect: false
	},
	{
		rules: 'max_length 3',
		value: {},
		expect: false
	},
	{
		rules: 'max_length 3',
		value: [],
		expect: true
	},
	{
		rules: 'max_length 3',
		value: function () {},
		expect: false
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
		expect: false
	}
]);