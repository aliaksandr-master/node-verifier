"use strict";

var tester = require('./_lib/tester');

exports.examples = tester([
	{
		rules: 'any',
		value: null,
		expect: true
	},
	{
		rules: {
			any: [
				[{type: 'object'}],
				[{type: 'string'}]
			]
		},
		value: 333,
		expect: false
	},
	{
		rules: {
			any: {
				branch1: [ { type: 'object' } ],
				branch2: [ { type: 'string' } ]
			}
		},
		value: 333,
		expect: false
	},
	{
		rules: {
			any: {
				branch1: [ { type: 'object' } ],
				branch2: [ { type: 'string' } ]
			}
		},
		value: "123",
		expect: true
	},
	{
		rules: {
			any: {
				branch1: {eq: 123},
				branch2: {eq: 234},
				branch3: {eq: 345}
			}
		},
		value: "123",
		expect: false
	},
	{
		rules: {
			any: {
				branch1: {eq: 123},
				branch2: {eq: 234},
				branch3: {eq: 345}
			}
		},
		value: 123,
		expect: true
	},
	{
		rules: {
			any: [ { eq: 123 }, { eq: 234 }, { eq: 345 } ]
		},
		value: 123,
		expect: true
	},
	{
		rules: {
			any: [ { eq: 123 }, { eq: 234 }, { eq: 345 } ]
		},
		value: 120,
		expect: false
	}
]);