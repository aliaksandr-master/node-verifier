"use strict";

var tester = require('../lib/tester');

exports.examples = tester([
	{ rules: 'eq "333"',  value: null,       expect: false },
	{ rules: 'eq "333"',  value: 333,        expect: false },
	{ rules: 'eq "333"',  value: "333",      expect: true },
	{ rules: 'eq 333',    value: NaN,        expect: false },
	{ rules: 'eq 333',    value: 333,        expect: true },
	{ rules: 'eq 333',    value: "333",      expect: false },
	{ rules: 'eq "333"',  value: undefined,  expect: false },
	{ rules: 'eq null',   value: 33,         expect: false },
	{ rules: 'eq "null"', value: null,       expect: false },
	{ rules: 'eq null',   value: NaN,        expect: false },
	{ rules: 'eq null',   value: null,       expect: true },
	{ rules: 'eq true',   value: undefined,  expect: false }
]);