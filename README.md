node-verifier
=============

##Usage

```js
var Verifier = require('node-verifier');

// init the rules for verify
var myValueVerifier = new Verifier(['type number', 'min_length 1', 'min_value 5']);
// equal
var myValueVerifier = new Verifier(['type "number"', 'min_length "1"', 'min_value "5"']);
// equal
var myValueVerifier = new Verifier([{type: 'number'}, {min_length: 1}, {min_value: 5}]);

// final - verify!
myValueVerifier.verify(value, function (err) {

    if (err instanceof Verifier.ValidationError) {
        // invalid!!!!
        console.log(err.ruleName);
        console.log(err.ruleParams);
        console.log(err.index);
        return;
    }

    // valid!!!
});
```

## Rules:

### each
for array item validation

params - rules for verify

```js
var myValueVerifier = new Verifier({each: ['type number', 'min_length 1', 'min_value 5']});

myValueVerifier.verify( [ 5, 3 ], function (err) {
    console.log(err); // null
});

myValueVerifier.verify( [ 3, "5" ], function (err) {
    console.log(err.ruleName); // 'type'
    console.log(err.ruleParams); // 'number'
    console.log(err.index); // 1
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
