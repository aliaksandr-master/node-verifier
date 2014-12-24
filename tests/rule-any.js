"use strict";

var tester = require('./_lib/tester');
var Verifier = require('./_lib/lib');

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
		verr: {
			rule: 'any',
			params: [[{type: 'object'}], [{type: 'string'}]]
		}
	},
	{
		rules: {
			any: {
				branch1: [ { type: 'object' } ],
				branch2: [ { type: 'string' } ]
			}
		},
		value: 333,
		verr: {
			rule: 'any',
			params: [[{type: 'object'}], [{type: 'string'}]]
		}
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
		expect: false,
		verr: {
			rule: 'any',
			params: [[{eq: 123}], [{eq: 234}], [{eq: 345}]]
		}
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
		expect: false,
		verr: {
			rule: 'any',
			params: [[{eq: 123}], [{eq: 234}], [{eq: 345}]]
		}
	}
]);

exports['check params'] = function (test) {
	test.throws(function () {
		var verifier = new Verifier({any: [1, 2]});
	});

	test.throws(function () {
		var verifier = new Verifier('any a');
	});

	var verifier = new Verifier({'any': null});

	verifier.verify(123, function (err) {
		test.ok(!err);
		test.done(err);
	});
};

exports['check error'] = function (test) {
	var error = new Error('qweqwe');

	var MySuperRule = Verifier.Rule.extend({
		check: function () {
			return error;
		}
	});

	Verifier.Rule.add('mySuperRule', MySuperRule);

	var verifier = new Verifier({
		'any': [
			[{ type: 'object'}],
			[{ mySuperRule: '123123'}]
		]
	});

	verifier.verify(123, function (err) {
		test.ok(err === error);
		test.done();
	});
};