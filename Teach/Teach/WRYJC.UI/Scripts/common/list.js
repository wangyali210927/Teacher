//通用表格式列表
var listHelper = (function () {
    function init(selector) {
        var list = $(selector);
        var afterHandler = arguments[1];
        var onLoading = arguments[2];
        var onAfterLoaded = arguments[3];

        if ($(list).size() <= 0)
            return;

        var toolSelector = $(selector).parent().prev();
        var pageSize = $(toolSelector).find(".js-pagesize .active input[type=radio]").val() || 10;
        var sort = $(toolSelector).find(".js-sort .active input[type=radio]").attr("name") || "ID";
        var order = $(toolSelector).find(".js-sort .active input[type=radio]").val() || "desc";


        $(list).each(function (i, e) {
            var selector = $(e).parent().parent();
            var data = getPageData(selector);
            if ($(this).hasClass("active")) {
                return;
            }

            load(e, data, afterHandler, onLoading, onAfterLoaded);

            var t = e;
            var pageSizeSelector = $(selector).find(".js-pagesize .btn");
            var pageSortSelector = $(selector).find(".js-sort .btn");
            var pageSearchSelector = $(selector).find(".js-search button:submit");
            $(pageSizeSelector).click(function (e) {
                var data = getPageData(selector);
                load(t, data, afterHandler, onLoading, onAfterLoaded);
            });

            $(pageSortSelector).click(function (e) {
                var iconSortSelector = $(selector).find(".js-sort .btn i");
                var activeSortSelector = $(selector).find(".js-sort .active input[type=radio]");
                var sortSelector = $(selector).find(".js-sort input[type=radio]");

                $(iconSortSelector).remove();
                var sort = $(activeSortSelector).val();
                sort = sort === "desc" ? "asc" : "desc";
                if ($($(this).find("i")) <= 0) {
                    $(sortSelector).val("desc");
                    sort = "desc";
                }

                $(activeSortSelector).val(sort);
                $(this).append('<i class="fa fa-sort-alpha-' + sort + '"></i>');
                var data = getPageData(selector);
                load(t, data, afterHandler, onLoading, onAfterLoaded);
            });

            $(pageSearchSelector).click(function (e) {
                var data = getPageData(selector);
                load(t, data, afterHandler, onLoading, onAfterLoaded);
            });
        });
    }

    function load(selector) {
        if ($(selector).size() <= 0) {
            return;
        }

        var url = $(selector).attr("url");
        if (typeof url === "undefined" || url === "") {
            message("数据表参数未设置，参数名:url");
            return;
        }

        var templateItem = $(selector).find(".js-template");
        var parmaters = arguments;
        var selector2 = $(selector).parent().parent();
        var data = parmaters[1] || getPageData(selector2);
        if (templateItem.length == 0) {
            //message("没有设置列表模板");
            //return;
        }
        else {
            
            var columnCollection = $(templateItem).find(".js-item");
            var columns = [];
            for (var i = 0; i <= columnCollection.length - 1; i++) {
                var coloum = {};
                var name = $(columnCollection[i]).attr("name") || "";
                var format = $(columnCollection[i]).attr("formatter") || "";
                var parameter = $(columnCollection[i]).attr("paramter") || "";

                if (name !== "") {
                    coloum["name"] = name;
                    coloum["format"] = format;
                    coloum["parameter"] = parameter;
                    columns.push(coloum);
                }
            }

            var dataBody = $(selector).find(".js-body");
            var tagName = $(templateItem).get(0).tagName || $(templateItem).get(0).nodeName;
            var templateHtml = "<" + tagName + " class='js-list "
                + $(templateItem).attr("class").replace("js-template", "")
                + "'>" + $(templateItem).html() + "</" + tagName + ">";
        }
        $(templateItem).hide();
        var afterHandler = typeof parmaters[2] === "function" ? parmaters[2] : function (data) {
            if (data["Success"]) {
                $(selector).find(".js-list").remove();
                $($($(selector).find(".js-page")).children()).remove();

                if ($.type(parmaters[3]) === "function") {
                    parmaters[3](dataBody);
                }

                var dataResult = data["Type"] === "Json" ? JSON.parse(data["Msg"]) : data["Msg"];
                var rows = dataResult["dataRows"];

                if (templateItem.length != 0) {
                    $(rows).each(function (index, element) {
                        var html = templateHtml;
                        for (var i = 0; i <= columns.length - 1; i++) {
                            var item = columns[i];
                            if (item["format"] !== "") {
                                var f = item["format"] + "(" + element[item["name"]] + ")";
                                if (item["parameter"] !== "") {
                                    f = item["format"] + "(" + element[item["name"]] + ",'" + item["parameter"] + "')";
                                }

                                html = html.replace(eval("/\\$\\{" + item["name"] + "\\\}/g"), element[item["name"]] != null ? eval(f) : "");
                            } else {
                                if (item["name"].indexOf('.') < 0) {
                                    html = html.replace(eval("/\\$\\{" + item["name"] + "\\\}/g"), element[item["name"]] != null ? element[item["name"]] : "");
                                } else {
                                    var key = item["name"].split(".");
                                    html = html.replace(eval("/\\$\\{" + item["name"] + "\\\}/g"), element[key[0]] != null && (typeof element[key[0]][key[1]] !== "undefined" || element[key[0]][key[1]] != null) ? element[key[0]][key[1]] : "");
                                }
                            }
                        }
                        $(dataBody).append(html);

                        if (index == rows.length - 1) {
                            $(tagName + '[class!="js-template"] .iCheck-helper').remove();

                            if ($(tagName + '[class!="js-template"] .i-checks').size() > 0) {
                                $(tagName + '[class!="js-template"] .i-checks').iCheck({
                                    checkboxClass: 'icheckbox_square-green',
                                    radioClass: 'iradio_square-green'
                                });
                            }
                        }
                    });
                }
                else {
                    var setting = {
                        data: {
                            key: {
                                title: "t"
                            },
                            simpleData: {
                                enable: true
                            }
                        },
                        callback: {
                            beforeClick: beforeClick,
                            onClick: onClick
                        }
                    };

                    var zNodes = dataResult.message;//dataResult["message"].value;
                    
                    var log, className = "dark";
                    function beforeClick(treeId, treeNode, clickFlag) {
                        className = (className === "dark" ? "" : "dark");
                        return (treeNode.click != false);
                    }
                    function onClick(event, treeId, treeNode, clickFlag) {
                        var tntype = treeNode.id.substring(0, 1);
                        $("#hcurrentid").val(treeNode.id.substring(1));
                        if (tntype == "e") {
                            $("#enterprise").show();
                            $("#wasteobject").hide();
                            $("#pollutant").hide();
                            $("#datacollect").hide();
                            $("#monitorequip").hide();
                            $("#controlfacility").hide();
                            switch ($("#hcurrentfun").val()) {
                                case "realtimeMonitor":
                                    RealtimeMonitor();
                                    break;
                                case "enterpriseHome":
                                    EnterpriseHome();
                                    break;
                                case "monitorData":
                                    MonitorData();
                                    break;
                                case "alarmDisposal":
                                    AlarmDisposal();
                                    break;
                                case "equipStatus":
                                    EquipStatus();
                                    break;
                                case "basicInfo":
                                    BasicInfo();
                                    break;
                            }

                        } else if (tntype == "w") {
                            $("#enterprise").hide();
                            $("#wasteobject").show();
                            $("#pollutant").hide();
                            $("#datacollect").hide();
                            $("#monitorequip").hide();
                            $("#controlfacility").hide();
                            switch ($("#hcurrentfun").val()) {
                                case "wmonitorData":
                                    WMonitorData();
                                    break;
                                case "wbasicInfo":
                                    WBasicInfo();
                                    break;
                            }
                        } else if (tntype == "d") {
                            $("#enterprise").hide();
                            $("#wasteobject").hide();
                            $("#pollutant").hide();
                            $("#datacollect").show();
                            $("#monitorequip").hide();
                            $("#controlfacility").hide();
                            switch ($("#hcurrentfun").val()) {
                                case "ddropProc":
                                    DDropProc();
                                    break;
                                case "dbasicInfo":
                                    DBasicInfo();
                                    break;
                            }
                        } else if (tntype == "p") {
                            $("#enterprise").hide();
                            $("#wasteobject").hide();
                            $("#pollutant").show();
                            $("#datacollect").hide();
                            $("#monitorequip").hide();
                            $("#controlfacility").hide();
                            switch ($("#hcurrentfun").val()) {
                                case "pollutData":
                                    PollutData();
                                    break;
                                case "pollutAlarm":
                                    PollutAlarm();
                                    break;
                            }
                        } else if (tntype == "m") {
                            $("#enterprise").hide();
                            $("#wasteobject").hide();
                            $("#pollutant").hide();
                            $("#datacollect").hide();
                            $("#monitorequip").show();
                            $("#controlfacility").hide();
                            MBasicInfo();
                        } else if (tntype == "c") {
                            $("#enterprise").hide();
                            $("#wasteobject").hide();
                            $("#pollutant").hide();
                            $("#datacollect").hide();
                            $("#monitorequip").hide();
                            $("#controlfacility").show();
                            switch ($("#hcurrentfun").val()) {
                                case "crunStatus":
                                    CRunStatus();
                                    break;
                                case "cbasicInfo":
                                    CBasicInfo();
                                    break;
                            }
                        }
                    }

                    $.fn.zTree.init($("#treeDemo"), setting, JSON.parse(dataResult.message));
                }

                if ($.type(parmaters[4]) === "function") {
                    parmaters[4](dataBody, rows);
                }

                var mySelector = $(selector).parent();
                var footerSelector = $(mySelector).next();

                if (footerSelector.length <= 0)
                    return;

                //var footerHtml = '总共${total}条,共${rows}页，当前第${page}页<div class="ibox-tools"><div class="btn-group js-page" selector=".table" listtype="table"></div></div>';
                var footerHtml = '总共${total}条,共${rows}页，当前第${page}页<div class="ibox-tools"><div class="btn-group js-page"></div></div>';
                if (footerHtml !== "") {
                    footerHtml = footerHtml.replace("${total}", dataResult["total"]);
                    footerHtml = footerHtml.replace("${rows}", dataResult["rows"]);
                    footerHtml = footerHtml.replace("${page}", dataResult["page"]);
                    $(footerSelector).html(footerHtml);
                    if (dataResult["rows"] > 0) {
                        var pageSelector = $(footerSelector).find(".js-page");
                        var pageTemplate = '<button class="btn btn-white" pageIndex="${page}">${page}</button>';
                        var pageCurrentTemplate = '<button class="btn btn-white active" pageIndex="${page}">${page}</button>';
                        var pageTemplate2 = '<button class="btn btn-white">...</button>';

                        var startPage = parseInt(dataResult["page"]) - 5 > 1 ? parseInt(dataResult["page"]) - 5 : 1;
                        var endPage = parseInt(dataResult["rows"]) <= 10 ?
                            parseInt(dataResult["rows"]) : startPage + 9 < parseInt(dataResult["rows"]) ?
                            startPage + 9 : parseInt(dataResult["rows"]);

                        if (startPage > 1) {
                            $(pageSelector).append(pageTemplate.replace(/\$\{page\}/g, 1));
                            $(pageSelector).append(pageTemplate2);
                        }

                        for (var i = startPage; i <= endPage; i++) {
                            if (i != dataResult["page"]) {
                                $(pageTemplate.replace(/\$\{page\}/g, i)).appendTo(pageSelector);
                            } else {
                                $(pageCurrentTemplate.replace(/\$\{page\}/g, i)).appendTo(pageSelector);
                            }
                        }

                        if (endPage < dataResult["rows"]) {
                            $(pageSelector).append(pageTemplate2);
                            $(pageSelector).append(pageTemplate.replace(/\$\{page\}/g, dataResult["rows"]));
                        }

                        $($(footerSelector).find(".js-page button")).click(function (e) {
                            var p = $(this).parent();
                            if ($(this).hasClass("active")) {
                                return;
                            }

                            var index = $(this).attr("pageIndex") || 1;
                            var ctlSelector = $(p).attr("selector");
                            if (index < 1) {
                                return;
                            }

                            var pageData = parmaters[1] || getPageData(selector2);
                            pageData["pageIndex"] = index;
                            load(selector, pageData, parmaters[2], parmaters[3], parmaters[4]);
                        });
                    }
                }

            } else {
                warning(data["Msg"]);
            }
        }
        if (typeof core === "undefined") {
            $.getScript("/Scripts/common/apiHandler.js", function (script, textStatus, jqxhr) {
                core.ajax(url, data, null, afterHandler);
            });
        } else {
            core.ajax(url, data, null, afterHandler);
        }
    }


    function getPageData(selector) {
        var pageSizeSelector = $(selector).find(".js-pagesize .active input[type=radio]");
        var pageSortSelector = $(selector).find(".js-sort .active input[type=radio]");
        var pageSearchSelector = $(selector).find(".js-search input:text");

        var pageSize = $(pageSizeSelector).val() || 20;
        var sort = $(pageSortSelector).attr("name") || "ID";
        var order = $(pageSortSelector).val() || "desc";

        var data = {};
        data["pageSize"] = pageSize;

        data["sort"] = sort;
        data["order"] = order;

        var key = "";
        var value = "";
        var item = null;
        for (var i = 0; i <= $(selector).find(".js-search input:text").length - 1; i++) {
            item = $(selector).find(".js-search input:text")[i];
            key = $(item).attr("name");
            value = $(item).val();
            if (typeof value !== "undefined" && value !== "") {
                data[key] = value;
            }
        }

        for (var i = 0; i <= $(selector).find(".js-search select").length - 1; i++) {
            item = $(selector).find(".js-search select")[i];
            key = $(item).attr("name");
            value = $(item).val();
            if (typeof value !== "undefined" && value !== "") {
                data[key] = value === "true" || value === "false" ? value === "true" : value;
            }
        }

        return data;
    }

    return {
        //普通表格列表
        table: {
            init: function () {
                init(".js-table");
            },
            initForMap: function () {
                var selector = ".js-table-map";
                function onLoading(selector) {
                }

                var f = typeof onAfterLoaded !== "undefined" ? onAfterLoaded : function (selector, rows) {
                };
                init(selector, null, onLoading, f);
            },
            loadDefault: function (selector) {
                load(selector);
            },
            load: function (selector, data, afterHandler, onLoading, onLoaded) {
                load(selector, data, afterHandler, onLoading, onLoaded);
            }
        },

        //非表格列表
        list: {
            init: function () {
                //init(".js-lists");
                var selector = ".js-lists";
                function onLoading(selector) {
                }

                var f = typeof onAfterLoaded !== "undefined" ? onAfterLoaded : function (selector, rows) {
                };
                init(selector, null, onLoading, f);
            },
            initForMap: function () {
                var selector = ".js-map-list";
                function onLoading(selector) {
                }

                var f = typeof onAfterLoaded !== "undefined" ? onAfterLoaded : function (selector, rows) {
                };
                init(selector, null, onLoading, f);
            },
            loadDefault: function (selector) {
                load(selector);
            },
            loadForMap: function (selector) {
                var data = getPageData(selector);
                function onLoading(selector) {
                }

                var f = typeof onAfterLoaded !== "undefined" ? onAfterLoaded : function (selector, rows) {
                };
                load(selector, data, null, onLoading, f);
            },
            load: function (selector, data, afterHandler, onLoading, onLoaded) {
                load(selector, data, afterHandler, onLoading, onLoaded);
            }
        },

        //瀑布流列表
        waterfall: {
            init: function () {
                if ($(".js-waterfall").size() <= 0) {
                    return;
                }

                $(".js-waterfall").masonry('destroy');
                init(".js-waterfall", function (selector, rows) {
                    var num = $.parseInt($(selector).attr("columnCount") || "3");
                    if (rows.length >= num) {
                        $(selector).imagesLoaded(function () {
                            $(selector).masonry({
                                itemSelector: itemSelector,
                                isFitWidth: true
                            });
                        });
                    }
                });
            },
            loadDefault: function (selector) {
                load(selector, arguments[1], arguments[2], function (selector) {
                    $(selector).masonry('destroy');
                }, function (selector, rows) {
                    var num = $.parseInt($(selector).attr("columnCount") || "3");
                    if (rows.length >= num) {
                        $(selector).imagesLoaded(function () {
                            $(selector).masonry({
                                itemSelector: itemSelector,
                                isFitWidth: true
                            });
                        });
                    }
                });
            },
            load: function (selector, data) {
                load(selector, data, arguments[2], function (selector) {
                    $(selector).masonry('destroy');
                }, function (selector, rows) {
                    var num = $.parseInt($(selector).attr("columnCount") || "3");
                    if (rows.length >= num) {
                        $(selector).imagesLoaded(function () {
                            $(selector).masonry({
                                itemSelector: itemSelector,
                                isFitWidth: true
                            });
                        });
                    }
                });
            }
        },

        getPageData: getPageData
    }
})();

$(function () {
    function initCore() {
        $("form").submit(function () {
            return false;
        });

        listHelper.table.init();
        listHelper.table.initForMap();
        listHelper.list.init();
        listHelper.list.initForMap();
        listHelper.waterfall.init();
    }

    initCore();
});