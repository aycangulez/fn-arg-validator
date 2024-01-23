fn-arg-validator is a lightweight JavaScript library for validating function arguments.

## Installation

### Node.js

```bash
npm install --save fn-arg-validator
```

### Browsers

Install as above and use the `fn-arg-validator.js` file found in the node_modules directory. You will also need to include lodash if you aren't already using it in your application.

```html
<script src="./node_modules/fn-arg-validator/fn-arg-validator.js"></script>
<script src="./node_modules/lodash/lodash.js"></script>
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

### Boundary Checks and Maybe Types
In addition to strict type checks, it's possible to do things like string length checks, and use maybe types that also accept undefined/null values:

```js
function createUser(firstName, lastName, birthDate) {
    is.valid(is.stringBetween(1, 20), is.stringShorterThan(20), is.maybeDate, arguments);
    // ...
}
```

### Object Property and Type Checks

**is.objectWithProps** can be used to check if an object has the specified properties and those properties have the correct types.

```js
const userObjectProps = { id: is.number, firstName: is.string, lastName: is.string, birthDate: is.date };

function updateUser(user) {
    if (!is.valid(is.objectWithProps(userObjectProps), arguments)) {
        throw new Error('Invalid user object');
    }
    // ...
}

updateUser({ id: 1, firstName: 'Thomas', lastName: 'Anderson', birthDate: '1971-09-13' });
/*
[WARN] {"id":1,"firstName":"Thomas","lastName":"Anderson","birthDate":"1971-09-13"} failed objectWithProperties check

Error: Invalid user object
...
*/
```

**Note:** Validation of nested objects isn't supported, but you can still check each nested object individually.


## Built-in Type Check Functions

### Strict Type Checks

* **is.array:** Returns true if the argument is an array.
* **is.boolean:** Returns true if the argument is a boolean.
* **is.buffer:** Returns true if the argument is a buffer.
* **is.date:** Returns true if the argument is a Date object.
* **is.func:** Returns true if the argument is a function.
* **is.number:** Returns true if the argument is a number.
* **is.object:** Returns true if the argument is an object.
* **is.string:** Returns true if the argument is a string.

### Maybes
* **is.maybeArray:** Returns true if the argument is an array or undefined/null.
* **is.maybeBoolean:** Returns true if the argument is a boolean or undefined/null.
* **is.maybeBuffer:** Returns true if the argument is a buffer or undefined/null.
* **is.maybeDate:** Returns true if the argument is a Date object or undefined/null.
* **is.maybeFunc:** Returns true if the argument is a function or undefined/null.
* **is.maybeNumber:** Returns true if the argument is a number or undefined/null.
* **is.maybeObject:** Returns true if the argument is an object or undefined/null.
* **is.maybeString:** Returns true if the argument is string or undefined/null.

### Boundary Checks
* **is.numberGreaterThan(n):** Returns true if the argument is a number and greater than *n*.
* **is.numberLessThan(n):** Returns true if the argument is a number and less than *n*.
* **is.numberBetween(n1, n2):** Returns true if the argument is a number and between *n1* and *n2* (inclusive).
* **is.stringLongerThan(n):** Returns true if the argument is a string and its length is longer than *n*.
* **is.stringShorterThan(n):** Returns true if the argument is a string and its length is shorter than *n*.
* **is.stringBetween(n1, n2):** Returns true if the argument is a string and its length is between *n1* and *n2* (inclusive).

### Mixed Types
* **is.oneOf** returns true if an argument's type is one of the passed types. For example, **is.oneOf(is.number, is.array)** returns true for *1* and *[1]*, but not *'1'*.

### Object Property and Type Checks
* **objectWithProperties(props):** Returns true if the argument is an object and the property-type pairs match the argument's properties and their types.

### Catch-all
* **is.any:** Returns true for everything. Great for skipping validation for certain arguments.

## Passing your Own Type Check Functions
The beauty of a functional style interface is that you aren’t limited to the built-in validation functions, you can simply pass your own. The only requirement is to give your functions names since is.valid uses function names for logging purposes.

## Log Configuration
By default, fn-arg-validator uses the *console* object for logging. However, this can be configured by assigning a different logger to **is.config.log**.

The log level can be set by changing the value of **is.config.logLevel**. The default log level is *'WARN'*, which only logs failed checks. If you would like to see successful validations, you need to set the log level to *'DEBUG'* or higher. To disable all logging, set the log level to *'OFF'*.
