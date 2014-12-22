"use strict";

var _ = require('lodash');
var extend = require('./utils/extend');


/**
 * Validation Error
 *
 * @static
 * @class
 * @constructor
 * @param {!String} ruleName
 * @param {*} ruleParams
 * @param {?Number} [index]
 * @property {String} name="ValidationError"
 * @property {*} params
 * @property {?Number} index
 *
 * @returns {ValidationError}
 * */
var ValidationError = function ValidationError (ruleName, ruleParams, index) {
	if (!(this instanceof ValidationError)) {
		return new ValidationError(ruleName, ruleParams, index);
	}

	if (!ruleName || typeof ruleName !== 'string') {
		throw new TypeError('invalid ruleName, must be non-empty string');
	}

	Error.call(this);
	this.name = 'ValidationError';
	this.rule = ruleName;
	this.params = _.cloneDeep(ruleParams);
	this.index = typeof index === 'number' && !_.isNaN(index) ? index : null;

	return this;
};

extend(ValidationError, Error);

module.exports = ValidationError;
