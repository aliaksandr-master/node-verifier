'use strict';
/*eslint no-console: 0*/

var _ = require('lodash');
var Verifier = require('./lib');
var async = require('async');

var inspect = function (value) {
	return '\n' + require('util').inspect(value, { depth: null, colors: true }) + '\n';
};

require('colors');

var tester = function (cases) {
	return function (test) {
		var testCases = _.map(cases, function (testCase, i) {
			return {
				testCase: testCase,
				number: i
			};
		});

		async.each(testCases, function (testCaseObj, done) {
			var testCase = testCaseObj.testCase;
			var number = testCaseObj.number;
			var verifier;

			try {
				verifier = new Verifier(testCase.rules);
			} catch (e) {
				if (testCase.error) {
					if (typeof testCase.error === 'string') {
						var r = e.message.indexOf('#' + testCase.error + ': ') === 0;

						if (!r) {
							console.error('>>> #' + number + ': ', ('must be error! #' + testCase.error + ' -> given "' + e.message + '"').red);
						}

						test.ok(r);
					}
					test.ok(true);
					done();

					return;
				}

				done(e);

				return;
			}

			if (testCase.error) {
				console.log('>>> #' + number + ': ', 'must be error! ' + testCase.error);
				done('must be error!');

				return;
			}

			verifier.verify(testCase.value, function (err) {
				var isValid = !err;

				if (err) {
					if (err instanceof Verifier.Rule.ValidationError) {
						if (testCase.expect) {
							console.log('>>> #' + number + ': ', 'validation-error >> ', inspect(err));
						}

						test.ok(!testCase.expect);

						if (testCase.verr) {
							_.each(testCase.verr, function (v, k) {
								test.ok(_.isEqual(err[k], v), '>>> #' + number + ': must be equal (expect:):' + inspect(v) + '<< given: >>' + inspect(err[k]));
							});
						}

						done();
						return;
					}

					console.log('>>> #' + number + ': ', 'unexpected error Error('.red, err instanceof Error, ') \n>>'.red, err, '\n', inspect(testCase).cyan);

					done(err);

					return;
				}

				test.ok(isValid);
				done(err);
			});
		}, test.done);
	};
};

module.exports = tester;
