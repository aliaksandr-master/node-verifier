"use strict";

var _ = require('lodash');
var tester = require('./_lib/tester');
var Verifier = require('./_lib/lib');

exports.flow = {
	standard_call: tester([
		{ rules: 'type string',                       value: 4,      verr: { rule: 'type', params: 'string', index: null } },
		{ rules: 'type string',                       value: "",     expect: true },
		{ rules: ['type string'],                     value: 4,      verr: { rule: 'type', params: 'string', index: null } },
		{ rules: ['type string'],                     value: "",     expect: true },
		{ rules: {type: 'string'},                    value: 4,      verr: { rule: 'type', params: 'string', index: null } },
		{ rules: {type: 'string'},                    value: "",     expect: true },
		{ rules: [{type: 'string'}],                  value: 4,      verr: { rule: 'type', params: 'string', index: null } },
		{ rules: [{type: 'string'}],                  value: "",     expect: true },
		{ rules: ['type string', 'max_length 2'],     value: 4,      verr: { rule: 'type', params: 'string', index: null } },
		{ rules: ['type string', 'max_length 2'],     value: "1",    expect: true },
		{ rules: [{type: 'string'}, {max_length: 2}], value: 4,      verr: { rule: 'type', params: 'string', index: null } },
		{ rules: [{type: 'string'}, {max_length: 2}], value: "1",    expect: true }
	]),

	'create by function': function (test) {
		var verifier1 = new Verifier('type string');
		var verifier2 = Verifier('type string'); // jshint ignore : line

		test.ok(_.isEqual(verifier1, verifier2));
		test.done();
	},

	'throws error if rules is incorrect': function (test) {

		test.throws(function () {
			var verifier = new Verifier();
		});

		test.throws(function () {
			var verifier = new Verifier(123);
		});

		test.throws(function () {
			var verifier = new Verifier('');
		});

		test.doesNotThrow(function () {
			var verifier = Verifier([]); // jshint ignore : line
		});

		test.done();
	}
};
