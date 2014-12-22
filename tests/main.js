"use strict";

var tester = require('./_lib/tester');

exports.flow = {
	standard_call: tester([
		{ rules: 'type string',                       value: 4,      verr: { rule: 'type', params: 'string', index: null } },
		{ rules: 'type string',                       value: "",     expect: true },
		{ rules: ['type string'],                     value: 4,      verr: { rule: 'type', params: 'string', index: null } },
		{ rules: ['type string'],                     value: "",     expect: true },
		{ rules: {type: 'string'},                    value: 4,      verr: { rule: 'type', params: 'string', index: null } },
		{ rules: {type: 'string'},                    value: "",     expect: true },
		{ rules: [{type: 'string'}],                  value: 4,      verr: { rule: 'type', params: 'string', index: null } },
		{ rules: [{type: 'string'}],                  value: "",     expect: true },
		{ rules: ['type string', 'max_length 2'],     value: 4,      verr: { rule: 'type', params: 'string', index: null } },
		{ rules: ['type string', 'max_length 2'],     value: "1",    expect: true },
		{ rules: [{type: 'string'}, {max_length: 2}], value: 4,      verr: { rule: 'type', params: 'string', index: null } },
		{ rules: [{type: 'string'}, {max_length: 2}], value: "1",    expect: true }
	])
};
