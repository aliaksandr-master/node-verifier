"use strict";

module.exports = process.env.NODEVERIFIER_COV ? require('./../../lib-cov/utils/extend') : require('./../../lib/utils/extend');
