"use strict";

var tester = require('./_lib/tester');

exports.examples = tester([
	{ rules: 'not',                value: 33,    error: 'RNOT1' },
	{ rules: 'not hello',          value: 33,    error: 'R8' },
	{ rules: 'not format ^3$',     value: 33,    expect: true },
	{ rules: 'not format ^3$',     value: 3,     expect: false },
	{ rules: 'not type string',    value: "",    expect: false },
	{ rules: 'not type string',    value: null,  expect: true },
	{ rules: 'not exact_length 3', value: "",    expect: true },
	{ rules: 'not exact_length 3', value: "111", expect: false }
]);
