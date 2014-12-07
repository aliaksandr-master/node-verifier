"use strict";

var _ = require('lodash');
var async = require('async');
var ValidationError = require('../errors/validation');

module.exports = function validatorVerify(ruleObject, options, value, done) {
	if (ruleObject.error || !ruleObject.rules.length) {
		done(ruleObject.error, Boolean(ruleObject.error));
		return;
	}

	var interruptObject = { interrupt: true };
	async.reduce(ruleObject.rules, [], function validatorAsyncReduce (infoArray, rule, done) {
		rule.verify(value, options, function (err) {
			if (err instanceof ValidationError) {
				infoArray.push(err.rule);
				err = null;
			}

			if (options.interrupt && infoArray.length) {
				done(interruptObject, infoArray);
				return;
			}

			done(err, infoArray);
		});
	}, function (err, infoArray) {
		var valid = !infoArray.length;

		if (err === interruptObject) {
			valid = false;
			err = null;
		}

		done(err, valid, infoArray);
	});
};