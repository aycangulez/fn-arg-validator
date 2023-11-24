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

    this.string = function string(v) {
        return _.isString(v);
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
