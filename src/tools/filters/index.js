import Moment from "moment";

export function moment() {
    var args = Array.prototype.slice.call(arguments),
        input = args.shift(),
        date;

    if (Array.isArray(input) && typeof input[0] === 'string') {
        // If input is array, assume we're being passed a format pattern to parse against.
        // Format pattern will accept an array of potential formats to parse against.
        // Date string should be at [0], format pattern(s) should be at [1]
        date = Moment(string = input[0], formats = input[1], true);
    } else {
        // Otherwise, throw the input at moment and see what happens...
        date = Moment(input);
    }

    if (!input || !date.isValid()) {
        // Log a warning if moment couldn't reconcile the input. Better than throwing an error?
        console.warn('Could not build a valid `moment` object from input.');
        return input;
    }

    function parse() {
        var args = Array.prototype.slice.call(arguments),
            method = args.shift();

        switch (method) {
            case 'add':

                // Mutates the original moment by adding time.
                // http://momentjs.com/docs/#/manipulating/add/

                var addends = args.shift()
                    .split(',')
                    .map(Function.prototype.call, String.prototype.trim);
                var obj = {};
                for (var n = 0; n < addends.length; n++) {
                    var addend = addends[n].split(' ');
                    obj[addend[1]] = addend[0];
                }
                date = date.add(obj);
                break;

            case 'subtract':

                // Mutates the original moment by subtracting time.
                // http://momentjs.com/docs/#/manipulating/subtract/

                var subtrahends = args.shift()
                    .split(',')
                    .map(Function.prototype.call, String.prototype.trim);
                obj = {};
                for (var n = 0; n < subtrahends.length; n++) {
                    var subtrahend = subtrahends[n].split(' ');
                    obj[subtrahend[1]] = subtrahend[0];
                }
                date = date.subtract(obj);
                break;

            case 'from':

                // Display a moment in relative time, either from now or from a specified date.
                // http://momentjs.com/docs/#/displaying/fromnow/

                var from = 'now';
                if (args[0] == 'now') args.shift();

                if (Moment(args[0]).isValid()) {
                    // If valid, assume it is a date we want the output computed against.
                    from = Moment(args.shift());
                }

                var removeSuffix = false;
                if (args[0] === true) {
                    args.shift();
                    var removeSuffix = true;
                }

                if (from != 'now') {
                    date = date.from(from, removeSuffix);
                    break;
                }

                date = date.fromNow(removeSuffix);
                break;

            case 'diff':

                // Mutates the original moment by doing a difference with another date.
                // http://momentjs.com/docs/#/displaying/difference/

                var dateDiff = 'now';
                if (args[0] == 'now') args.shift();

                if (Moment(args[0]).isValid()) {
                    dateDiff = Moment(args.shift());
                }

                var units = '';
                if (args[0]) {
                    var units = args.shift();
                }

                var floatingValue = false;
                if (args[0] === true) {
                    args.shift();
                    var floatingValue = true;
                }

                date = date.diff(dateDiff, units, floatingValue)
                break;

            case 'calendar':

                // Formats a date with different strings depending on how close to a certain date (today by default) the date is.
                // http://momentjs.com/docs/#/displaying/calendar-time/

                var referenceTime = Moment();

                if (Moment(args[0]).isValid()) {
                    // If valid, assume it is a date we want the output computed against.
                    referenceTime = Moment(args.shift());
                }

                date = date.calendar(referenceTime);
                break;

            case 'timezone':
                // Mutates the original moment by converting to a new timezone.
                // https://momentjs.com/timezone/docs/#/using-timezones/converting-to-zone/
                date = date.tz(args.shift());
                break;

            default:
                // Format
                // Formats a date by taking a string of tokens and replacing them with their corresponding values.
                // http://momentjs.com/docs/#/displaying/format/

                var format = method;
                date = date.format(format);
        }

        if (args.length) parse.apply(parse, args);
    }

    parse.apply(parse, args);


    return date;
}

function pluralize(time, label) {
    if (time === 1) {
        return time + label
    }
    return time + label + 's'
}
export function timeAgo(time) {
    const between = Date.now() / 1000 - Number(time)
    if (between < 3600) {
        return pluralize(~~(between / 60), ' minute')
    } else if (between < 86400) {
        return pluralize(~~(between / 3600), ' hour')
    } else {
        return pluralize(~~(between / 86400), ' day')
    }
}

export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }

    if ((time + '').length === 10) {
        time = +time * 1000
    }

    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        date = new Date(parseInt(time))
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}

export function formatTime(time, option) {
    time = +time * 1000
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) { // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
    }
}

export function num(num) {
    return parseFloat(num)
}

/* 数字 格式化*/
export function nFormatter(num, digits) {
    const si = [
        { value: 1E18, symbol: 'E' },
        { value: 1E15, symbol: 'P' },
        { value: 1E12, symbol: 'T' },
        { value: 1E9, symbol: 'G' },
        { value: 1E6, symbol: 'M' },
        { value: 1E3, symbol: 'k' }
    ]
    for (let i = 0; i < si.length; i++) {
        if (num >= si[i].value) {
            return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
        }
    }
    return num.toString()
}

export function html2Text(val) {
    const div = document.createElement('div')
    div.innerHTML = val
    return div.textContent || div.innerText
}

export function toThousandslsFilter(num) {
    return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}