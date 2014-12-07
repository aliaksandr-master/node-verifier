"use strict";

require('colors');
var _ = require('lodash');
var async = require('async');
var validator = require('../index');
var inspect = function (value) {
	return '\n' + require('util').inspect(value, {depth: null, colors: true}) + '\n';
};

var tester = function (cases) {

	return function (test) {
		var validate = validator(null);

		async.reduce(cases, null, function (_1, testCase, done) {
			validate(testCase.rules, testCase.value, function (err, isValid, info) {
				if (err) {
					if (testCase.valueError && err instanceof validator.ValueError) {
						done();
						return;
					}

					if (testCase.paramError && err instanceof validator.ParamError) {
						done();
						return;
					}

					if (testCase.initError && err instanceof validator.InitError) {
						done();
						return;
					}

					console.log('unexpected error Error('.red, err instanceof Error, ') \n>>'.red, err, '\n', inspect(testCase).cyan);
					return done(err);
				}

				if (testCase.initError) {
					done(new Error('must be initError '.red + '(result=' + (isValid ? 'true' : 'false').cyan + ')' + inspect(testCase)));
					return;
				}

				if (testCase.valueError) {
					done(new Error('must be valueError '.red + '(result=' + (isValid ? 'true' : 'false').cyan + ')' + inspect(testCase)));
					return;
				}

				if (testCase.paramError) {
					done(new Error('must be paramError '.red + '(result=' + (isValid ? 'true' : 'false').cyan + ')' + inspect(testCase)));
					return;
				}

				test.equal(isValid, testCase.expect, testCase.message || inspect(testCase));
				done();
			});
		}, function (err) {
			test.done(err);
		});
	};
};

module.exports = tester;