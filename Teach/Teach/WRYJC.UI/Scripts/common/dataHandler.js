var dataHelper = (function () {
    return {
        toJSON: function (jsonStr) {
            return JSON.parse(jsonStr);
        },

        fromJSON: function (data) {
            return JSON.stringify(data);
        }
    };
})();