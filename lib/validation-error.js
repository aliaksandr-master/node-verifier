'use strict';

var _ = require('lodash');
var extend = require('./utils/extend');


/**
 * Validation Error
 *
 * @static
 * @class ValidationError
 * @constructor
 * @param {!String} ruleName - name of rule, that was not passed
 * @param {*} ruleParams - params of rule that was not passed
 * @param {?Number} [index] - index of item in array (if current object is array)
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
		return Error('#E1: invalid ruleName, must be non-empty string');
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
