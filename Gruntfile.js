"use strict";

module.exports = require('grunto')(function(grunt) {
	return {
		jshint: {
			options: grunt.file.readJSON('.jshintrc'),
			all: [
				'index.js',
				'lib/**/*.{js,json}',
				'Gruntfile.js',
				'tests/**/*.{js,json}'
			]
		}
	};
});