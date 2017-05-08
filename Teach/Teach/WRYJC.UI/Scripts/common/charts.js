var chartsHelper = (function () {
    var pie = (function () {
        function init(selector,title, subtitle, tooltip, series) {
            var option = {};
            option["chart"] = {};
            option["title"] = typeof title === "object" ? title : option["title"] = { "text": title };
            option["subtitle"] = typeof subtitle === "object" ? subtitle : option["subtitle"] = { "text": subtitle };
            option["chart"]["type"] = "pie";

            option["credits"] = { "enabled": false };
            option["tooltip"]= tooltip || {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            };

            option["plotOptions"]={
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    },
                    showInLegend: true
                }
            }

            option["series"] = series;

            $(selector).highcharts(option);
        }

        return {
            "init":init
        };
    })();

    var line = (function () {
        function init(selector,title, subtitle, categories, ytitle, tooltip, series) {
            if (!$.isArray(categories)) {
                alert("参数categories:必须为数组");
                return;
            }

            if (!$.isArray(series)) {
                alert("参数series:必须为数组");
                return;
            }

            var option={};
            option["chart"] = {};
            option["title"] = typeof title === "object" ? title : option["title"] = { "text": title };
            option["subtitle"] = typeof subtitle === "object" ? subtitle : option["subtitle"] = { "text": subtitle };
            option["chart"]["type"] = "line";
            option["credits"] = { "enabled": false };
            option["xAxis"] = {};
            option["xAxis"]["categories"] = categories;
            option["plotOptions"] = {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            }

            
            if ($.type(ytitle) === "string") {
                option["yAxis"] = { "title": { "text": ytitle } };
            }

            if ($.type(ytitle) === "object") {
                option["yAxis"] = { "title": ytitle };
            }

            if (typeof tooltip !== "undefined") {
                option["tooltip"] = tooltip;
            }

            option["series"] = series;

            $(selector).highcharts(option);
        }

        return {
            "init":init
        };
    })();

    var column = (function () {
        function init(selector,title, subtitle, categories, ytitle, tooltip, series) {
            if (!$.isArray(categories)) {
                alert("参数categories:必须为数组");
                return;
            }

            if (!$.isArray(series)) {
                alert("参数series:必须为数组");
                return;
            }

            var option={};
            option["chart"] = {};
            option["title"] = typeof title === "object" ? title : option["title"] = { "text": title };
            option["subtitle"] = typeof subtitle === "object" ? subtitle : option["subtitle"] = { "text": subtitle };
            option["chart"]["type"] = "column";
            option["credits"] = { "enabled": false };
            option["xAxis"] = {};
            option["xAxis"]["categories"] = categories;
            option["plotOptions"] = {
                column: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            }

            option["yAxis"] = {};
            option["yAxis"]["min"] = 0;

            if ($.type(ytitle) === "string") {
                option["yAxis"]["title"] = { "title": { "text": ytitle } };
            }

            if ($.type(ytitle) === "object") {
                option["yAxis"]["title"] = ytitle ;
            }

            if (typeof tooltip !== "undefined") {
                option["tooltip"] = tooltip;
            }

            option["labels"] = {};
            option["legend"] = {};
            option["series"] = series;

            $(selector).highcharts(option);
        }

        return {
            "init":init
        };
    })();

    return {
        "Pie": {
            "init": function (containers,data) {
                pie.init(containers, data["Title"], data["SubTitle"], data["ToolTip"], data["Series"]);
            }
        },

        "Column": {
            "init": function (containers,data) {
                column.init(containers, data["Title"], data["SubTitle"], data["Categories"], data["YTitle"], data["ToolTip"], data["Series"]);
            }
        },

        "Line": {
            "init": function (containers,data) {
                line.init(containers, data["Title"], data["SubTitle"], data["Categories"], data["YTitle"], data["ToolTip"], data["Series"]);
            }
        }
    }
})();