node-verifier
=============

##Usage

```js
var verifier = require('node-verifier');
var myVerifier = verifier(options); // options is optional


// init the rules for verify
var myValueVerifier = myVerifier(['type number', 'min_length 1', 'min_value 5']);
// equal
var myValueVerifier = myVerifier([{type: 'number'}, {min_length: 1}, {min_value: 5}]);
// equal
var myValueVerifier = myVerifier('type number|min_length 1|min_value 5');


// final - verify!
myValueVerifier(value, function (err, isValid, info) {
    // some code
});

```

## Rules:

### each
for array item validation

params - rules for verify

```js

var myValueVerifier = myVerifier({each: ['type number', 'min_length 1', 'min_value 5']});

myValueVerifier( [ 5, 3 ], function (err, isValid, info) {

});

```

### email
no params

check the email format by https://www.npmjs.org/package/email-validator

### empty
no params

check value on false, 0, "", null, undefined, [], {}

### eq
lodash _.isEqual

### exact_length
for string and arrays

### format
check value on RegExp match

### max_length
for string and arrays

### min_length
for string and arrays

### max_value
check number

### min_value
check number

### not
params = rule for negation

### required
check this value on undefined only

### type
check on type by Object.prototype.toString.call(value) 
