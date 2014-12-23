"use strict";

var tester = require('./_lib/tester');

exports.examples = tester([
	{
		rules: 'each',
		value: null,
		error: 'REACH1'
	},
	{
		rules: 'each hello',
		value: 333,
		error: 'R8'
	},
	{
		rules: 'each type object',
		value: 333,
		expect: false
	},
	{
		rules: 'each type object',
		value: [333],
		expect: false
	},
	{
		rules: 'each type object',
		value: [{}],
		expect: 'REACH1'
	},
	{
		rules: 'each type object',
		value: [{}, []],
		expect: false
	},
	{
		rules: {each: ['max_value 10', 'max_length 1']},
		value: [{}],
		expect: false
	},
	{
		rules: {each: ['type number', 'max_value 10', 'max_length 1']},
		value: [{}],
		expect: false
	},
	{
		rules: {each: ['type number', 'max_value 10', 'max_length 1']},
		value: [1, 2, 3, 4, 5, 6, 7, 8, 9],
		expect: true
	},
	{
		rules: {each: ['type number', 'max_value 10', 'max_length 1']},
		value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		expect: false
	}
]);