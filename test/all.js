var is = require('../fn-arg-validator');
var chai = require('chai');
var should = chai.should();

describe('is.any', function () {
    it('should return true for everything', function () {
        is.any.name.should.equal('any');
        is.any().should.equal(true);
        is.any(1).should.equal(true);
        is.any('1').should.equal(true);
        is.any(null).should.equal(true);
    });
});

describe('is.array', function () {
    it('should return true for arrays', function () {
        is.array.name.should.equal('array');
        is.array([]).should.equal(true);
        is.array([1, 2]).should.equal(true);
        is.array().should.equal(false);
    });
});

describe('is.maybeArray', function () {
    it('should return true for arrays and nil values', function () {
        is.maybeArray.name.should.equal('maybeArray');
        is.maybeArray([]).should.equal(true);
        is.maybeArray([1, 2]).should.equal(true);
        is.maybeArray().should.equal(true);
        is.maybeArray(null).should.equal(true);
    });
});

describe('is.boolean', function () {
    it('should return true for boolean values', function () {
        is.boolean.name.should.equal('boolean');
        is.boolean(true).should.equal(true);
        is.boolean(false).should.equal(true);
        is.boolean(0).should.equal(false);
        is.boolean(1).should.equal(false);
    });
});

describe('is.maybeBoolean', function () {
    it('should return true for boolean and nil values', function () {
        is.maybeBoolean.name.should.equal('maybeBoolean');
        is.maybeBoolean(true).should.equal(true);
        is.maybeBoolean(false).should.equal(true);
        is.maybeBoolean(0).should.equal(false);
        is.maybeBoolean(1).should.equal(false);
        is.maybeBoolean().should.equal(true);
        is.maybeBoolean(null).should.equal(true);
    });
});

describe('is.buffer', function () {
    it('should return true for buffers', function () {
        is.buffer.name.should.equal('buffer');
        is.buffer(Buffer.alloc(2)).should.equal(true);
        is.buffer('2').should.equal(false);
    });
});

describe('is.maybeBuffer', function () {
    it('should return true for buffers and nil values', function () {
        is.maybeBuffer.name.should.equal('maybeBuffer');
        is.maybeBuffer(Buffer.alloc(2)).should.equal(true);
        is.maybeBuffer('2').should.equal(false);
        is.maybeBuffer().should.equal(true);
        is.maybeBuffer(null).should.equal(true);
    });
});

describe('is.date', function () {
    it('should return true for date objects', function () {
        is.date.name.should.equal('date');
        is.date(new Date()).should.equal(true);
        is.date('2023-01-01').should.equal(false);
    });
});

describe('is.maybeDate', function () {
    it('should return true for date objects and nil values', function () {
        is.maybeDate.name.should.equal('maybeDate');
        is.maybeDate(new Date()).should.equal(true);
        is.maybeDate('2023-01-01').should.equal(false);
        is.maybeDate().should.equal(true);
        is.maybeDate(null).should.equal(true);
    });
});

describe('is.func', function () {
    it('should return true for functions', function () {
        is.func.name.should.equal('func');
        is.func(() => {}).should.equal(true);
        is.func('').should.equal(false);
    });
});

describe('is.maybeFunc', function () {
    it('should return true for functions and nil values', function () {
        is.maybeFunc.name.should.equal('maybeFunc');
        is.maybeFunc(() => {}).should.equal(true);
        is.maybeFunc('').should.equal(false);
        is.maybeFunc().should.equal(true);
        is.maybeFunc(null).should.equal(true);
    });
});

describe('is.number', function () {
    it('should return true for numbers', function () {
        is.number.name.should.equal('number');
        is.number(1).should.equal(true);
        is.number('1').should.equal(false);
    });
});

describe('is.maybeNumber', function () {
    it('should return true for numbers and nil values', function () {
        is.maybeNumber.name.should.equal('maybeNumber');
        is.maybeNumber(1).should.equal(true);
        is.maybeNumber('1').should.equal(false);
        is.maybeNumber().should.equal(true);
        is.maybeNumber(null).should.equal(true);
    });
});

describe('is.numberGT', function () {
    it('should return true for numbers greater than n', function () {
        is.numberGT(1).name.should.equal('numberGT');
        is.numberGT(1)(2).should.equal(true);
        is.numberGT(1)(1).should.equal(false);
    });
});

