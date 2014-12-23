"use strict";

var tester = require('./_lib/tester');

exports.examples = tester([
	{ rules: 'max_value 3',      value: 33,         expect: false },
	{ rules: 'max_value 33',     value: 33,         expect: true },
	{ rules: 'max_value 333',    value: 33,         expect: true },
	{ rules: 'max_value "3"',    value: 33,         expect: false },
	{ rules: 'max_value "33"',   value: 33,         expect: true },
	{ rules: 'max_value "333"',  value: 33,         expect: true },
	{ rules: 'max_value 3',      value: "33",       expect: false },
	{ rules: 'max_value 33',     value: "-33",       expect: true },
	{ rules: 'max_value 333',    value: "+33",       expect: true },
	{ rules: 'max_value "3"',    value: "33",       expect: false },
	{ rules: 'max_value "33"',   value: "33",       expect: true },
	{ rules: 'max_value "333"',  value: "33",       expect: true },
	{ rules: 'max_value "333"',  value: null,       expect: false },
	{ rules: 'max_value 333',    value: NaN,        expect: false },
	{ rules: 'max_value "333"',  value: undefined,  expect: false },
	{ rules: 'max_value null',   value: 33,         error: 'RMAXVALUE1' },
	{ rules: 'max_value "null"', value: null,       error: 'RMAXVALUE1' },
	{ rules: 'max_value null',   value: NaN,        error: 'RMAXVALUE1' },
	{ rules: 'max_value true',   value: undefined,  error: 'RMAXVALUE1' }
]);