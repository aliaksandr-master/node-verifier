'use strict';
/*eslint no-unused-vars: 0 no-undefined:0 */

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
				[{ type: 'object' }],
				[{ type: 'string' }]
			]
		},
		value: 333,
		verr: {
			rule: 'type',
			params: 'string'
		}
	},
	{
		rules: {
			any: {
				branch1: [{ type: 'object' }],
				branch2: [{ type: 'string' }]
			}
		},
		value: 333,
		verr: {
			rule: 'type',
			params: 'string'
		}
	},
	{
		rules: {
			any: {
				branch1: [{ type: 'object' }],
				branch2: [{ type: 'string' }]
			}
		},
		value: '123',
		expect: true
	},
	{
		rules: {
			any: {
				branch1: { eq: 123 },
				branch2: { eq: 234 },
				branch3: { eq: 345 }
			}
		},
		value: '123',
		verr: {
			rule: 'eq',
			params: 345
		}
	},
	{
		rules: {
			any: {
				branch1: { eq: 123 },
				branch2: { eq: 234 },
				branch3: { eq: 345 }
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
		verr: {
			rule: 'eq',
			params: 345
		}
	},
	{
		rules: {
			any: [ 'not required', [ 'type string', { contains: [ 'ASC', 'DESC' ] } ] ]
		},
		value: 120,
		verr: {
			rule: 'type',
			params: 'string'
		}
	},
	{
		rules: {
			any: [ 'type undefined', [ 'type string', { contains: [ 'ASC', 'DESC' ] } ] ]
		},
		value: undefined,
		expect: true
	},
	{
		rules: {
			any: [ 'type undefined', [ 'type string', { contains: [ 'ASC', 'DESC' ] } ] ]
		},
		value: 'ASC',
		expect: true
	},
	{
		rules: {
			any: [ 'type undefined', [ 'type string', { contains: [ 'ASC', 'DESC' ] } ] ]
		},
		value: 'asd',
		verr: {
			rule: 'contains',
			params: [ 'ASC', 'DESC' ]
		}
	},
	{
		rules: {
			any: [ 'type undefined', [ 'type string', { contains: [ 'ASC', 'DESC' ] } ] ]
		},
		value: 'asc',
		verr: {
			rule: 'contains',
			params: [ 'ASC', 'DESC' ]
		}
	}
]);

exports['check params'] = function (test) {
	test.throws(function () {
		var verifier = new Verifier({ any: [ 1, 2 ] });

	});

	test.throws(function () {
		var verifier = new Verifier('any a');

	});

	var verifier = new Verifier({ any: null });

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
			[{ type: 'object' }],
			[{ mySuperRule: '123123' }]
		]
	});

	verifier.verify(123, function (err) {
		test.ok(err === error);
		test.done();
	});
};
