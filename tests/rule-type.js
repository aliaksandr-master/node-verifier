"use strict";

var tester = require('./_lib/tester');
var Verifier = require('./_lib/lib');

exports.examples = tester([
	{
		rules: 'type string',
		value: 4,
		verr: {
			rule: 'type',
			params: 'string',
			index: null
		}
	},
	{
		rules: 'type string',
		value: "",
		expect: true
	},
	{
		rules: 'type string',
		value: null,
		verr: {
			rule: 'type',
			params: 'string',
			index: null
		}
	},
	{
		rules: 'type string',
		value: /a/,
		verr: {
			rule: 'type',
			params: 'string',
			index: null
		}
	},
	{
		rules: 'type string',
		value: true,
		verr: {
			rule: 'type',
			params: 'string',
			index: null
		}
	},
	{
		rules: 'type string',
		value: undefined,
		verr: {
			rule: 'type',
			params: 'string',
			index: null
		}
	},
	{
		rules: 'type string',
		value: {},
		verr: {
			rule: 'type',
			params: 'string',
			index: null
		}
	},
	{
		rules: 'type string',
		value: [],
		verr: {
			rule: 'type',
			params: 'string',
			index: null
		}
	},
	{
		rules: 'type string',
		value: function () {},
		verr: {
			rule: 'type',
			params: 'string',
			index: null
		}
	},
	{
		rules: 'type string',
		value: new Date(),
		verr: {
			rule: 'type',
			params: 'string',
			index: null
		}
	},

	{
		rules: 'type boolean',
		value: 4,
		verr: {
			rule: 'type',
			params: 'boolean',
			index: null
		}
	},
	{
		rules: 'type boolean',
		value: "",
		verr: {
			rule: 'type',
			params: 'boolean',
			index: null
		}
	},
	{
		rules: 'type boolean',
		value: null,
		verr: {
			rule: 'type',
			params: 'boolean',
			index: null
		}
	},
	{
		rules: 'type boolean',
		value: /a/,
		verr: {
			rule: 'type',
			params: 'boolean',
			index: null
		}
	},
	{
		rules: 'type boolean',
		value: true,
		expect: true
	},
	{
		rules: 'type boolean',
		value: undefined,
		verr: {
			rule: 'type',
			params: 'boolean',
			index: null
		}
	},
	{
		rules: 'type boolean',
		value: {},
		verr: {
			rule: 'type',
			params: 'boolean',
			index: null
		}
	},
	{
		rules: 'type boolean',
		value: [],
		verr: {
			rule: 'type',
			params: 'boolean',
			index: null
		}
	},
	{
		rules: 'type boolean',
		value: function () {},
		verr: {
			rule: 'type',
			params: 'boolean',
			index: null
		}
	},
	{
		rules: 'type boolean',
		value: new Date(),
		verr: {
			rule: 'type',
			params: 'boolean',
			index: null
		}
	},

	{
		rules: 'type function',
		value: 4,
		verr: {
			rule: 'type',
			params: 'function',
			index: null
		}
	},
	{
		rules: 'type function',
		value: "",
		verr: {
			rule: 'type',
			params: 'function',
			index: null
		}
	},
	{
		rules: 'type function',
		value: null,
		verr: {
			rule: 'type',
			params: 'function',
			index: null
		}
	},
	{
		rules: 'type function',
		value: /a/,
		verr: {
			rule: 'type',
			params: 'function',
			index: null
		}
	},
	{
		rules: 'type function',
		value: true,
		verr: {
			rule: 'type',
			params: 'function',
			index: null
		}
	},
	{
		rules: 'type function',
		value: undefined,
		verr: {
			rule: 'type',
			params: 'function',
			index: null
		}
	},
	{
		rules: 'type function',
		value: {},
		verr: {
			rule: 'type',
			params: 'function',
			index: null
		}
	},
	{
		rules: 'type function',
		value: [],
		verr: {
			rule: 'type',
			params: 'function',
			index: null
		}
	},
	{
		rules: 'type function',
		value: function () {},
		expect: true
	},
	{
		rules: 'type function',
		value: new Date(),
		verr: {
			rule: 'type',
			params: 'function',
			index: null
		}
	},

	{
		rules: 'type function',
		value: 4,
		verr: {
			rule: 'type',
			params: 'function',
			index: null
		}
	},
	{
		rules: 'type function',
		value: "",
		verr: {
			rule: 'type',
			params: 'function',
			index: null
		}
	},
	{
		rules: 'type function',
		value: null,
		verr: {
			rule: 'type',
			params: 'function',
			index: null
		}
	},
	{
		rules: 'type function',
		value: /a/,
		verr: {
			rule: 'type',
			params: 'function',
			index: null
		}
	},
	{
		rules: 'type function',
		value: true,
		verr: {
			rule: 'type',
			params: 'function',
			index: null
		}
	},
	{
		rules: 'type function',
		value: undefined,
		verr: {
			rule: 'type',
			params: 'function',
			index: null
		}
	},
	{
		rules: 'type function',
		value: {},
		verr: {
			rule: 'type',
			params: 'function',
			index: null
		}
	},
	{
		rules: 'type function',
		value: [],
		verr: {
			rule: 'type',
			params: 'function',
			index: null
		}
	},
	{
		rules: 'type function',
		value: function () {},
		expect: true
	},
	{
		rules: 'type function',
		value: new Date(),
		verr: {
			rule: 'type',
			params: 'function',
			index: null
		}
	},

	{
		rules: 'type object',
		value: 4,
		verr: {
			rule: 'type',
			params: 'object',
			index: null
		}
	},
	{
		rules: 'type object',
		value: "",
		verr: {
			rule: 'type',
			params: 'object',
			index: null
		}
	},
	{
		rules: 'type object',
		value: null,
		verr: {
			rule: 'type',
			params: 'object',
			index: null
		}
	},
	{
		rules: 'type object',
		value: /a/,
		verr: {
			rule: 'type',
			params: 'object',
			index: null
		}
	},
	{
		rules: 'type object',
		value: true,
		verr: {
			rule: 'type',
			params: 'object',
			index: null
		}
	},
	{
		rules: 'type object',
		value: undefined,
		verr: {
			rule: 'type',
			params: 'object',
			index: null
		}
	},
	{
		rules: 'type object',
		value: {},
		expect: true
	},
	{
		rules: 'type object',
		value: [],
		verr: {
			rule: 'type',
			params: 'object',
			index: null
		}
	},
	{
		rules: 'type object',
		value: function () {},
		verr: {
			rule: 'type',
			params: 'object',
			index: null
		}
	},
	{
		rules: 'type object',
		value: new Date(),
		verr: {
			rule: 'type',
			params: 'object',
			index: null
		}
	},

	{
		rules: 'type array',
		value: 4,
		verr: {
			rule: 'type',
			params: 'array',
			index: null
		}
	},
	{
		rules: 'type array',
		value: "",
		verr: {
			rule: 'type',
			params: 'array',
			index: null
		}
	},
	{
		rules: 'type array',
		value: null,
		verr: {
			rule: 'type',
			params: 'array',
			index: null
		}
	},
	{
		rules: 'type array',
		value: /a/,
		verr: {
			rule: 'type',
			params: 'array',
			index: null
		}
	},
	{
		rules: 'type array',
		value: true,
		verr: {
			rule: 'type',
			params: 'array',
			index: null
		}
	},
	{
		rules: 'type array',
		value: undefined,
		verr: {
			rule: 'type',
			params: 'array',
			index: null
		}
	},
	{
		rules: 'type array',
		value: {},
		verr: {
			rule: 'type',
			params: 'array',
			index: null
		}
	},
	{
		rules: 'type array',
		value: [],
		expect: true
	},
	{
		rules: 'type array',
		value: function () {},
		verr: {
			rule: 'type',
			params: 'array',
			index: null
		}
	},
	{
		rules: 'type array',
		value: new Date(),
		verr: {
			rule: 'type',
			params: 'array',
			index: null
		}
	},

	{
		rules: 'type undefined',
		value: 4,
		verr: {
			rule: 'type',
			params: 'undefined',
			index: null
		}
	},
	{
		rules: 'type undefined',
		value: "",
		verr: {
			rule: 'type',
			params: 'undefined',
			index: null
		}
	},
	{
		rules: 'type undefined',
		value: null,
		verr: {
			rule: 'type',
			params: 'undefined',
			index: null
		}
	},
	{
		rules: 'type undefined',
		value: /a/,
		verr: {
			rule: 'type',
			params: 'undefined',
			index: null
		}
	},
	{
		rules: 'type undefined',
		value: true,
		verr: {
			rule: 'type',
			params: 'undefined',
			index: null
		}
	},
	{
		rules: 'type undefined',
		value: undefined,
		expect: true
	},
	{
		rules: 'type undefined',
		value: {},
		verr: {
			rule: 'type',
			params: 'undefined',
			index: null
		}
	},
	{
		rules: 'type undefined',
		value: [],
		verr: {
			rule: 'type',
			params: 'undefined',
			index: null
		}
	},
	{
		rules: 'type undefined',
		value: function () {},
		verr: {
			rule: 'type',
			params: 'undefined',
			index: null
		}
	},
	{
		rules: 'type undefined',
		value: new Date(),
		verr: {
			rule: 'type',
			params: 'undefined',
			index: null
		}
	},

	{
		rules: 'type "null"',
		value: 4,
		verr: {
			rule: 'type',
			params: 'null',
			index: null
		}
	},
	{
		rules: 'type "null"',
		value: "",
		verr: {
			rule: 'type',
			params: 'null',
			index: null
		}
	},
	{
		rules: 'type "null"',
		value: null,
		expect: true
	},
	{
		rules: 'type "null"',
		value: /a/,
		verr: {
			rule: 'type',
			params: 'null',
			index: null
		}
	},
	{
		rules: 'type "null"',
		value: true,
		verr: {
			rule: 'type',
			params: 'null',
			index: null
		}
	},
	{
		rules: 'type "null"',
		value: undefined,
		verr: {
			rule: 'type',
			params: 'null',
			index: null
		}
	},
	{
		rules: 'type "null"',
		value: {},
		verr: {
			rule: 'type',
			params: 'null',
			index: null
		}
	},
	{
		rules: 'type "null"',
		value: [],
		verr: {
			rule: 'type',
			params: 'null',
			index: null
		}
	},
	{
		rules: 'type "null"',
		value: function () {},
		verr: {
			rule: 'type',
			params: 'null',
			index: null
		}
	},
	{
		rules: 'type "null"',
		value: new Date(),
		verr: {
			rule: 'type',
			params: 'null',
			index: null
		}
	},

	{
		rules: 'type RegExp',
		value: 4,
		verr: {
			rule: 'type',
			params: 'RegExp',
			index: null
		}
	},
	{
		rules: 'type RegExp',
		value: "",
		verr: {
			rule: 'type',
			params: 'RegExp',
			index: null
		}
	},
	{
		rules: 'type RegExp',
		value: null,
		verr: {
			rule: 'type',
			params: 'RegExp',
			index: null
		}
	},
	{
		rules: 'type RegExp',
		value: /a/,
		expect: true
	},
	{
		rules: 'type RegExp',
		value: true,
		verr: {
			rule: 'type',
			params: 'RegExp',
			index: null
		}
	},
	{
		rules: 'type RegExp',
		value: undefined,
		verr: {
			rule: 'type',
			params: 'RegExp',
			index: null
		}
	},
	{
		rules: 'type RegExp',
		value: {},
		verr: {
			rule: 'type',
			params: 'RegExp',
			index: null
		}
	},

	{
		rules: 'type RegExp',
		value: [],
		verr: {
			rule: 'type',
			params: 'RegExp',
			index: null
		}
	},
	{
		rules: 'type RegExp',
		value: function () {},
		verr: {
			rule: 'type',
			params: 'RegExp',
			index: null
		}
	},
	{
		rules: 'type RegExp',
		value: new Date(),
		verr: {
			rule: 'type',
			params: 'RegExp',
			index: null
		}
	},

	{
		rules: 'type number',
		value: 4,
		expect: true
	},
	{
		rules: 'type number',
		value: "",
		verr: {
			rule: 'type',
			params: 'number',
			index: null
		}
	},
	{
		rules: 'type number',
		value: null,
		verr: {
			rule: 'type',
			params: 'number',
			index: null
		}
	},
	{
		rules: 'type number',
		value: /a/,
		verr: {
			rule: 'type',
			params: 'number',
			index: null
		}
	},
	{
		rules: 'type number',
		value: true,
		verr: {
			rule: 'type',
			params: 'number',
			index: null
		}
	},
	{
		rules: 'type number',
		value: undefined,
		verr: {
			rule: 'type',
			params: 'number',
			index: null
		}
	},
	{
		rules: 'type number',
		value: {},
		verr: {
			rule: 'type',
			params: 'number',
			index: null
		}
	},
	{
		rules: 'type number',
		value: [],
		verr: {
			rule: 'type',
			params: 'number',
			index: null
		}
	},
	{
		rules: 'type number',
		value: function () {},
		verr: {
			rule: 'type',
			params: 'number',
			index: null
		}
	},
	{
		rules: 'type number',
		value: new Date(),
		verr: {
			rule: 'type',
			params: 'number',
			index: null
		}
	},

	{
		rules: 'type Date',
		value: 4,
		verr: {
			rule: 'type',
			params: 'Date',
			index: null
		}
	},
	{
		rules: 'type Date',
		value: "",
		verr: {
			rule: 'type',
			params: 'Date',
			index: null
		}
	},
	{
		rules: 'type Date',
		value: null,
		verr: {
			rule: 'type',
			params: 'Date',
			index: null
		}
	},
	{
		rules: 'type Date',
		value: /a/,
		verr: {
			rule: 'type',
			params: 'Date',
			index: null
		}
	},
	{
		rules: 'type Date',
		value: undefined,
		verr: {
			rule: 'type',
			params: 'Date',
			index: null
		}
	},
	{
		rules: 'type Date',
		value: {},
		verr: {
			rule: 'type',
			params: 'Date',
			index: null
		}
	},
	{
		rules: 'type Date',
		value: [],
		verr: {
			rule: 'type',
			params: 'Date',
			index: null
		}
	},
	{
		rules: 'type Date',
		value: function () {},
		verr: {
			rule: 'type',
			params: 'Date',
			index: null
		}
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