"use strict";

module.exports = require('grunto')(function(grunt) {

	return {
		jshint: {
			options: grunt.file.readJSON('.jshintrc'),
			models: [
				'**/*.{js,json}',
				'!node_modules/**/*.{js,json}'
			]
		}
	};

});