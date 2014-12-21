"use strict";

var tester = require('./_lib/tester');

exports.examples = tester([
	{ rules: 'empty',  value: null,       expect: true },
	{ rules: 'empty',  value: 333,        expect: false },
	{ rules: 'empty',  value: "333",      expect: false },
	{ rules: 'empty',  value: NaN,        expect: true },
	{ rules: 'empty',  value: 333,        expect: false },
	{ rules: 'empty',  value: "333",      expect: false },
	{ rules: 'empty',  value: undefined,  expect: true },
	{ rules: 'empty',  value: 33,         expect: false },
	{ rules: 'empty',  value: '',         expect: true },
	{ rules: 'empty',  value: {},         expect: true },
	{ rules: 'empty',  value: {a: 123},   expect: false },
	{ rules: 'empty',  value: Object.create({a: 123}),   expect: true },
	{ rules: 'empty',  value: [],         expect: true },
	{ rules: 'empty',  value: [1],        expect: false },
	{ rules: 'empty',  value: false,      expect: true },
	{ rules: 'empty',  value: '0',        expect: false }
]);