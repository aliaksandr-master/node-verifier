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
		value: [{}],
		expect: 'REACH1'
	},
	{
		rules: {each: ['type number', 'max_value 10', 'max_length 1']},
		value: [1, 2, 3, 4, 5, 6, 7, 8, 9],
		expect: true
	},
	{
		rules: 'each type object',
		value: 333,
		verr: {
			rule: 'each',
			params: [{type: 'object'}],
			index: null
		}
	},
	{
		rules: {'each': ['type object', 'not empty']},
		value: [{}],
		verr: {
			rule: 'each',
			params: { not: [ { empty: null } ] },
			index: 0
		}
	},
	{
		rules: 'each type object',
		value: [333],
		verr: {
			rule: 'each',
			params: { type: 'object' },
			index: 0
		}
	},
	{
		rules: 'each type object',
		value: [{}, []],
		verr: {
			rule: 'each',
			params: { type: 'object' },
			index: 1
		}
	},
	{
		rules: {each: ['max_value 10', 'max_length 1']},
		value: [{}],
		verr: {
			rule: 'each',
			params: { max_value: 10 },
			index: 0
		}
	},
	{
		rules: {each: ['type number', 'max_value 10', 'max_length 1']},
		value: [{}],
		verr: {
			rule: 'each',
			params: { type: 'number' },
			index: 0
		}
	},
	{
		rules: {each: ['type number', 'max_value 10', 'max_length 1']},
		value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		verr: {
			rule: 'each',
			params: { max_length: 1 },
			index: 9
		}
	}
]);