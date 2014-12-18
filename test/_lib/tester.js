"use strict";

require('colors');
var _ = require('lodash');
var Verifier = require('../../index');
var iterate = require('../../lib/iterate');

var inspect = function (value) {
	return '\n' + require('util').inspect(value, {depth: null, colors: true}) + '\n';
};

var tester = function (cases) {
	return function (test) {
		iterate.array(cases, function (testCase, index, done) {
			var verifier;
			try {
				verifier = new Verifier(testCase.rules);
			} catch (e) {
				if (testCase.error) {
					test.ok(true);
					done();
					return;
				}

				done(e);
				return;
			}

			verifier.verify(testCase.value, function (err) {
				var isValid = !err;
				if (err) {
					if (testCase.expect != null && !testCase.expect && err instanceof Verifier.Rule.ValidationError) {
						test.ok(true);
						done();
						return;
					}

					console.log('#' + index + ' unexpected error Error('.red, err instanceof Error, ') \n>>'.red, err, '\n', inspect(testCase).cyan);
					return done(err);
				}

				test.equal(isValid, testCase.expect, testCase.message || inspect(testCase));
				done();
			});
		}, test.done);
	};
};

module.exports = tester;