var uiHelper = (function () {

    function getSelected(selector) {
        var selectedList = $(selector).find("input[type=checkbox]:checked");
        var IdList = [];
        for (var i = 0; i <= selectedList.size() - 1; i++) {
            IdList.unshift($(selectedList[i]).val());
        }

        return IdList;
    }

    var controlHelper = (function () {
        function chosen() {
            if ($(".chosen-select").length <= 0 && $(".chosen-select-width").length <= 0)
                return;

            $.getScript("/Scripts/plugins/chosen/chosen.jquery.js", function (script, textStatus, jqxhr) {
                var config = {
                    '.chosen-select': {},
                    '.chosen-select-deselect': {
                        allow_single_deselect: true
                    },
                    '.chosen-select-no-single': {
                        disable_search_threshold: 10
                    },
                    '.chosen-select-no-results': {
                        no_results_text: 'Oops, nothing found!'
                    },
                    '.chosen-select-width': {
                        width: "100%"
                    }
                }

                for (var selector in config) {
                    $(selector).chosen(config[selector]);
                }
            });
        }

        function icheck() {
            if ($(".i-checks").length <= 0) {
                return;
            }

            $.getScript("/Scripts/plugins/iCheck/icheck.min.js", function (script, textStatus, jqxhr) {
                $('.i-checks').iCheck({
                    checkboxClass: 'icheckbox_square-green',
                    radioClass: 'iradio_square-green'
                });
            });
        }

        function date() {
            function initDate(selector) {
                $(selector).datepicker({
                    todayBtn: "linked",
                    keyboardNavigation: false,
                    forceParse: false,
                    calendarWeeks: true,
                    autoclose: true
                });
            }

            var selector = ".input-date";
            if ($(selector).length <= 0) {
                return;
            }

            if ($.type($(selector).datepicker()) !== "function") {
                $.getScript("/Scripts/plugins/datapicker/bootstrap-datepicker.js", function (script, textStatus, jqxhr) {
                    initDate(selector);
                });
            } else {
                initDate(selector);
            }
        }

        function dateRange() {
            function initDateRange(selector) {
                $(selector).datepicker({
                    keyboardNavigation: false,
                    forceParse: false,
                    autoclose: true
                });
            }

            var selector = ".input-daterange";
            if ($(selector).length <= 0) {
                return;
            }

            if ($.type($(selector).datepicker) !== "function") {
                $.getScript("/Scripts/plugins/datapicker/bootstrap-datepicker.js", function (script, textStatus, jqxhr) {
                    initDateRange(selector);
                });
            } else {
                initDateRange(selector);
            }
        }

        function ueditor(selector) {
            if ($(selector).length <= 0) {
                return;
            }

            var editors = $(selector);
            if ($(editors).length > 0) {
                if (typeof UE !== "undefined") {
                    for (var i = 0; i < editors.length; i++) {
                        UE.getEditor(editors[i].id);
                    }
                } else {
                    $.getScript("/Scripts/plugins/datapicker/bootstrap-datepicker.js", function (script, textStatus, jqxhr) {
                        for (var i = 0; i < editors.length; i++) {
                            UE.getEditor(editors[i].id);
                        }
                    });
                }
            }
        }

        function removeUEditor(selector) {
            if ($(selector).size() <= 0)
                return;

            if ($(selector).length > 0) {
                for (var i = 0; i < $(selector).length; i++) {
                    UE.delEditor($(selector).attr("id"));
                }
            }
        }

        return {
            Chosen: chosen,
            iCheck: icheck,
            Date: date,
            DateRange: dateRange,
            UEditor: {
                ueditor: ueditor,
                removeUEditor: removeUEditor
            }
        };
    })();

    var buttonHelper = (function () {

        function noDataLinkButton(selector) {
            if ($(selector).length <= 0) {
                return;
            }

            $(selector).click(function (e) {
                if (typeof e.preventDefault === "function") {
                    e.preventDefault();
                }

                var url = $(this).hasClass("btn") ? $(this).attr("url") : $(this).attr("href");
                location.href = url;
            });
        }

        function dataLinkButton(selector) {
            if ($(selector).size() <= 0)
                return;

            $(selector).click(function (e) {
                if (typeof e.preventDefault === "function") {
                    e.preventDefault();
                }

                var dataSelector = $(selector).attr("dataSelector");
                var data = getSelected(dataSelector);
                if (data.length == 0) {
                    message("请选择要操作的记录");
                    return;
                }

                if (data.length > 1) {
                    message("只能对一条数据进行操作");
                    return;
                }

                var url = $(this).hasClass("btn") ? $(this).attr("url") : $(this).attr("href");
                location.href = url + "/" + data[0];
            });

        }

        function ajaxButton(selector, data, processHandler) {
            if ($(selector).size() <= 0) {
                return;
            }

            $(this).click(function (e) {
                if (typeof e.preventDefault === "function") {
                    e.preventDefault();
                }

                var dataSelector = $(selector).attr("dataSelector");
                var d = data || getSelected(dataSelector);
                if (d.length == 0) {
                    message("请选择要操作的记录");
                    return;
                }

                if (d.length > 1) {
                    message("只能对一条数据进行操作");
                    return;
                }

                processHandler(d);
            });
        }

        function ajaxButtonBattch(selector, data, processHandler) {
            if ($(selector).size() <= 0) {
                return;
            }

            var dataSelector = $(selector).attr("dataSelector");
            var d = data || getSelected(dataSelector);
            if (d.length == 0) {
                message("请选择要操作的记录");
                return;
            }

            processHandler(d);
        }

        return {
            noDataLinkButton: noDataLinkButton,
            dataLinkButton: dataLinkButton,
            ajaxButton: ajaxButton,
            ajaxButtonBattch: ajaxButtonBattch
        };
    })();

    var messageHelper = (function () {

        function message(msg, icon) {
            if (typeof parent.layer == "undefined") {
                $.getScript("/Scripts/plugins/layer/layer.min.js", function (script, textStatus, jqxhr) {
                    parent.layer.msg(msg, { icon: icon, skin: 'text-success' });
                });
            } else {
                parent.layer.msg(msg, { icon: icon, skin: 'text-success' });
            }
        }

        function messageAlert(msg, icon) {
            if (typeof parent.layer == "undefined") {
                $.getScript("/Scripts/plugins/layer/layer.min.js", function (script, textStatus, jqxhr) {
                    parent.layer.alert(msg, { icon: icon, skin: 'text-success' });
                });
            } else {
                parent.layer.alert(msg, { icon: icon, skin: 'text-success' });
            }
        }

        function error(msg) {
            messageAlert(msg, 2);
        }

        function warning(msg) {
            messageAlert(msg, 0);
        }

        function success(msg) {
            message(msg, 1);
        }

        function info(msg) {
            message(msg, 6);
        }

        function confirm(msg, continueHandler) {
            if (typeof parent.layer == "undefined") {
                $.getScript("/Scripts/plugins/datapicker/bootstrap-datepicker.js", function (script, textStatus, jqxhr) {
                    parent.layer.confirm(msg, {
                        icon: 3,
                        btn: ['继续', '取消'], //按钮
                        shade: true //不显示遮罩
                    }, continueHandler, function () {
                        parent.layer.close();
                    });
                });
            } else {
                parent.layer.confirm(msg, {
                    icon: 3,
                    btn: ['继续', '取消'], //按钮
                    shade: false //不显示遮罩
                }, continueHandler, function () {
                    parent.layer.close();
                });
            }
        }

        return {
            message: message,
            messageAlert: messageAlert,
            error: error,
            warning: warning,
            success: success,
            info: info,
            confirm: confirm,
        };
    })();

    var dialogHelper = (function () {
        function dialog(selector, title, html, buttons) {

        }

        function dialogForAjaxList(dialogSelecotr, listSelector, data, onLoading, onAfterLoaded) {
            if ($(dialogSelecotr).size() <= 0)
                return;

            if ($(listSelector).size() <= 0)
                return;

            $(dialogSelecotr).modal();
            if (typeof listHelper === "undefined") {
                $.getScript("/Scripts/common/list.js", function (script, textStatus, jqxhr) {
                    listHelper.list.load(listSelector, data, null, onLoading, function (selector, rows) {
                        onAfterLoaded(selector, rows);
                    });
                });
            } else {
                listHelper.list.load(listSelector, data, null, onLoading, function (selector, rows) {
                    onAfterLoaded(selector, rows);
                });
            }
        }

        function dialogDefault(selector) {
            if ($.type(arguments[1]) === "function") {
                arguments[1](selector);
            }

            $(dialog).modal();
        }

        return {
            dialog: dialog,
            dialogForAjaxList: dialogForAjaxList,
            dialogDefault: dialogDefault
        };
    })();

    var mapHelper = (function () {
        function init(option) {
            var container = option["container"] || "map";
            var map = new BMap.Map(container);
            map.enableAutoResize();

            //var geoc = new BMap.Geocoder();

            map.centerAndZoom(new BMap.Point(option["lon"] || 104.06, option["lat"] || 30.67), option["zoomLevel"] || 12);

            map.addControl(new BMap.MapTypeControl());
            if (typeof option["city"] !== "undefined") {
                map.setCurrentCity(option["city"] || "成都");
            }

            var enable = option["enable"] || true;
            //map.enableScrollWheelZoom(enable);

            if (!enable) {
                map.disableDoubleClickZoom();
                map.disableDragging();
                map.disableKeyboard();
                map.disableScrollWheelZoom();
                map.disablePinchToZoom();
            } else {
                map.enableDoubleClickZoom();
                map.enableDragging();
                map.enableKeyboard();
                //map.enableScrollWheelZoom();
                map.enablePinchToZoom();
            }

            if (typeof option["maxZoom"] !== "undefined" && !isNaN(option["maxZoom"])) {
                setMaxZoom(option["maxZoom"]);
            }

            if (typeof option["minZoom"] !== "undefined" && !isNaN(option["minZoom"])) {
                setMinZoom(option["minZoom"]);
            }

            $("body").data("map", map);

            //return map;
        }

        function getMap() {
            return $("body").data("map");
        }

        function getBounds() {
            var map = getMap() || init();
            return map.getBounds();
        }

        function getCenter() {
            var map = getMap() || init();
            return map.getCenter();
        }

        function setCenter(point) {
            var map = getMap() || init();
            return map.setCenter(point);
        }

        function getDistance(startPoint, endPoint) {
            var map = getMap() || init();
            return map.getDistance(startPoint, endPoint);
        }

        function getMapType() {
            var map = getMap() || init();
            return map.getMapType();
        }

        function setMapType(mapType) {
            var map = getMap() || init();
            return map.setMapType(mapType);
        }

        function getSize() {
            var map = getMap() || init();
            return map.getSize();
        }

        function getViewport(view) {
            var map = getMap() || init();
            return map.getViewport(view);
        }

        function setViewport(view) {
            var map = getMap() || init();
            return map.setViewport(view);
        }

        function getZoom() {
            var map = getMap() || init();
            return map.getZoom();
        }

        function setZoom(zoomLevel) {
            var map = getMap() || init();
            return map.setZoom(zoomLevel);
        }


    })();

    return {
        Chosen: function () {
            controlHelper.Chosen();
        },
        iCheck: function () {
            controlHelper.iCheck();
        },
        Date: function () {
            controlHelper.Date();
        },
        DateRange: function () {
            controlHelper.DateRange();
        },
        UEditor: {
            init: function () {
                var selector = ".js-editor";

                controlHelper.UEditor.ueditor(selector);
            },
            remove: function (selector) {
                controlHelper.UEditor.removeUEditor(selector);
            }
        },
        Button: {
            noDataLinkButton: function () {
                var selector = ".js-url-nodata-button";

                buttonHelper.noDataLinkButton(selector);
            },

            dataLinkButton: function () {
                var selector = ".js-url-data-button";
                buttonHelper.dataLinkButton(selector);
            },

            ajaxButton: function (selector, data, processHandler) {
                buttonHelper.ajaxButton(selector, data, processHandler);
            },
            ajaxButtonBattch: function (selector, data, processHandler) {
                buttonHelper.ajaxButtonBattch(selector, data, processHandler);
            },

            imageManagerButton: function () {
                var selector = ".js-image-manager-button";

                if ($(selector).size() <= 0) {
                    return;
                }



                function uploadSuccess(data) {
                    if (data["state"] === "SUCCESS") {
                        $(".file-name").removeClass("icon-checked");
                        var templateHtml = '<div class="file-box">';
                        templateHtml += '<div class="file js-list">';
                        templateHtml += '<div class="js-item" name="' + data["url"] + '">';
                        templateHtml += '<img class="full-width" ID="' + data["url"] + '" hidden="hidden" />';
                        templateHtml += '</div>';
                        templateHtml += '<div class="file-name js-item icon-checked" name="FileName">';
                        templateHtml += data["title"];
                        templateHtml += '<br />';
                        templateHtml += '<small class="js-item" name="InsertTime">上传时间:现在</small>';
                        templateHtml += '</div>';
                        templateHtml += '</div>';
                        templateHtml += '</div>';

                        $(".js-template").after(templateHtml);

                        var tipsSelector = ".js-progress";
                        $(tipsSelector).html("");

                        $(".js-selected").removeClass("btn-default");
                        $(".js-selected").addClass("btn-primary");
                    }
                }

                var uploadButtonSelector = ".js-image-manager-file";
                if (typeof formHelper === "undefined") {
                    $.getScript("/Scripts/common/form.js", function (script, textStatus, jqxhr) {
                        formHelper.image.upload(uploadButtonSelector, uploadSuccess);
                    });
                } else {
                    formHelper.image.upload(uploadButtonSelector, uploadSuccess);
                }

                $(selector).click(function (e) {
                    if ($.type(e.preventDefault) === "function") {
                        e.preventDefault();
                    }

                    uiHelper.ImageSelectManager.open();
                });
            },

            selectedData: getSelected
        },
        Message: {
            alert: function (msg) {
                messageHelper.error(msg);
            },
            success: function (msg) {
                messageHelper.success(msg);
            },
            message: function (msg) {
                messageHelper.info(msg);
            },
            warning: function (msg) {
                messageHelper.warning(msg);
            },
            confirm: function (msg, continueHandler) {
                messageHelper.confirm(msg, continueHandler);
            }
        },
        ImageSelectManager: {
            open: function () {
                function onLoading(selector) {
                    $(".file-name").removeClass("icon-checked");
                    $(".js-selected").removeClass("btn-primary");
                    $(".js-selected").addClass("btn-default");
                }

                function onLoaded(selector, rows) {
                    $(".file").click(function (e) {
                        if ($.type(e.preventDefault) !== "function") {
                            e.preventDefault();
                        }

                        $(".file-name").removeClass("icon-checked");
                        var selected = $(this).find(".file-name");
                        $(selected).addClass("icon-checked");

                        $(".js-selected").removeClass("btn-default");
                        $(".js-selected").addClass("btn-primary");
                    });

                    $(".file").mouseover(function () {
                        $(this).addClass("animated");
                        $(this).addClass("pulse");
                    })
                        .mouseout(function () {
                            $(this).removeClass("pulse");
                            $(this).removeClass("animated");
                        });

                    $(".js-selected").click(function (e) {
                        if ($.type(e.preventDefault) !== "function") {
                            e.preventDefault();
                        }

                        if ($("div.icon-checked").size() <= 0) {
                            alert("请选择一张图片");
                            return;
                        }

                        var currentFile = $(".js-current-file");
                        if ($(currentFile).size() > 0) {
                            if ($(currentFile).hasClass("db")) {
                                var fileID = $(".icon-checked").prev(".js-item").find("img").attr("ID");
                                //var fileName = $(".icon-checked").prev(".file-name").attr("name")
                                $(currentFile).val(fileID);
                            } else {
                                var fileID = $(".icon-checked").prev(".js-item").find("img").attr("src");
                                $(currentFile).val(fileID);
                            }
                        }

                        var previewSelector = $(".js-img-selected");
                        if ($(currentFile).hasClass("db")) {
                            var src = $(".icon-checked").prev(".file-name").prevObject[0].innerHTML;//.find("img").attr("src")
                            if ($(previewSelector).length <= 0) {
                                //<img alt="image" class="img-responsive js-img-selected" src="' + src + '">
                                //var imgHtml = '<div class="ibox-content no-padding border-left-right" style="width:160px;">'+src+'</div>';
                                //$(".js-image-manager-button").after(imgHtml);
                                $("#CurfileName").html(src);
                            } else {
                                $(previewSelector).attr("src", src);
                            }
                        }

                        $(dialogSelector).modal("hide");
                    });
                }

                var dialogSelector = ".js-image-dialog";
                var listSelector = $(dialogSelector).find(".js-image-list");

                var data = {};
                data["pageSize"] = 8;

                dialogHelper.dialogForAjaxList(dialogSelector, listSelector, data, onLoading, onLoaded);
            }
        },
        Dialog: {
            openDefault: function () {
                var selector = ".js-dialog";
                dialogHelper.dialogDefault(selector);
            }
        }
    };
})();

$(function () {
    uiHelper.Chosen();
    uiHelper.iCheck();
    uiHelper.Date();
    uiHelper.DateRange();
    uiHelper.UEditor.init();
    uiHelper.Button.noDataLinkButton();
    uiHelper.Button.dataLinkButton();
    uiHelper.Button.imageManagerButton();

    window.alert = uiHelper.Message.alert;
    window.success = uiHelper.Message.success;
    window.message = uiHelper.Message.message;
    window.warning = uiHelper.Message.warning;
    window.confirm = uiHelper.Message.confirm;
});