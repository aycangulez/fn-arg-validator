fn-arg-validator is a lightweight JavaScript library for validating function arguments.

## Installation

```bash
npm install --save fn-arg-validator
```

## Usage

First, a quick example:

```js
const is = require('fn-arg-validator');

function createUser(firstName, lastName, birthDate) {
	is.valid(is.string, is.string, is.date, arguments);
	// ...
}

createUser('Thomas', 'Anderson', '1971-09-13');
// [WARN] 1971-09-13 failed date check 
}
```

**is.valid()** uses a functional style interface where you pass type check functions (built-in or your own) for each function argument, and as the final argument, you simply pass the *arguments* object to avoid writing the function parameters again. 

The *arguments* object isn't available for arrow functions, so you need to type the parameter names in an array like *[firstName, lastName, birthDate]* for those.

The above code will normally log a warning and continue to run, but you may choose to check the return value of **is.valid** to stop the execution of the rest of the code. The decision depends on how you want to handle type errors. Sometimes, a warning is enough, and sometimes you need to be strict and throw an error.

In addition to strict type checks, it's possible to do things like string length checks, and use maybe types that also accept undefined/null values:

```js
function createUser(firstName, lastName, birthDate) {
	is.valid(is.stringBetween(1, 20), is.stringShorterThan(20), is.maybeDate, arguments);
	// ...
}
```

fn-arg-validator can also be used to check if an object has the specified properties and those properties have the correct types.

```js
const userObjectProps = { firstName: is.string, lastName: is.string, birthDate: is.date };

function updateUserData(user) {
    if (!is.valid(is.objectWithProperties(userObjectProps), arguments)) {
        throw new Error('Invalid user object');
    }
    // ...
}

updateUserData({ firstName: 'Thomas', lastName: 'Anderson', birthDate: '1971-09-13' });
/* Should fail with:
{"firstName":"Thomas","lastName":"Anderson","birthDate":"1971-09-13"} failed objectWithProperties check

Error: Invalid user object
...
*/
```

Please note that while nested objects aren't supported, you can still individually check each nested object.


## Built-in Type Check Functions

### Strict Type Checks

* **is.array:** Returns true if the argument is an array.
* **is.boolean:** Returns true if the argument is a boolean.
* **is.date:** Returns true if the argument is a Date object.
* **is.func:** Returns true if the argument is a function.
* **is.number:** Returns true if the argument is a number.
* **is.string:** Returns true if the argument is a string.

### Maybes
* **is.maybeArray:** Returns true if the argument is an array or undefined/null.
* **is.maybeBoolean:** Returns true if the argument is a boolean or undefined/null.
* **is.maybeDate:** Returns true if the argument is a Date object or undefined/null.
* **is.maybeFunc:** Returns true if the argument is a function or undefined/null.
* **is.maybeNumber:** Returns true if the argument is a number and or undefined/null.
* **is.maybeString:** Returns true if the argument is string or undefined/null.

### Boundary Checks
* **is.numberGreaterThan(n):** Returns true if the argument is a number and greater than *n*.
* **is.numberLessThan(n):** Returns true if the argument is a number and less than *n*.
* **is.numberBetween(n1, n2):** Returns true if the argument is a number and between *n1* and *n2* (inclusive).
* **is.stringLongerThan(n):** Returns true if the argument is a string and its length is longer than *n*.
* **is.stringShorterThan(n):** Returns true if the argument is a string and its length is shorter than *n*.
* **is.stringBetween(n1, n2):** Returns true if the argument is a string and its length is between *n1* and *n2* (inclusive).

### Object Property and Type Checks
* **objectWithProperties(props):** Returns true if the argument is an object and the property-type pairs match the argument's properties and their types.

### Catch-all
* **is.any:** Returns true for everything. Great for skipping validation for certain arguments.

## Passing your Own Type Check Functions
It's important for your functions to have a name since **is.valid** uses the function names for logging purposes.

## Log Configuration
By default, fn-arg-validator uses the *console* object for logging. However, this can be configured by assigning a different logger to **is.log**.

The log level can be set by changing the value of **is.logLevel**. The default log level is *'WARN'*, which only logs failed checks. If you would like to see successful validations, you need to set the log level to *'DEBUG'* or higher. To disable all logging, set the log level to *'OFF'*.
