'use strict';
/*eslint no-process-env: 0 */

module.exports = process.env.NODEVERIFIER_COV ? require('./../../lib-cov/verifier') : require('./../../lib/verifier');
