"use strict";

var tester = require('./_lib/tester');
var Verifier = require('./_lib/lib');

exports.examples = tester([
	{
		rules: 'type string',
		value: 4,
		expect: false
	},
	{
		rules: 'type string',
		value: "",
		expect: true
	},
	{
		rules: 'type string',
		value: null,
		expect: false
	},
	{
		rules: 'type string',
		value: /a/,
		expect: false
	},
	{
		rules: 'type string',
		value: true,
		expect: false
	},
	{
		rules: 'type string',
		value: undefined,
		expect: false
	},
	{
		rules: 'type string',
		value: {},
		expect: false
	},
	{
		rules: 'type string',
		value: [],
		expect: false
	},
	{
		rules: 'type string',
		value: function () {},
		expect: false
	},
	{
		rules: 'type string',
		value: new Date(),
		expect: false
	},

	{
		rules: 'type boolean',
		value: 4,
		expect: false
	},
	{
		rules: 'type boolean',
		value: "",
		expect: false
	},
	{
		rules: 'type boolean',
		value: null,
		expect: false
	},
	{
		rules: 'type boolean',
		value: /a/,
		expect: false
	},
	{
		rules: 'type boolean',
		value: true,
		expect: true
	},
	{
		rules: 'type boolean',
		value: undefined,
		expect: false
	},
	{
		rules: 'type boolean',
		value: {},
		expect: false
	},
	{
		rules: 'type boolean',
		value: [],
		expect: false
	},
	{
		rules: 'type boolean',
		value: function () {},
		expect: false
	},
	{
		rules: 'type boolean',
		value: new Date(),
		expect: false
	},

	{
		rules: 'type function',
		value: 4,
		expect: false
	},
	{
		rules: 'type function',
		value: "",
		expect: false
	},
	{
		rules: 'type function',
		value: null,
		expect: false
	},
	{
		rules: 'type function',
		value: /a/,
		expect: false
	},
	{
		rules: 'type function',
		value: true,
		expect: false
	},
	{
		rules: 'type function',
		value: undefined,
		expect: false
	},
	{
		rules: 'type function',
		value: {},
		expect: false
	},
	{
		rules: 'type function',
		value: [],
		expect: false
	},
	{
		rules: 'type function',
		value: function () {},
		expect: true
	},
	{
		rules: 'type function',
		value: new Date(),
		expect: false
	},

	{
		rules: 'type function',
		value: 4,
		expect: false
	},
	{
		rules: 'type function',
		value: "",
		expect: false
	},
	{
		rules: 'type function',
		value: null,
		expect: false
	},
	{
		rules: 'type function',
		value: /a/,
		expect: false
	},
	{
		rules: 'type function',
		value: true,
		expect: false
	},
	{
		rules: 'type function',
		value: undefined,
		expect: false
	},
	{
		rules: 'type function',
		value: {},
		expect: false
	},
	{
		rules: 'type function',
		value: [],
		expect: false
	},
	{
		rules: 'type function',
		value: function () {},
		expect: true
	},
	{
		rules: 'type function',
		value: new Date(),
		expect: false
	},

	{
		rules: 'type object',
		value: 4,
		expect: false
	},
	{
		rules: 'type object',
		value: "",
		expect: false
	},
	{
		rules: 'type object',
		value: null,
		expect: false
	},
	{
		rules: 'type object',
		value: /a/,
		expect: false
	},
	{
		rules: 'type object',
		value: true,
		expect: false
	},
	{
		rules: 'type object',
		value: undefined,
		expect: false
	},
	{
		rules: 'type object',
		value: {},
		expect: true
	},
	{
		rules: 'type object',
		value: [],
		expect: false
	},
	{
		rules: 'type object',
		value: function () {},
		expect: false
	},
	{
		rules: 'type object',
		value: new Date(),
		expect: false
	},

	{
		rules: 'type array',
		value: 4,
		expect: false
	},
	{
		rules: 'type array',
		value: "",
		expect: false
	},
	{
		rules: 'type array',
		value: null,
		expect: false
	},
	{
		rules: 'type array',
		value: /a/,
		expect: false
	},
	{
		rules: 'type array',
		value: true,
		expect: false
	},
	{
		rules: 'type array',
		value: undefined,
		expect: false
	},
	{
		rules: 'type array',
		value: {},
		expect: false
	},
	{
		rules: 'type array',
		value: [],
		expect: true
	},
	{
		rules: 'type array',
		value: function () {},
		expect: false
	},
	{
		rules: 'type array',
		value: new Date(),
		expect: false
	},

	{
		rules: 'type undefined',
		value: 4,
		expect: false
	},
	{
		rules: 'type undefined',
		value: "",
		expect: false
	},
	{
		rules: 'type undefined',
		value: null,
		expect: false
	},
	{
		rules: 'type undefined',
		value: /a/,
		expect: false
	},
	{
		rules: 'type undefined',
		value: true,
		expect: false
	},
	{
		rules: 'type undefined',
		value: undefined,
		expect: true
	},
	{
		rules: 'type undefined',
		value: {},
		expect: false
	},
	{
		rules: 'type undefined',
		value: [],
		expect: false
	},
	{
		rules: 'type undefined',
		value: function () {},
		expect: false
	},
	{
		rules: 'type undefined',
		value: new Date(),
		expect: false
	},

	{
		rules: 'type "null"',
		value: 4,
		expect: false
	},
	{
		rules: 'type "null"',
		value: "",
		expect: false
	},
	{
		rules: 'type "null"',
		value: null,
		expect: true
	},
	{
		rules: 'type "null"',
		value: /a/,
		expect: false
	},
	{
		rules: 'type "null"',
		value: true,
		expect: false
	},
	{
		rules: 'type "null"',
		value: undefined,
		expect: false
	},
	{
		rules: 'type "null"',
		value: {},
		expect: false
	},
	{
		rules: 'type "null"',
		value: [],
		expect: false
	},
	{
		rules: 'type "null"',
		value: function () {},
		expect: false
	},
	{
		rules: 'type "null"',
		value: new Date(),
		expect: false
	},

	{
		rules: 'type RegExp',
		value: 4,
		expect: false
	},
	{
		rules: 'type RegExp',
		value: "",
		expect: false
	},
	{
		rules: 'type RegExp',
		value: null,
		expect: false
	},
	{
		rules: 'type RegExp',
		value: /a/,
		expect: true
	},
	{
		rules: 'type RegExp',
		value: true,
		expect: false
	},
	{
		rules: 'type RegExp',
		value: undefined,
		expect: false
	},
	{
		rules: 'type RegExp',
		value: {},
		expect: false
	},

	{
		rules: 'type RegExp',
		value: [],
		expect: false
	},
	{
		rules: 'type RegExp',
		value: function () {},
		expect: false
	},
	{
		rules: 'type RegExp',
		value: new Date(),
		expect: false
	},

	{
		rules: 'type number',
		value: 4,
		expect: true
	},
	{
		rules: 'type number',
		value: "",
		expect: false
	},
	{
		rules: 'type number',
		value: null,
		expect: false
	},
	{
		rules: 'type number',
		value: /a/,
		expect: false
	},
	{
		rules: 'type number',
		value: true,
		expect: false
	},
	{
		rules: 'type number',
		value: undefined,
		expect: false
	},
	{
		rules: 'type number',
		value: {},
		expect: false
	},
	{
		rules: 'type number',
		value: [],
		expect: false
	},
	{
		rules: 'type number',
		value: function () {},
		expect: false
	},
	{
		rules: 'type number',
		value: new Date(),
		expect: false
	},

	{
		rules: 'type Date',
		value: 4,
		expect: false
	},
	{
		rules: 'type Date',
		value: "",
		expect: false
	},
	{
		rules: 'type Date',
		value: null,
		expect: false
	},
	{
		rules: 'type Date',
		value: /a/,
		expect: false
	},
	{
		rules: 'type Date',
		value: undefined,
		expect: false
	},
	{
		rules: 'type Date',
		value: {},
		expect: false
	},
	{
		rules: 'type Date',
		value: [],
		expect: false
	},
	{
		rules: 'type Date',
		value: function () {},
		expect: false
	},
	{
		rules: 'type Date',
		value: new Date(),
		expect: true
	}
]);

exports['check params'] = function (test) {
	test.throws(function () {
		var verifier = new Verifier({type: null});
	});

	test.done();
};