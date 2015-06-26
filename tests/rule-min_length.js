'use strict';
/*eslint no-unused-vars: 0 no-undefined:0 */

var tester = require('./_lib/tester');

exports.examples = tester([
	{
		rules: 'min_length 3',
		value: 4,
		verr: {
			rule: 'min_length',
			params: 3,
			index: null
		}
	},
	{
		rules: 'min_length 3',
		value: '',
		verr: {
			rule: 'min_length',
			params: 3,
			index: null
		}
	},
	{
		rules: 'min_length 3',
		value: NaN,
		verr: {
			rule: 'min_length',
			params: 3,
			index: null
		}
	},
	{
		rules: 'min_length 3',
		value: null,
		verr: {
			rule: 'min_length',
			params: 3,
			index: null
		}
	},
	{
		rules: 'min_length 3',
		value: undefined,
		verr: {
			rule: 'min_length',
			params: 3,
			index: null
		}
	},
	{
		rules: 'min_length 3',
		value: {},
		verr: {
			rule: 'min_length',
			params: 3,
			index: null
		}
	},
	{
		rules: 'min_length 3',
		value: [],
		verr: {
			rule: 'min_length',
			params: 3,
			index: null
		}
	},
	{
		rules: 'min_length 3',
		value: function () {},
		verr: {
			rule: 'min_length',
			params: 3,
			index: null
		}
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
