"use strict";

module.exports = function (jsonSource) {
	var json = null;
	try {
		json = JSON.parse(jsonSource);
	} catch (err) {
		if (/^[\[\{]/.test(jsonSource) && /[\[\{]$/.test(jsonSource)) {
			return err;
		} else {
			json = jsonSource;
		}
	}

	return json;
};