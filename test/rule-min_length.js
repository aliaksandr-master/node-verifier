"use strict";

var tester = require('../lib/tester');

exports.examples = tester([
	{ rules: 'min_length 3', value: 4, expect: false },
	{ rules: 'min_length 3', value: "", expect: false },
	{ rules: 'min_length 3', value: NaN, expect: false, valueError: true },
	{ rules: 'min_length 3', value: null, expect: true, valueError: true },
	{ rules: 'min_length 3', value: undefined, expect: true, valueError: true },
	{ rules: 'min_length 3', value: {}, expect: false, valueError: true },
	{ rules: 'min_length 3', value: [], expect: false },
	{ rules: 'min_length 3', value: function () {}, expect: true, valueError: true },
	{ rules: 'min_length -2', value: '', expect: false, paramError: true },
	{ rules: 'min_length -2', value: 'asdasd', expect: false, paramError: true },
	{ rules: 'min_length 0',  value: '', expect: true },
	{ rules: 'min_length 0',  value: '123123', expect: true }
]);