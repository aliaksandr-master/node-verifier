[![npm](http://img.shields.io/npm/v/node-verifier.svg?style=flat-square)](https://www.npmjs.com/package/node-verifier)
[![npm](http://img.shields.io/npm/l/node-verifier.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/aliaksandr-pasynkau/node-verifier.svg?style=flat-square)](https://david-dm.org/aliaksandr-pasynkau/node-verifier)
[![devDependency Status](https://david-dm.org/aliaksandr-pasynkau/node-verifier/dev-status.svg?style=flat-square)](https://david-dm.org/aliaksandr-pasynkau/node-verifier#info=devDependencies)


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

### any
True if any verification branch is valid.

### contains
True if any item of haystack array is equal with value
