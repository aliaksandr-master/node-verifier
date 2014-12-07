"use strict";

var tester = require('../lib/tester');

exports.examples = tester([
	{ rules: 'min_value 3',      value: 33,         expect: true },
	{ rules: 'min_value 33',     value: 33,         expect: true },
	{ rules: 'min_value 333',    value: 33,         expect: false },
	{ rules: 'min_value "3"',    value: 33,         expect: true },
	{ rules: 'min_value "33"',   value: 33,         expect: true },
	{ rules: 'min_value "333"',  value: 33,         expect: false },
	{ rules: 'min_value 3',      value: "33",       expect: true },
	{ rules: 'min_value 33',     value: "-33",      expect: false },
	{ rules: 'min_value 333',    value: "+33",      expect: false },
	{ rules: 'min_value "3"',    value: "33",       expect: true },
	{ rules: 'min_value "33"',   value: "33",       expect: true },
	{ rules: 'min_value "333"',  value: "33",       expect: false },
	{ rules: 'min_value "333"',  value: null,       valueError: true },
	{ rules: 'min_value 333',    value: NaN,        valueError: true },
	{ rules: 'min_value "333"',  value: undefined,  valueError: true },
	{ rules: 'min_value null',   value: 33,         paramError: true },
	{ rules: 'min_value "null"', value: null,       paramError: true },
	{ rules: 'min_value null',   value: NaN,        paramError: true },
	{ rules: 'min_value true',   value: undefined,  paramError: true }
]);