"use strict";

var _ = require('lodash');
var iterate = require('../lib/utils/iterate');

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

module.exports = {
	'iterate array - nothing to iterate': function (test) {
		var len = 0;
		var arr = [];
		var count = 0;
		iterate.array(arr, function (value, index, done) {
			count++;
			done();
		}, function (err) {
			test.strictEqual(count, len);
			test.done(err);
		});
	},

	'iterate array - across all items of array': function (test) {
		var len = arr.length;
		var keys = _.keys(arr);
		var count = 0;
		var _keys = [];
		iterate.array(arr, function (value, index, done) {
			count++;
			_keys.push(index);
			done();
		}, function (err) {
			test.strictEqual(count, len);
			test.deepEqual(keys, _keys);
			test.done(err);
		});
	},

	'iterate array - interrupt by error': function (test) {
		var len = arr.length;
		var count = 0;
		iterate.array(arr, function (value, index, done) {
			count++;
			done(count >= len/2 ? true : null);
		}, function (err) {
			test.strictEqual(count, len/2);
			test.ok(typeof err === 'boolean');
			test.done(err instanceof Error ? err : null);
		});
	}
};
