const _ = require('lodash');

const is = (function () {
    const logLevels = { ERROR: 0, WARN: 1, INFO: 2 };
    this.logLevel = 'WARN';
    this.log = console;
    this.warn = (message) => (logLevels[this.logLevel] >= logLevels['WARN'] ? log.warn(message) : false);
    this.info = (message) => (logLevels[this.logLevel] >= logLevels['INFO'] ? log.info(message) : false);
    this.valid = function () {
        const funcs = _.initial(arguments);
        const args = _.last(arguments);
        let result = true;
        _.each(funcs, (func, i) => {
            if (func(args[i])) {
                this.info(args[i] + ' passed ' + func.name + ' check');
            } else {
                this.warn(args[i] + ' failed ' + func.name + ' check');
                result = false;
            }
        });
        return result;
    };

    this.any = function any() {
        return true;
    };

    this.array = function array(v) {
        return _.isArray(v);
    };

    this.maybeArray = function maybeArray(v) {
        return _.isNil(v) || this.array(v);
    };

    this.boolean = function boolean(v) {
        return _.isBoolean(v);
    };

    this.maybeBoolean = function maybeBoolean(v) {
        return _.isNil(v) || this.boolean(v);
    };

    this.func = function func(v) {
        return _.isFunction(v);
    };

    this.maybeFunc = function maybeFunc(v) {
        return _.isNil(v) || this.func(v);
    };

    this.number = function number(v) {
        return _.isNumber(v);
    };

    this.maybeNumber = function maybeNumber(v) {
        return _.isNil(v) || this.number(v);
    };

    this.numberGreaterThan = (x) =>
        function numberGreaterThan(v) {
            return _.isNumber(v) && v > x;
        };

    this.numberLessThan = (x) =>
        function numberLessThan(v) {
            return _.isNumber(v) && v < x;
        };

    this.numberBetween = (x1, x2) =>
        function numberBetween(v) {
            return _.isNumber(v) && v >= x1 && v <= x2;
        };

    this.string = function string(v) {
        return _.isString(v);
    };

    this.maybeString = function maybeString(v) {
        return _.isNil(v) || this.string(v);
    };

    this.stringLongerThan = (x) =>
        function stringLongerThan(v) {
            return _.isString(v) && _.size(v) > x;
        };

    this.stringShorterThan = (x) =>
        function stringShorterThan(v) {
            return _.isString(v) && _.size(v) < x;
        };

    this.stringBetween = (x1, x2) =>
        function stringBetween(v) {
            return _.isString(v) && _.size(v) >= x1 && _.size(v) <= x2;
        };

    return this;
})();

try {
    module.exports = exports = is;
} catch (e) {}
