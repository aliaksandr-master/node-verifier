"use strict";

module.exports = require('grunto')(function(grunt) {

	grunt.registerTask('test', [
		'jshint'
	]);

	return {
		jshint: {
			options: {
				jshintrc: true
			},
			all: [
				'**/*.js',
				'!node_modules/**/*',
				'!lib-cov/**/*'
			]
		}
	};
});
