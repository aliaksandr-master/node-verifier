"use strict";

var tester = require('../lib/tester');

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
	{ rules: 'max_value "333"',  value: null,       valueError: true },
	{ rules: 'max_value 333',    value: NaN,        valueError: true },
	{ rules: 'max_value "333"',  value: undefined,  valueError: true },
	{ rules: 'max_value null',   value: 33,         paramError: true },
	{ rules: 'max_value "null"', value: null,       paramError: true },
	{ rules: 'max_value null',   value: NaN,        paramError: true },
	{ rules: 'max_value true',   value: undefined,  paramError: true }
]);