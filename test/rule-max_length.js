"use strict";

var tester = require('../lib/tester');

exports.examples = tester([
	{ rules: 'max_length 3', value: 4, expect: true },
	{ rules: 'max_length 3', value: "", expect: true },
	{ rules: 'max_length 3', value: NaN, expect: false, valueError: true },
	{ rules: 'max_length 3', value: null, expect: false, valueError: true },
	{ rules: 'max_length 3', value: undefined, expect: false, valueError: true },
	{ rules: 'max_length 3', value: {}, expect: false, valueError: true },
	{ rules: 'max_length 3', value: [], expect: true },
	{ rules: 'max_length 3', value: function () {}, expect: false, valueError: true },
	{ rules: 'max_length -2', value: '', expect: false, paramError: true },
	{ rules: 'max_length -2', value: 'asdasd', expect: false, paramError: true },
	{ rules: 'max_length 0',  value: '', expect: true },
	{ rules: 'max_length 0',  value: '123123', expect: false }
]);