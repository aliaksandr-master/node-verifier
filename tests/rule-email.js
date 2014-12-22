"use strict";

var tester = require('./_lib/tester');

exports.examples = tester([
	{ rules: 'email', value: 1123, expect: false },
	{ rules: 'email', value: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@letters-in-local.org", expect: true },
	{ rules: 'email', value: "01234567890@numbers-in-local.net", expect: true },
	{ rules: 'email', value: "&'*+-./=?^_{}~@other-valid-characters-in-local.net", expect: true },
	{ rules: 'email', value: "mixed-1234-in-{+^}-local@sld.net", expect: true },
	{ rules: 'email', value: "a@single-character-in-local.org", expect: true },
	{ rules: 'email', value: "one-character-third-level@a.example.com", expect: true },
	{ rules: 'email', value: "single-character-in-sld@x.org", expect: true },
	{ rules: 'email', value: "local@dash-in-sld.com", expect: true },
	{ rules: 'email', value: "letters-in-sld@123.com", expect: true },
	{ rules: 'email', value: "one-letter-sld@x.org", expect: true },
	{ rules: 'email', value: "uncommon-tld@sld.museum", expect: true },
	{ rules: 'email', value: "uncommon-tld@sld.travel", expect: true },
	{ rules: 'email', value: "uncommon-tld@sld.mobi", expect: true },
	{ rules: 'email', value: "country-code-tld@sld.uk", expect: true },
	{ rules: 'email', value: "country-code-tld@sld.rw", expect: true },
	{ rules: 'email', value: "local@sld.newTLD", expect: true },
	{ rules: 'email', value: "the-total-length@of-an-entire-address.cannot-be-longer-than-two-hundred-and-fifty-four-characters.and-this-address-is-254-characters-exactly.so-it-should-be-valid.and-im-going-to-add-some-more-words-here.to-increase-the-lenght-blah-blah-blah-blah-bla.org", expect: true },
	{ rules: 'email', value: "the-character-limit@for-each-part.of-the-domain.is-sixty-three-characters.this-is-exactly-sixty-three-characters-so-it-is-valid-blah-blah.com", expect: true },
	{ rules: 'email', value: "local@sub.domains.com", expect: true },
	{ rules: 'email', value: "backticks`are`legit@tests.com", expect: true }
]);