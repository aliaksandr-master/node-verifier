[![npm](http://img.shields.io/npm/v/node-verifier.svg?style=flat-square)](https://www.npmjs.com/package/node-verifier)
[![npm](http://img.shields.io/npm/l/node-verifier.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/aliaksandr-pasynkau/node-verifier.svg?style=flat-square)](https://david-dm.org/aliaksandr-pasynkau/node-verifier)
[![devDependency Status](https://david-dm.org/aliaksandr-pasynkau/node-verifier/dev-status.svg?style=flat-square)](https://david-dm.org/aliaksandr-pasynkau/node-verifier#info=devDependencies)
[![Build Status](https://travis-ci.org/aliaksandr-pasynkau/node-verifier.svg?branch=master&style=flat-square)](https://travis-ci.org/aliaksandr-pasynkau/node-verifier)
[![Coverage Status](https://img.shields.io/coveralls/aliaksandr-pasynkau/node-verifier.svg?style=flat-square)](https://coveralls.io/r/aliaksandr-pasynkau/node-verifier?branch=master)

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
        console.log(err.rule);
        console.log(err.params);
        console.log(err.index);
        return;
    }

    // valid!!!
});
```

## Predefined Rules:

You can verify any rule without verifier object
```js
var Verifier = require('node-verifier');
var RuleType = Verifier.Rule.get('type');

var var rule = new RuleType('object');

rule.verify(value, function (err) {
    if (err instanceof Verifier.Rule.ValidationError) {
        // if invalid

        return;
    }

    // if valid
});
```
You can create your own rules. <br>
There is one required method `check (value, params, done)`. It give 3 arguments: <br>
`value` - value that need check. <br>
`params` - params that you set in constructor. <br>
`done` - callback. First argument is validation error (`Verifier.Rule.ValidationError`). Second argument is result for error. if you set true then generate ValidationError automatically.<br>

There is one optional function `prepareParams(params)` for obtain the fail-fast paradigm. (it call in constructor). if you throw the error - error will arrive in main loop
```js
var Verifier = require('node-verifier');

var UserExistsRule = Verifier.Rule.extend({
    check: function (value, params, done) {
        if (!_.isPlainObject(value) || !_.has(value, 'email') || !_.has(value, 'password')) {
            done(new Error('rule params must be object {email: NAME_STRING, password: PASSWORD_STRING}'), false);
            return;
        }

        knex('user').where('email', params.email).exec(function (err, userArray) {
            if (!err && userArray && userArray.length === 1 && userArray[0].password === sha1(params.password)) {
                done(null, true);
                return;
            }

            done(err, false);
        });
    }
});

Verifier.Rule.add('userExists');

var myValidator = new Verifier(['type object', 'userExists']);

myValidator.verify({ email: 'some@gmail.com', password: 123123123 }, function (err) {
    if (err instanceof Verifier.ValidationError) {
        // invalid
        return;
    }

    // valid
});
```

You can extend any exists rules
```js
var Verifier = require('node-verifier');
var RuleType = Verifier.Rule.get('type');

var MyRuleType = RuleType.extend({
    prepareParams: function (params) {
        return Object.prototype.toString.call(params);
    }
});

// register new rule
Verifier.Rule.add('my-type', MyRuleType);
```

### each
For array item validation. <br>
**params** - rules for verify. <br>

```js
var myValueVerifier = new Verifier({each: ['type number', 'min_length 1', 'min_value 5']});

myValueVerifier.verify( [ 5, 3 ], function (err) {
    console.log(err); // null
});

myValueVerifier.verify( [ 3, "5" ], function (err) {
    console.log(err.rule); // 'type'
    console.log(err.params); // 'number'
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
result of _.isEqual (lodash)
```js
var myVerifier = new Verifier('eq 5');
// equal
var myVerifier = new Verifier({ eq: 5 });

myVerifier.verify(3, callback);  // invalid
myVerifier.verify("5", callback);  // invalid
myVerifier.verify(5, callback); // valid
```

### exact_length
for string and arrays<br>
param - number
```js
var myVerifier = new Verifier('exact_length 5');
// equal
var myVerifier = new Verifier({ exact_length: 5 });

myVerifier.verify("asdasdasd", callback);  // invalid
myVerifier.verify("asdas", callback); // valid
```

### format
check value on RegExp match<br>
param - regExp (string)
```js
var myVerifier = new Verifier('format ^[a-zA-Z][a-zA-Z0-9_.-]*@[a-zA-Z0-9]+\\.[a-zA-Z0-9]+$');
// equal
var myVerifier = new Verifier({format: /^[a-zA-Z][a-zA-Z0-9_.-]*@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/);

myVerifier.verify("asdasdasd@asd.com", callback);  // valid
myVerifier.verify("asdasdasd@asd", callback); // invalid
```

### max_length
for string and arrays
```js
var myVerifier = new Verifier('max_length 3');
myVerifier.verify(null, callback); // invalid
myVerifier.verify([1], callback);  // valid
myVerifier.verify([1, 2, 3], callback); // valid
myVerifier.verify("123", callback); // valid
myVerifier.verify(123, callback); // valid (convert to String)
myVerifier.verify(NaN, callback); // invalid
```

### min_length
for string and arrays
```js
var myVerifier = new Verifier('min_length 3');
myVerifier.verify(null, callback); // invalid
myVerifier.verify([1], callback);  // invalid
myVerifier.verify([1, 2, 3], callback); // valid
myVerifier.verify("123", callback); // valid
myVerifier.verify(123, callback); // valid (convert to String)
myVerifier.verify(NaN, callback); // invalid
```

### max_value
check number
```js
var myVerifier = new Verifier('max_value 3');
myVerifier.verify(4, callback); // valid
myVerifier.verify("4", callback); // valid (convert to float)
```

### min_value
check number. <br>
param - number
```js
var myVerifier = new Verifier('min_value 3');
myVerifier.verify(value, callback);
```

### not
params - rule(s) for negation
```js
var myVerifier = new Verifier({ not: ['required', 'type number', 'eq 3'] });
myVerifier.verify(value, callback);
```

### required
check this value on undefined only. <br>
params not need.
```js
var myVerifier = new Verifier({ required: true});
// equal
var myVerifier = new Verifier('required');

myVerifier.verify(value, callback);
```

### type
check on type by Object.prototype.toString.call(value). <br>
param - type name without '[Object' and ']' in lower case
```js
var myVerifier = new Verifier({ type: 'object'});
// equal
var myVerifier = new Verifier('type object');

myVerifier.verify(value, callback);
```

### any
True if any verification branch is valid.
```js
var myVerifier = new Verifier({
    any: [
        ['type string', {contains: ["hello", "world"]}], // branch 1
        'type number',                                   // branch 2
    ]
});
// Equal
var myVerifier = new Verifier({
    any: {
        branch1: ['type string', {contains: ["hello", "world"]}],
        branch2: 'type number'                           // branch 2
    }
});

myVerifier.verify(value, callback);
```

### contains
True if any item of haystack array is equal with value
```js
var myVerifier = new Verifier({contains: [1, 2, 3, 4]});
myVerifier.verify(value, callback);
```