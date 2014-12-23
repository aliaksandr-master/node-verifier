"use strict";

var tester = require('./_lib/tester');

exports.examples = tester([
	{
		rules: 'exact_length 3',
		 value: 4,
		 expect: false
	},

	{
		rules: 'exact_length 3',
		 value: "",
		 expect: false
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
		 expect: false
	},

	{
		rules: 'exact_length 3',
		 value: null,
		 expect: false
	},

	{
		rules: 'exact_length 3',
		 value: undefined,
		 expect: false
	},

	{
		rules: 'exact_length 3',
		 value: {},
		 expect: false
	},

	{
		rules: 'exact_length 3',
		 value: [],
		 expect: false
	},

	{
		rules: 'exact_length 3',
		 value: [ 1, 2, 3 ],
		 expect: true
	},
		
	{
		rules: 'exact_length 3',
		 value: function () {},
		 expect: false
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
		 expect: false
	}
]);