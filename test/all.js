var is = require('../fn-arg-validator');
var chai = require('chai');
var should = chai.should();

describe('is.any', function () {
    it('should return true for everything', function () {
        is.any().should.equal(true);
        is.any(1).should.equal(true);
        is.any('1').should.equal(true);
        is.any(null).should.equal(true);
    });
});

describe('is.array', function () {
    it('should return true for arrays', function () {
        is.array([]).should.equal(true);
        is.array([1, 2]).should.equal(true);
        is.array().should.equal(false);
    });
});

describe('is.maybeArray', function () {
    it('should return true for arrays and nil values', function () {
        is.maybeArray([]).should.equal(true);
        is.maybeArray([1, 2]).should.equal(true);
        is.maybeArray().should.equal(true);
        is.maybeArray(null).should.equal(true);
    });
});

describe('is.boolean', function () {
    it('should return true for boolean values', function () {
        is.boolean(true).should.equal(true);
        is.boolean(false).should.equal(true);
        is.boolean(0).should.equal(false);
        is.boolean(1).should.equal(false);
    });
});

describe('is.maybeBoolean', function () {
    it('should return true for boolean and nil values', function () {
        is.maybeBoolean(true).should.equal(true);
        is.maybeBoolean(false).should.equal(true);
        is.maybeBoolean(0).should.equal(false);
        is.maybeBoolean(1).should.equal(false);
        is.maybeBoolean().should.equal(true);
        is.maybeBoolean(null).should.equal(true);
    });
});

describe('is.date', function () {
    it('should return true for date objects', function () {
        is.date(new Date()).should.equal(true);
        is.date('2023-01-01').should.equal(false);
    });
});

describe('is.maybeDate', function () {
    it('should return true for date objects and nil values', function () {
        is.maybeDate(new Date()).should.equal(true);
        is.maybeDate('2023-01-01').should.equal(false);
        is.maybeDate().should.equal(true);
        is.maybeDate(null).should.equal(true);
    });
});

describe('is.func', function () {
    it('should return true for functions', function () {
        is.func(() => {}).should.equal(true);
        is.func('').should.equal(false);
    });
});

describe('is.maybeFunc', function () {
    it('should return true for functions and nil values', function () {
        is.maybeFunc(() => {}).should.equal(true);
        is.maybeFunc('').should.equal(false);
        is.maybeFunc().should.equal(true);
        is.maybeFunc(null).should.equal(true);
    });
});

describe('is.number', function () {
    it('should return true for numbers', function () {
        is.number(1).should.equal(true);
        is.number('1').should.equal(false);
    });
});

describe('is.maybeNumber', function () {
    it('should return true for numbers and nil values', function () {
        is.maybeNumber(1).should.equal(true);
        is.maybeNumber('1').should.equal(false);
        is.maybeNumber().should.equal(true);
        is.maybeNumber(null).should.equal(true);
    });
});

describe('is.numberGreaterThan', function () {
    it('should return true for numbers greater than n', function () {
        is.numberGreaterThan(1)(2).should.equal(true);
        is.numberGreaterThan(1)(1).should.equal(false);
    });
});

describe('is.numberLessThan', function () {
    it('should return true for numbers less than n', function () {
        is.numberLessThan(2)(1).should.equal(true);
        is.numberLessThan(1)(1).should.equal(false);
    });
});

describe('is.numberBetween', function () {
    it('should return true for numbers between n1 and n2', function () {
        is.numberBetween(1, 3)(1).should.equal(true);
        is.numberBetween(1, 2)(3).should.equal(false);
    });
});

describe('is.objectWithProperties', function () {
    it('should return true for objects with given properties', function () {
        let userObject = { firstName: 'Thomas', lastName: 'Anderson', birthDate: new Date() };
        is.objectWithProperties({ firstName: is.string, lastName: is.string, birthDate: is.date })(
            userObject
        ).should.equal(true);
    });
});

describe('is.string', function () {
    it('should return true for string values', function () {
        is.string('').should.equal(true);
        is.string('test').should.equal(true);
        is.string(1).should.equal(false);
    });
});

describe('is.maybeString', function () {
    it('should return true for string values and nil values', function () {
        is.maybeString('').should.equal(true);
        is.maybeString('test').should.equal(true);
        is.maybeString(1).should.equal(false);
        is.maybeString().should.equal(true);
        is.maybeString(null).should.equal(true);
    });
});

describe('is.stringLongerThan', function () {
    it('should return true for string lengths longer than n', function () {
        is.stringLongerThan(2)('123').should.equal(true);
        is.stringLongerThan(3)('123').should.equal(false);
    });
});

describe('is.stringShorterThan', function () {
    it('should return true for string lengths shorter than n', function () {
        is.stringShorterThan(4)('123').should.equal(true);
        is.stringShorterThan(3)('123').should.equal(false);
    });
});

describe('is.stringBetween', function () {
    it('should return true for string lengths between n1 and n2', function () {
        is.stringBetween(1, 3)('123').should.equal(true);
        is.stringBetween(5, 10)('123').should.equal(false);
    });
});
