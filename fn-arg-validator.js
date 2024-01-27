try {
    var _ = require('lodash');
} catch (e) {}

const is = (function () {
    const logLevels = { OFF: 0, FATAL: 1, ERROR: 2, WARN: 3, INFO: 4, DEBUG: 5, TRACE: 6, ALL: 7 };
    this.config = { logLevel: 'WARN', log: console, throw: false };
    const warn = (message) => (logLevels[config.logLevel] >= logLevels['WARN'] ? config.log.warn(message) : false);
    const debug = (message) => (logLevels[config.logLevel] >= logLevels['DEBUG'] ? config.log.debug(message) : false);

    this.valid = function () {
        const funcs = _.initial(arguments);
        const args = _.last(arguments);
        let result = true;
        _.each(funcs, (func, i) => {
            if (func(args[i])) {
                debug(JSON.stringify(args[i]) + ' passed ' + func.name + ' check');
            } else {
                let warning = JSON.stringify(args[i]) + ' failed ' + func.name + ' check';
                if (this.config.throw) {
                    throw new Error(warning);
                }
                log.warn(warning);
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

    this.buffer = function buffer(v) {
        return _.isBuffer(v);
    };

    this.maybeBuffer = function maybeBuffer(v) {
        return _.isNil(v) || this.buffer(v);
    };

    this.date = function date(v) {
        return _.isDate(v);
    };

    this.maybeDate = function maybeDate(v) {
        return _.isNil(v) || this.date(v);
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

    this.numberGreaterThan = (n) =>
        function numberGreaterThan(v) {
            return _.isNumber(v) && v > n;
        };

    this.numberLessThan = (n) =>
        function numberLessThan(v) {
            return _.isNumber(v) && v < n;
        };

    this.numberBetween = (n1, n2) =>
        function numberBetween(v) {
            return _.isNumber(v) && v >= n1 && v <= n2;
        };

    this.object = function object(v) {
        return _.isObject(v);
    };

    this.maybeObject = function maybeObject(v) {
        return _.isNil(v) || this.object(v);
    };

    this.objectWithProps = (props) =>
        function objectWithProps(v) {
            let result = true;
            _.each(props, (typeFunc, prop) => {
                if (!typeFunc(_.get(v, prop))) {
                    result = false;
                }
            });
            return result;
        };

    this.oneOf = function oneOf() {
        let typeFuncs = arguments;
        return function oneOf(v) {
            return _.some(typeFuncs, (typeFunc) => typeFunc(v));
        };
    };

    this.string = function string(v) {
        return _.isString(v);
    };

    this.maybeString = function maybeString(v) {
        return _.isNil(v) || this.string(v);
    };

    this.stringLongerThan = (n) =>
        function stringLongerThan(v) {
            return _.isString(v) && _.size(v) > n;
        };

    this.stringShorterThan = (n) =>
        function stringShorterThan(v) {
            return _.isString(v) && _.size(v) < n;
        };

    this.stringBetween = (n1, n2) =>
        function stringBetween(v) {
            return _.isString(v) && _.size(v) >= n1 && _.size(v) <= n2;
        };

    return this;
})();

try {
    module.exports = exports = is;
} catch (e) {}
