DS.attr.transforms.date = {
    //overriden to use date.js
    from: function (serialized) {
        var type = typeof serialized;

        if (type === "string" || type === "number") {
            return Date.parse(serialized);
        } else if (serialized === null || serialized === undefined) {
            return serialized;
        } else {
            return null;
        }
    },
    to: function(date, format) {
        if (format === undefined) {
            format = 'yyyy-MM-dd hh:mm:ss';
        }
        if (date instanceof Date) {
            return Date.toString(format);
        } else if (date === undefined) {
            return undefined;
        } else {
            return null;
        }
    }
};