"use strict";

var tester = require('../lib/tester');

exports.flow = {
	standard_call: tester([
		{ rules: 'type string',                       value: 4,      expect: false },
		{ rules: 'type string',                       value: "",     expect: true },
		{ rules: ['type string'],                     value: 4,      expect: false },
		{ rules: ['type string'],                     value: "",     expect: true },
		{ rules: {type: 'string'},                    value: 4,      expect: false },
		{ rules: {type: 'string'},                    value: "",     expect: true },
		{ rules: [{type: 'string'}],                  value: 4,      expect: false },
		{ rules: [{type: 'string'}],                  value: "",     expect: true },
		{ rules: 'type string | max_length 2',        value: 4,      expect: false },
		{ rules: 'type string | max_length 2',        value: "1",    expect: true },
		{ rules: 'type string|max_length 2',          value: 4,      expect: false },
		{ rules: 'type string|max_length 2',          value: "1",    expect: true },
		{ rules: ['type string', 'max_length 2'],     value: 4,      expect: false },
		{ rules: ['type string', 'max_length 2'],     value: "1",    expect: true },
		{ rules: [{type: 'string'}, {max_length: 2}], value: 4,      expect: false },
		{ rules: [{type: 'string'}, {max_length: 2}], value: "1",    expect: true },
	])
};
