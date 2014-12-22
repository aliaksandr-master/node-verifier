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

		test.throws(function () {
			var CustomRule = new Verifier.Rule.extend();
		});

		test.throws(function () {
			var CustomRule = new Verifier.Rule.extend( { name: 'some' } );
		});

		var error = new Error('hello');
		var CustomRule = Verifier.Rule.extend({
			check: function (value, params, done) {
				return error;
			}
		});

		Verifier.Rule.add("some", CustomRule);

		test.throws(function () {
			Verifier.Rule.add();
		});

		test.throws(function () {
			Verifier.Rule.add(123);
		});

		test.doesNotThrow(function () {
			Verifier.Rule.add("some", CustomRule, false);
		});

		test.throws(function () {
			Verifier.Rule.add("some");
		});

		test.throws(function () {
			Verifier.Rule.add("some1", 123);
		});

		test.throws(function () {
			Verifier.Rule.add("some1", function () {});
		});

		test.throws(function () {
			var f = function () {};
			f.prototype = { check: function () {} };
			Verifier.Rule.add("some1", function () {});
		});

		test.throws(function () {
			Verifier.Rule.get('some2');
		});

		test.doesNotThrow(function () {
			Verifier.Rule.get('some2', false);
		});

		var rule = new CustomRule();

		var MyCustomRule = CustomRule.extend({
			check: function () {
				throw error;
			}
		});

		var myRule = new MyCustomRule();

		rule.verify(123, function (err) {
			test.ok(err === error);

			myRule.verify(234, function (err) {
				test.ok(err === error);
				test.done();
			});
		});
	}
};
