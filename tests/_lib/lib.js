"use strict";

module.exports = process.env.NODEVERIFIER_COV ? require('./../../lib-cov/verifier') : require('./../../lib/verifier');