describe('is.numberGTE', function () {
    it('should return true for numbers greater than or equal to n', function () {
        is.numberGTE(1).name.should.equal('numberGTE');
        is.numberGTE(1)(2).should.equal(true);
        is.numberGTE(1)(1).should.equal(true);
        is.numberGTE(1)(0).should.equal(false);
    });
});

describe('is.numberLT', function () {
    it('should return true for numbers less than n', function () {
        is.numberLT(2).name.should.equal('numberLT');
        is.numberLT(2)(1).should.equal(true);
        is.numberLT(1)(1).should.equal(false);
    });
});

describe('is.numberLTE', function () {
    it('should return true for numbers less than or equal to n', function () {
        is.numberLTE(2).name.should.equal('numberLTE');
        is.numberLTE(2)(1).should.equal(true);
        is.numberLTE(1)(1).should.equal(true);
        is.numberLTE(1)(2).should.equal(false);
    });
});

describe('is.numberBetween', function () {
    it('should return true for numbers between n1 and n2', function () {
        is.numberBetween(1, 3).name.should.equal('numberBetween');
        is.numberBetween(1, 3)(1).should.equal(true);
        is.numberBetween(1, 2)(3).should.equal(false);
    });
});

describe('is.object', function () {
    it('should return true for objects', function () {
        is.object.name.should.equal('object');
        is.object({}).should.equal(true);
        is.object(1).should.equal(false);
    });
});

describe('is.maybeObject', function () {
    it('should return true for objects and nil values', function () {
        is.maybeObject.name.should.equal('maybeObject');
        is.maybeObject({}).should.equal(true);
        is.maybeObject(1).should.equal(false);
        is.maybeObject().should.equal(true);
        is.maybeObject(null).should.equal(true);
    });
});

describe('is.objectWithProps', function () {
    it('should return true for objects with given properties', function () {
        is.objectWithProps({}).name.should.equal('objectWithProps');
        let userObject = { firstName: 'Thomas', lastName: 'Anderson', birthDate: new Date() };
        is.objectWithProps({ firstName: is.string, lastName: is.string, birthDate: is.date })(userObject).should.equal(
            true
        );
    });
});

describe('is.oneOf', function () {
    it('should return true if a value belongs to one of given types', function () {
        is.oneOf.name.should.equal('oneOf');
        is.oneOf(is.number, is.array)(1).should.equal(true);
        is.oneOf(is.number, is.array)([1]).should.equal(true);
        is.oneOf(is.number, is.array)('1').should.equal(false);
    });
});

describe('is.string', function () {
    it('should return true for string values', function () {
        is.string.name.should.equal('string');
        is.string('').should.equal(true);
        is.string('test').should.equal(true);
        is.string(1).should.equal(false);
    });
});

describe('is.maybeString', function () {
    it('should return true for string values and nil values', function () {
        is.maybeString.name.should.equal('maybeString');
        is.maybeString('').should.equal(true);
        is.maybeString('test').should.equal(true);
        is.maybeString(1).should.equal(false);
        is.maybeString().should.equal(true);
        is.maybeString(null).should.equal(true);
    });
});

describe('is.stringGT', function () {
    it('should return true for string lengths greater than n', function () {
        is.stringGT(2).name.should.equal('stringGT');
        is.stringGT(2)('123').should.equal(true);
        is.stringGT(3)('123').should.equal(false);
    });
});

describe('is.stringGTE', function () {
    it('should return true for string lengths greater than or equal to n', function () {
        is.stringGTE(2).name.should.equal('stringGTE');
        is.stringGTE(2)('123').should.equal(true);
        is.stringGTE(3)('123').should.equal(true);
        is.stringGTE(3)('12').should.equal(false);
    });
});

describe('is.stringLT', function () {
    it('should return true for string lengths less than n', function () {
        is.stringLT(4).name.should.equal('stringLT');
        is.stringLT(4)('123').should.equal(true);
        is.stringLT(3)('123').should.equal(false);
    });
});

describe('is.stringLTE', function () {
    it('should return true for string lengths less than or equal to n', function () {
        is.stringLTE(4).name.should.equal('stringLTE');
        is.stringLTE(4)('123').should.equal(true);
        is.stringLTE(3)('123').should.equal(true);
        is.stringLTE(2)('123').should.equal(false);
    });
});

describe('is.stringBetween', function () {
    it('should return true for string lengths between n1 and n2', function () {
        is.stringBetween(1, 3).name.should.equal('stringBetween');
        is.stringBetween(1, 3)('123').should.equal(true);
        is.stringBetween(5, 10)('123').should.equal(false);
    });
});
