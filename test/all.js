var is = require('../fn-arg-validator');
var chai = require('chai');
var should = chai.should();

console.log(is.string('test'));

describe('is.string', function () {
    it('should return true for string values', function () {
        is.string('').should.equal(true);
        is.string('test').should.equal(true);
        is.string(1).should.equal(false);
    });
});

describe('is.stringLongerThan', function () {
    it('should return true for string lengths longer than x', function () {
        is.stringLongerThan(2)('123').should.equal(true);
        is.stringLongerThan(3)('123').should.equal(false);
    });
});

describe('is.stringShorterThan', function () {
    it('should return true for string lengths shorter than x', function () {
        is.stringShorterThan(4)('123').should.equal(true);
        is.stringShorterThan(3)('123').should.equal(false);
    });
});

describe('is.stringBetween', function () {
    it('should return true for string lengths between x1 and x2', function () {
        is.stringBetween(1, 3)('123').should.equal(true);
        is.stringBetween(5, 10)('123').should.equal(false);
    });
});
