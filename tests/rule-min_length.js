"use strict";

var tester = require('./_lib/tester');

exports.examples = tester([
	{
		rules: 'min_length 3',
		value: 4,
		expect: false
	},
	{
		rules: 'min_length 3',
		value: "",
		expect: false
	},
	{
		rules: 'min_length 3',
		value: NaN,
		expect: false
	},
	{
		rules: 'min_length 3',
		value: null,
		expect: false
	},
	{
		rules: 'min_length 3',
		value: undefined,
		expect: false
	},
	{
		rules: 'min_length 3',
		value: {},
		expect: false
	},
	{
		rules: 'min_length 3',
		value: [],
		expect: false
	},
	{
		rules: 'min_length 3',
		value: function () {},
		expect: false
	},
	{
		rules: 'min_length -2',
		value: '',
		error: 'RMINLENGTH1'
	},
	{
		rules: 'min_length -2',
		value: 'asdasd',
		error: 'RMINLENGTH1'
	},
	{
		rules: 'min_length 0',
		value: '',
		expect: true
	},
	{
		rules: 'min_length 0',
		value: '123123',
		expect: true
	}
]);